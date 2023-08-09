import mongoose from "mongoose";


const sessionSchema =  new mongoose.Schema({
    userKey:String,
    sessionData:Object
});

export const Session =  mongoose.model('Session', sessionSchema);

export default Session
