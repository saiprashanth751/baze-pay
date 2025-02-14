import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config.js";

export const authMiddleware = (req, res, next) => {
    const authHeader= req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(404).json({
            success: false,
            message: "Bad Request"
        })
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token,JWT_SECRET);

        req.userId= decoded.userId;
        next();
    }
    catch(err){
        return res.status(403).json({
            success:false,
            message:"Invalid User"
        })
    }
}
