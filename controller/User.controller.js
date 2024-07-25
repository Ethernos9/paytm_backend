import userModel from "../models/User.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import zod from "zod"
import accountModel from "../models/Account.model.js"


const signInBody = zod.object({
    username:zod.string().min(3),
    email: zod.string().email(),
    password: zod.string().min(6),
    firstname: zod.string().min(3),
    lastname: zod.string().min(3)

  })
// const updateBody = zod.object({
//     password: zod.string().min(6),
//     firstname: zod.string().min(3),
//     lastname: zod.string().min(3)

//   })


const signUpBody = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
    
})


 const createUser = async(req,res)=>{
    const {success} = signUpBody.safeParse(req.body)
    if (!success){
        return res.status(400).json({
            success: false,
            msg:"Invalid data"
           
        })
    }

   const {username,email,password,firstname,lastname} = req.body

    const userExist = await userModel.findOne({email})
    if (userExist){
        return res.status(409).json({
          success: false,
          msg:"Email already exists"
        }) 
 
    }
    // Hash password before saving to database
    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(password, salt);


   const user = await userModel.create({
    username,
    email,
    password:hashedPassword,
    firstname,
    lastname
   })

   if (!user){
     return res.satus(404).json({
        success: false,
        msg:"Couldn't create user"
     })
   }
     // add money in account of a user 
   const account = await accountModel.create({
    userId :user._id,
    balance: 1 + Math.random() * 10000
   })
    // Create a token

    const token = jwt.sign({id: user._id},process.env.SECRET_KEY)
    if (!token) return res.json({success: false, msg: "failed to create token"})
    
    
   return res.status(200).json({
    success: true,
    msg:"User created successfully",
    user,
    token
    
   })


}

const loginUser = async(req,res)=>{
    const {success} = signUpBody.safeParse(req.body)
    if (!success) return res.status(401).json({success:false,msg:"Invalid data"})
        
    // Verify user credentials
    const {email,password} = req.body
    try {
        const user = await userModel.findOne({email})
        if (!user) return res.status(404).json({success: false, msg: "User not found"})  

        const match = bcrypt.compareSync(password, user.password)
        if (!match) return res.status(404).json({success: false, msg:"Wrong credentials"})
    // create a token 

        const token = jwt.sign({id: user._id},process.env.SECRET_KEY)
        if (!token) return res.json({success: false, msg: "failed to create token"})
       
            res.status(200).json({success: true,user,token, msg:"user logged in successfully"})   
    } catch (error) {
        throw new Error(error)
    }
   
}
// const getUser =async(req,res)=>{
//     const users = await userModel.find({})
//     return res.status(200).json({success:true,users})
// }
const updateUser = async (req,res)=>{
    const id = req.userId
    console.log(req.userId)
    console.log(id)
    const {firstname,lastname,password} = req.body
    // const {success} = updateBody.safeParse(req.body)
    // if (!success) return res.status(400).json({success: false,msg:"Invalid data"})
    const user  =await userModel.findById(id)
    if (!user) return res.status(404).json({success: false,msg:"User not found"})
    user.firstname = firstname? firstname:user.firstname
    user.lastname = lastname? lastname:user.lastname
    if (password){
        var salt = bcrypt.genSaltSync(10);
        var hashedPassword = bcrypt.hashSync(password, salt);
        user.password = hashedPassword
    }
    await user.save()
    return  res.status(200).json({success:true,msg:"User saved successfully",user})
}

const getUser = async(req,res) => {
    const filter = req.query.filter || "";

    const users = await userModel.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstname,
            lastName: user.lastname,
            _id: user._id
        }))
    })
}
export {
    createUser,
    loginUser,
    getUser,
    updateUser
    
}

