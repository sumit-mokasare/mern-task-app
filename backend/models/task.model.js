import mongoose from "mongoose";

const TaskSchema =  new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
         type:String,
        required:true,
        enum:['Pending', 'Runing', 'Completed', 'Failed'],
        default:'Pending'
    }
},{timestamps:true}) 

const TaskModel = new mongoose.model('Task', TaskSchema)
export default TaskModel