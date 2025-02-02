import express from "express"
const router = express.Router()
import zod from "zod"
import {User, Account} from "../db.js"
import  jwt  from "jsonwebtoken"
import { JWT_SECRET } from "../config.js"
import {authMiddleware} from "../middleware.js"

const singUpBody = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
})


router.post("/signup", async (req, res) => {

    const {success} = singUpBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            success:false,
            message:"Invalid Data"
        })
    }

    const existingUser =  await User.findOne({
        username: req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            success: false,
            message: "Email Already Taken"
        })
    }

    const {username, password, firstName, lastName} = req.body;

    const user= await User.create({
        username,
        password,
        firstName,
        lastName
    })

    const userId = user._id;

    await Account.create({
        userId,
        balance: Math.random()*10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET)

    res.json({
        message: "User Created Successfully",
        token: token
    })

})

const signInBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async (req, res) => {
    const {success} = signInBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            success:false,
            message:"Invalid Inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if(user){
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)

        return res.status(200).json({
            success:true,
            message:"Sign In Successfull",
            token:token
        })
    }

    return res.status(411).json({
        success:false,
        message:"Invalid Credentials"
    })
})


const updateBody = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().optional()
})

router.put("/update", authMiddleware, async (req, res) => {
    const {success} = updateBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            success: false,
            message:"Invalid Data Input"
        })
    }

    await User.updateOne({_id: req.userId},req.body)

    return res.status(200).json({
        success:true,
        message:"Updated Successfully"
    })

    
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || ""

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName:{
                "$regex": filter
            }
        }]
    })

    return res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            id: user._id
        }))
    })
})

router.get("/getUser", authMiddleware , async (req,res) => {
    const user = await User.findOne({
        _id: req.userId
    })
    return res.json(user)
})

export default router