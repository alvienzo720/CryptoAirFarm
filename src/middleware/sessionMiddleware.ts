import { NextFunction } from "express";
import { SessionModel } from "../Database";
import { UserModel } from "../Database/Users";

interface ContextType {
    from?: {
        id?: number;
    };
    session?: any;
    walletaddress?: string;
}

export async function mongoSession(ctx: ContextType, next: NextFunction) {
    if (!ctx.from || !ctx.from.id) {
        console.log("No ctx.from or ctx.from.id present.");
        await next();
        return;
    }

    const userKey = String(ctx.from.id);

    try {
        // Get or Create User
        let user = await UserModel.findOneAndUpdate(
            { userId: ctx.from.id },
            { $setOnInsert: { 
                userId: ctx.from.id,
                createdDate: new Date(),
                walletaddress: ctx.walletaddress || ')XDRGYYTDDGSG'
            }},
            { upsert: true, new: true }
        );

        // Handling Session
        let sessionDoc = await SessionModel.findOne({ userKey });

        ctx.session = sessionDoc ? sessionDoc.sessionData : {};

        await next();

        if (sessionDoc) {
            await SessionModel.findOneAndUpdate({ userKey }, { sessionData: ctx.session });
        } else {
            const newSession = new SessionModel({ userKey, sessionData: ctx.session });
            await newSession.save();
        }

    } catch (error) {
        console.error("Error in mongoSession:", error);
        await next();
    }
}

export default mongoSession;
