import mongoose, { Schema, model } from "mongoose";

interface ISession {
    userKey:number,
    sessionDate:Date,
    sessionData:object
}

const SessionSchema =  new Schema<ISession>({
    userKey:{type:Schema.Types.Number, required:true},
    sessionDate:{ type : Date },
    sessionData:{type:Schema.Types.Mixed, required:true}

})
const SessionModel =  model<ISession>("UserSessions",SessionSchema);

export {SessionModel, SessionSchema}
