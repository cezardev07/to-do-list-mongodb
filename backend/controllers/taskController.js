import { TaskModel } from "../models/TaskModel.js"

const taskController = {
    create: async (req, res) => {
        try {
            const taskCreated = {
                id_user: req.body.id_user,
                task: req.body.task,
            }

            await TaskModel.create(taskCreated)

            return res.status(200).json({
                status: 200,
                mensage: "Task created with success!",
                taskCreated
            })
        } catch (error) {
            throw new Error("[ ERROR ] -> " + error)
        }
    },
    
    getTask: async (req, res) => {
        try {

            const query = req.params.query

            const products = await TaskModel.find({ id_user : query})

            if(!products || products.length === 0){
                return res.status(404).json({
                    status: 404,
                    mensage: "product not default"
                })
            }

            return res.status(200).json({
                status: 200,
                data: products
            })
        } catch (error) {
            throw new Error("[ ERROR ] -> " + error)
        }
    },

    deleteTask: async (req, res) => {
        try {
            const id = req.params.id

            const validationTaskUser = await TaskModel.findById(id)

            if(!validationTaskUser){
                return res.status(404).json({
                    status: 404,
                    mensage: "Task not default"
                })
            }

            const taskDeleted = await TaskModel.findByIdAndDelete(id)
            
            return res.status(200).json({
                status: 200,
                mensage: "Task deleted with sucess!",
                taskDeleted
            })
        } catch (error) {
            throw new Error("[ ERROR ] -> " + error)
        }
    },

    update: async (req, res) => {
        try {
            const id = req.params.id

            const taskUpdated = {
                id_user: req.body.id_user,
                task: req.body.task,
            }

            const validationProduct = await TaskModel.findById(id)

            if(!validationProduct){
                return res.status(404).json({
                    status: 404,
                    mensage: "Task not default"
                })
            }

            await TaskModel.findByIdAndUpdate(id, taskUpdated)
            
            return res.status(200).json({
                status: 200,
                mensage: "Task updated with sucess!"
            })
        } catch (error) {
            throw new Error("[ ERROR ] -> " + error)
        }
    }
}

export {
    taskController
}