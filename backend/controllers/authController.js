import { UserModel } from "../models/UserModel.js"
import { TaskModel } from "../models/TaskModel.js"

const authController = {
    create: async (req, res) => {
        try {
            const user = {
                name: req.body.name,
                password: req.body.password,
            }

            const ifNotExist = await UserModel.find({name: req.body.name})
            
            if(ifNotExist.length > 0){
                return res.status(401).json({
                    status: 401,
                    mensage: "O usuario já exites!",
                })
            }

            await UserModel.create(user)

            return res.status(200).json({
                status: 200,
                mensage: "User created with success!",
                user
            })
        } catch (error) {
            throw new Error("[ ERROR ] -> " + error)
        }
    },
    
    getUser: async (req, res) => {
        try {

            const user = await UserModel.find({
                name: req.body.name,
                password: req.body.password,
            })

            if(!user || user.length === 0){
                return res.status(404).json({
                    status: 404,
                    mensage: "user not default"
                })
            }

            return res.status(200).json({
                status: 200,
                user
            })
        } catch (error) {
            throw new Error("[ ERROR ] -> " + error)
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { id } = req.params

            const validationUser = await UserModel.findById(id)

            const validationTasks = await TaskModel.find({id_user: id})

            if(!validationUser){
                return res.status(404).json({
                    status: 404,
                    mensage: "user not default"
                })
            }

            const userDeleted = await UserModel.findByIdAndDelete(id)
            
            if(validationTasks || validationTasks.length > 0){
                for(let task of validationTasks){
                    await TaskModel.findByIdAndDelete(task._id)
                }
            }

            return res.status(200).json({
                status: 200,
                mensage: "user deleted with sucess!",
                userDeleted,
                tasksDeleted: validationTasks
            })
        } catch (error) {
            throw new Error("[ ERROR ] -> " + error)
        }
    },
}

export {
    authController
}