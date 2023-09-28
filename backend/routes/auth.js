import { Router } from "express"

import { authController } from "../controllers/authController.js";

const router = Router()

// create new user
router.route("/create").post((req, res) => {
    return authController.create(req, res)
})

// get user
router.route("/login").post((req, res) => {
    return authController.getUser(req, res)
})

// delete user
router.route("/user/:id").delete((req, res) => {
    return authController.deleteUser(req, res)
})

export { 
    router as routesAuth
}