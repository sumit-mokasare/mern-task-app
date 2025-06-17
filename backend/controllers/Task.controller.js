import TaskModel from "../models/task.model.js";

export const creatTask = async (req, res) => {

    try {
        const { title, description } = req.body
        console.log(req.body);
        if (!title || !description) {
            return res.status(400).json({
                message: 'Invalid title and description',
                success: false
            })
        }
        const createTask = await TaskModel.create({
            title,
            description,
        })

        res.status(200).json({
            message: 'Task created successfully',
            success: true
        })
    } catch (error) {
        console.log('failed to create task', error);
        return res.status(500).json({
            message: 'failed to create TaskController ',
            success: false
        })
    }

}
export const getAllTask = async (req, res) => {

    try {
        const taskData = await TaskModel.find().sort({ createdAt: -1 }).lean().exec()

        res.status(200).json({
            message: 'Task get all task successfully',
            success: true,
            taskData
        })
    } catch (error) {
        console.log('failed to get all task', error);
        res.status(500).json({
            message: 'failed to getAll task ',
            success: false
        })
    }

}
export const showTask = async (req, res) => {
    try {
        const { taskid } = req.params
        if (!taskid) {
            return res.status(400).json({
                message: 'task Id not found',
                success: false
            })
        }

        const taskData = await TaskModel.findById(taskid).lean().exec()

        res.status(200).json({
            success: true,
            taskData
        })

    } catch (error) {
        console.log('failed to get task by id', error);
        res.status(500).json({
            message: 'failed to get task by id ',
            success: false,
            taskData
        })
    }
}
export const updateTask = async (req, res) => {
    try {
        const { title, description, status } = req.body
        const { taskid } = req.params

        if (!taskid) {
            res.status(200).json({
                message: 'task id not found ',
                success: false,
            })
        }

        const updatedTask = await TaskModel.findByIdAndUpdate(taskid, {
            title, description, status
        }, { new: true }
        )

        // console.log(updatedTask);
        if (!updatedTask) {
            console.log('teureeee');
            return res.status(400).json({
                message: 'task not found',
                success: false,
            })
        }

        res.status(200).json({
            message: 'task Updated succesfully',
            success: true,
            updatedTask
        })


    } catch (error) {
        console.log('Error to update taks', error);
        res.status(500).json({
            message: 'Error to Updated task',
            success: false
        })
    }
}
export const deleteTask = async (req, res) => {
    try {
        const { taskid } = req.params

        if (!taskid) {
            return res.status(400).json({
                message: "deleted task id not found",
                success: true
            })
        }

        const deletedTask = await TaskModel.findByIdAndDelete(taskid)

        res.status(200).json({
            message: "task deleted succesfully",
            success: true
        })
    } catch (error) {
        console.log('failed to deleted task', error);
        res.status(500).json({
            message: "failed to deleted task",
            success: true
        })
    }
}
