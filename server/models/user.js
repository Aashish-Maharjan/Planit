import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    name:{type:String,required:true},
    title:{type:String,required:true},
    role:{type:String,required:true},
    email:{type:String,required:true ,unique:true},
    password:{type:String,required:true},
    isAdmimn:{type:Boolean,required:true ,default:false},
    tasks:[{type:Schema.Types.ObjectId,ref:"Tasks"}],
    isActive:{type:Boolean,required:true,default:true},
},{timestamps:true});

userSchema.pre("save",async function (next){
    if(!this.isModified("password")){
        next();
    }
const salt=await bcrypt.genSalt(10);
this.password=await bcrypt.hash(this.password,salt)

});
userSchema.method.matchPassword=async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password);
};

const User=mongoose.model("User",userSchema);

export default User;