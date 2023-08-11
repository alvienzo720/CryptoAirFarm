import {Mongoose, Schema, model} from "mongoose";
enum Plan {
    Daily = 'Daily',
    Weekly = 'Weekly',
    Monthly='Monthly',
    Yearly ='Yearly'
}

interface IAccessToken {
    // userId:number,
    token:string,
    plan:Plan,
    createdDate:Date,
    expirationDate:Date
}


const accessTokenSchema =  new Schema<IAccessToken>({
    // userId:{type:Schema.Types.Number, required:true},
    token:{type:Schema.Types.String, required:true},
    plan:{type:String, enum:Object.values(Plan), required:true},
    createdDate:{type:Date, default:Date.now},
    expirationDate:{type:Date, required:true}

})


const AccessTokenModel = model<IAccessToken>('AccessToken', accessTokenSchema);

export {AccessTokenModel, IAccessToken}
