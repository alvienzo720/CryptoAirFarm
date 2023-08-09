
import { NextFunction } from "express";
import { Session } from "../Database";

export async function mongoSession(ctx: any, next: NextFunction) {
    try {
        const userKey = String(ctx.from && ctx.from.id);

        if (userKey) {
            const sessionDoc = await Session.findOne({ userKey });

            ctx.session = sessionDoc ? sessionDoc.sessionData : {};

            await next();

            if (sessionDoc) {
                await Session.findOneAndUpdate({ userKey }, { sessionData: ctx.session });
            } else {
                const newSession = new Session({ userKey: userKey, sessionData: ctx.session });
                await newSession.save();
            }
        } else {
            await next();
        }
    } catch (error) {
        console.error("Error in mongoSession middleware:", error);
        await next(); // you might want to send a generic error message to the user here or handle it more gracefully.
    }
}

export default mongoSession;
