import mongoose from "mongoose"

const userSchema =  new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength:3  
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstname:{
        type: String,
        required: true,
        minLength:3
    },
    lastname:{
        type: String,
        required: true
    },
    
   
},{})

const userModel = mongoose.model("User",userSchema)

export default userModel