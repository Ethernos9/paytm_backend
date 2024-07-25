import mongoose from "mongoose";

const connectDb = async()=>{
    await mongoose.connect("mongodb+srv://shubham:ethernos9@cluster0.sjl3uyd.mongodb.net/paytm").then(()=>{console.log("dB Connection succesfull")}).catch(()=>{
        console.log("DB connection failed")
    })
}

export default connectDb