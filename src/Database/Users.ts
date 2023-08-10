import {Mongoose, Schema, model} from "mongoose";
enum Plan {
    Daily = 'Daily',
    Weekly = 'Weekly',
    Monthly='Monthly',
    Yearly ='Yearly'
}

interface IUser {
    userId:number,
    walletaddress:string,
    createdDate:Date,
    Plan:Plan
}
const userSchema = new Schema<IUser>({
    userId:{type:Schema.Types.Number, required:true},
    walletaddress:{type:Schema.Types.String,required:true},
    createdDate:{type:Date},
    Plan: {type:String, enum:Object.values(Plan), default:Plan.Daily},
})

const UserModel = model<IUser>('UserProfiles', userSchema);

export {UserModel, IUser}
