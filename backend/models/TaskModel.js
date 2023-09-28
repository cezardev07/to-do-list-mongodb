import { 
    Schema,
    model
} from "mongoose"

const TaskSchema = new Schema(
    {
        id_user: {
            type: String,
            required: true
        },
        task: {
            type: String,
            requiredd: true
        }
    },
    { timestamps : true }
)

const TaskModel = model("task", TaskSchema)

export { 
    TaskModel 
}

