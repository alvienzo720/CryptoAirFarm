import { NextFunction } from "express";
import { SessionModel } from "../Database";
import { UserModel } from "../Database/Users";

interface ContextType {
    from?: {
        id?: number;
    };
    session?: any;

    walletaddress?:string
}

export async function mongoSession(ctx: ContextType, next: NextFunction) {
    try {
        if (!ctx.from || !ctx.from.id) {
            console.log("No ctx.from or ctx.from.id present.");
            await next();
            return;
        }

        const userKey = String(ctx.from.id);
        const sessionDoc = await SessionModel.findOne({ userKey });

        let user = await UserModel.findOne({ userId: ctx.from.id });

        if (!user) {
            console.log(`User with ID ${ctx.from.id} not found. Creating...`);
            user = new UserModel({
                userId: ctx.from.id,
                createdDate: new Date(),
                walletaddress:ctx.walletaddress || ')XDRGYYTDDGSG'
            });

            try {
                await user.save();
                console.log(`User with ID ${ctx.from.id} created.`);
            } catch (userSaveError) {
                console.error(`Error saving user with ID ${ctx.from.id}:`, userSaveError);
            }

        } else {
            console.log(`User with ID ${ctx.from.id} exists.`);
        }

        ctx.session = sessionDoc ? sessionDoc.sessionData : {};

        await next();

        if (sessionDoc) {
            await SessionModel.findOneAndUpdate({ userKey }, { sessionData: ctx.session });
            console.log(`Session for user ID ${ctx.from.id} updated.`);
        } else {
            const newSession = new SessionModel({ userKey, sessionData: ctx.session });
            try {
                await newSession.save();
                console.log(`Session for user ID ${ctx.from.id} created.`);
            } catch (sessionSaveError) {
                console.error(`Error saving session for user ID ${ctx.from.id}:`, sessionSaveError);
            }
        }

    } catch (error) {
        console.error("Error in mongoSession:", error);
        await next();
    }
}

export default mongoSession;
