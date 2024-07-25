import mongoose  from "mongoose";
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    // transactionHistory: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Transaction"
    // }]
},{})

const accountModel = mongoose.model("Account", accountSchema)
export default accountModel