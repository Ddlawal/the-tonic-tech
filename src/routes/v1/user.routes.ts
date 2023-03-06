/* eslint-disable prettier/prettier */
import express, { Router } from 'express'
import { UserController } from '../../controllers/user.controller'
import { Role } from '../../interfaces/auth'
import { authenticate, authorize } from '../../middleware/auth.middleware'

class User {
    private UserRouter: Router
    private UserController: UserController

    constructor() {
        this.UserRouter = express.Router()
        this.UserController = new UserController()
    }

    public routes(): Router {
        this.UserRouter.get('/', authenticate, authorize(Role.ADMIN), this.UserController.getAllusers)

        return this.UserRouter
    }
}

export default User
