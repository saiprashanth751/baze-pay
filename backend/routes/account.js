import express from "express";
import { Account } from "../db.js"
import { authMiddleware } from "../middleware.js";
import mongoose from "mongoose";


const router = express.Router()

router.get("/balance", authMiddleware, async (req, res) =>{
    const account = await Account.findOne({
        userId: req.userId
    })

    if(!account){
        return res.status(411).json({
            success: false,
            message: "Something went wrong"
        })
    }

    return res.json({
        balance: account.balance
    })
})


router.post("/transfer", authMiddleware, async (req, res) => {

    const session = await mongoose.startSession();
    session.startTransaction()

    const {amount, to} = req.body;

    const account = await Account.findOne({
        userId : req.userId
    }).session(session)

    if(!account || account.balance < amount){
        await session.abortTransaction()
        return res.status(411).json({
            success:false,
            message: "Bad Request. Check your account balance"
        })
    }

    const toAccount = await Account.findOne({
        userId: to
    }).session(session)

    if(!toAccount){
        session.abortTransaction()
        return res.status(411).json({
            success: true,
            message: "Invalid Account Number"
        })
    }

    await Account.updateOne({userId: req.userId}, {$inc: {balance: -amount}}).session(session)
    await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session)

    await session.commitTransaction();

    res.status(200).json({
        success: true,
        message: "Transfer Successfull"
    })
})


export default router
