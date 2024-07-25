import mongoose from "mongoose";
import accountModel from "../models/Account.model.js";

const balance = async(req,res)=>{
     const account = await accountModel.findOne({
        userId:req.userId
     })
     res.json({
        balance: account.balance
     })

}
const transfer = async(req,res)=>{

    try {
        const session = await mongoose.startSession();
     
       session.startTransaction();
       
       
       // Retrieve the required account data within the transaction
       const { amount, to } = req.body;
   
       // Fetch the accounts within the transaction
       const account = await accountModel.findOne({ userId: req.userId }).session(session);
         console.log(account)
       if (!account || account.balance < amount) {
           await session.abortTransaction();
           return res.status(400).json({
               message: "Insufficient balance"
           });
       }
   
       const toAccount = await accountModel.findOne({ userId: to }).session(session);
   
       if (!toAccount) {
           await session.abortTransaction();
           return res.status(400).json({
               message: "Invalid account"
           });
       }
   
       // Perform the transfer
       await accountModel.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
       await accountModel.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
   
       // Commit the transaction
       await session.commitTransaction();
       res.json({
           message: "Transfer successful"
       });
    } catch (error) {
        console.error(error);
    }
   
}
 export {
    balance,
    transfer
 }