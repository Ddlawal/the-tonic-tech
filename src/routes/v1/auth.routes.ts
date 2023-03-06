/* eslint-disable prettier/prettier */
import express, { Router } from 'express'
import { AuthController } from '../../controllers/auth.controller'
import { authenticate } from '../../middleware/auth.middleware'
import { validationMidlleware } from '../../middleware/validation.midlleware'

class Auth {
    private AuthRouter: Router
    private AuthController: AuthController

    constructor() {
        this.AuthRouter = express.Router()
        this.AuthController = new AuthController()
    }

    public routes(): Router {
        this.AuthRouter.post('/signup', ...validationMidlleware('signup'), this.AuthController.signup)
        this.AuthRouter.post('/login', this.AuthController.login)
        this.AuthRouter.get('/logout', authenticate, this.AuthController.logout)
        this.AuthRouter.get('/refresh-token', this.AuthController.refreshAccessToken)

        return this.AuthRouter
    }
}

export default Auth
