import express from "express"

import { 
    middleware as middlewares 
} from "../middlewares/middlewares.js"

import { 
    handleConnectionMongoDB as connection 
} from "../data/connfig.js"

import { routes } from "../routes/routes.js"

const app = express()

// middlewares
app.use(middlewares)

// connection with database
connection()

// routes
app.use(routes)

export {
    app
}