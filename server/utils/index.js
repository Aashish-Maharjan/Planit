import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const dbconnection =async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
    }catch(error){
        console.log("DB Error",error.message);
    }
}

export default dbconnection;

export const createJWT=(res,userId)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"1d"
    });
    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV!=="development",
        sameSite:"strict",//prevent CSRF attack,
        maxAge:1*24*60*60*1000,
    })
}