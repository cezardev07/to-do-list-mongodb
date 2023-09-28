import express from "express"
import cors from "cors"

const middleware = express()

middleware.use(cors())
middleware.use(express.json())

export { 
    middleware
}