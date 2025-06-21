import express from 'express'
import { creatTask, deleteTask, getAllTask, showTask, updateTask } from '../controllers/Task.controller.js'

const TaskRouter =  express.Router()

TaskRouter.post('/create-task' , creatTask)
TaskRouter.get('/get-all-task' , getAllTask)
TaskRouter.post('/show-task/:taskid' , showTask)
TaskRouter.post('/update-task/:taskid' , updateTask)
TaskRouter.post('/delete-task/:taskid' , deleteTask)


export default TaskRouter