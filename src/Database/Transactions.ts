import { Schema, model } from "mongoose";
interface ITransaction {
    user:Object,
    transactionHash:string,
    amount:number,
    createdAt:Date,
}


const transactionSchema =  new Schema<ITransaction>({
    transactionHash:{type:Schema.Types.String, required:true},
    user:{type:Schema.Types.ObjectId,
          ref:'UserProfiles'},
    amount:{type:Schema.Types.Number},
    createdAt:{type:Date, default:Date.now}


})


const TransactionModel =  model<ITransaction>('Transactions', transactionSchema);

export {TransactionModel, ITransaction}
