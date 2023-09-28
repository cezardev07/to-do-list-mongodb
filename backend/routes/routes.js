import express from "express"
import { routesTask } from "./task.js"
import { routesAuth } from "./auth.js"

const routes = express.Router()

routes.use("/",routesTask)
routes.use("/auth/", routesAuth)

export {
    routes
}