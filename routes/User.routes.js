import express from "express";
const userRouter = express.Router()
import { createUser,getUser,loginUser, updateUser } from "../controller/User.controller.js";
import authMiddleware from "../middleware/middleware.js";

// Routes

userRouter.post("/create",createUser)
userRouter.post("/login",loginUser)
userRouter.post("/update",authMiddleware,updateUser)
userRouter.get("/getUsers",getUser)

 export default userRouter