import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
dotenv.config()

const app = express()
const port =3000
// Db
import connectDb from "./connectDb.js"
connectDb()

//middleware
import authMiddleware from "./middleware/middleware.js"
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())


// routes 
import userRouter from "./routes/User.routes.js"
import accRouter from "./routes/Account.routes.js"
app.use("/api/user",userRouter)
app.use("/api/v1",accRouter)
app.listen(port,()=>{
    console.log(`Listening on ${port}`)
})