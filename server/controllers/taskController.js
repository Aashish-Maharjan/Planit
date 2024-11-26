import Task from "../models/task.js"
import Notice from "../models/notification.js";

export const createTask= async(req,res)=>{
    try {
        const {title,team,stage,priority,date,assets}=req.body;
        const task=await Task.create({
            title,team,stage:stage.toLowerCase(),priority:priority.toLowerCase(),date,assets,
        })
        let text="New task has been assigned to you";
        if(text.team.length>1){
            text=text+`and ${task.team.length-1}others.`;
        }
        text=
            text+`The task priority is set a${task.priority},priority,so check and act accordingly.The task date is${task.date.toDateString()}.Thankyou!!!`;
            
        await Notice.create({
            team,
            text,
            task:task._id,
        })
        res .status(200).json({status:true,message:"Task created successfully!"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({status:false,message:error.message})
    }
}

export const duplicateTask= async(req,res)=>{
    try {
        const {id}=req.params;

        const task=await Task.findById(id);

        const newTask=await Task.create({
            ...task,title:task.title+"-Duplicate",
        });

        newTask.team=task.team 
    } catch (error) {
        console.log(error);
        return res.status(400).json({status:false,message:error.message})
    }
}
export const postTaskActivity= async(req,res)=>{
    try { 
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({status:false,message:error.message})
    }
}