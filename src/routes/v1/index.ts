/* eslint-disable prettier/prettier */
import express, { Router } from 'express'
import AuthRoutes from './auth.routes'

class VersionOneRoutes {
    private VersionOneRouter: Router
    private AuthRoutes: AuthRoutes

    constructor() {
        this.VersionOneRouter = express.Router()
        this.AuthRoutes = new AuthRoutes()
    }

    public routes(): Router {
        this.VersionOneRouter.use('/auth', this.AuthRoutes.routes())

        return this.VersionOneRouter
    }
}

export default VersionOneRoutes
