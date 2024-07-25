import express from 'express'

import authMiddleware from '../middleware/middleware.js'
import { balance, transfer } from '../controller/account.js'

const accRouter = express.Router()
accRouter.get("/balance",authMiddleware,balance)
accRouter.post("/transfer",authMiddleware,transfer)


export default accRouter