 import jwt from "jsonwebtoken"
 import { user } from "../models/User.js"
import { _config } from "../config/config.js"

 export const authMiddleware = async (req , res , next) => {
    const token = req.headers.authorization.split(" ")[1] || req.cookies.refreshToken
    const decoded = jwt.verify(token , _config.REFRESH_TOKEN_SECRET)
    const userToken  = await db.select().from(user).where(eq(user.id , decoded.id))
    if(!userToken){
        return res.status(401).json({message : "Unauthorized"})
    }
    if(userToken.refreshToken !== token){
        return res.status(401).json({message : "Unauthorized"})
        
    }
    console.log(userToken)
    req.user = userToken
    next()
 }
