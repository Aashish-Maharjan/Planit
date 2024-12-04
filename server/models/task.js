import { Schema } from "mongoose";
import mongoose from "mongoose";

const taskSchema=new Schema({
    title:{type:String,required:true},
    date:{type:Date,default:new Date()},
    priority:{type:String,default:"normal",enum:["normal","high","medium","low"]
    },
    stage:{
        type:String,
        default:"todo",
        enum:["completed","inprogress","todo",]
    },
    activities:{ 
        type:{
            type:String,
            defautl:"assigned",
            enum:["assigned","started","inprogress","bug","completed","comented"],},
            activity:String,
            date:{type:Date,default:new Date()},
            by:{type:Schema.Types.ObjectId,ref:"User"}
    },
    
    subTasks:[
        {
            title:String,
            date:Date,
            tag:String,
        },
    ],
    assests:[String],
    team:[{type:Schema.Types.ObjectId,ref:"User"}],
    isTrashed:{type:Boolean,default:false},
},{timestamps:true}
);

const Task=mongoose.model("Tasks",taskSchema)

export default Task;