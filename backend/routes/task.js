import { Router } from "express"

import { taskController } from "../controllers/taskController.js"

const router = Router()

router.route("/").post((req, res) => {
    return taskController.create(req, res)
})

// get all type products
router.route("/:query").get((req, res) => {
    return taskController.getTask(req, res)
})

// update product specific
router.route("/:id").put((req, res) => {
    return taskController.update(req, res)
})

// delete product specific
router.route("/:id").delete((req, res) => {
    return taskController.deleteTask(req, res)
})

export { 
    router as routesTask
}