/* eslint-disable prettier/prettier */
import express, { Router } from 'express'
import AuthRoutes from './auth.routes'
import AccountRoutes from './account.routes'
import UserRoutes from './user.routes'

class VersionOneRoutes {
    private VersionOneRouter: Router
    private AuthRoutes: AuthRoutes
    private AccountRoutes: AccountRoutes
    private UserRoutes: UserRoutes

    constructor() {
        this.VersionOneRouter = express.Router()
        this.AccountRoutes = new AccountRoutes()
        this.AuthRoutes = new AuthRoutes()
        this.UserRoutes = new UserRoutes()
    }

    public routes(): Router {
        this.VersionOneRouter.use('/accounts', this.AccountRoutes.routes())
        this.VersionOneRouter.use('/auth', this.AuthRoutes.routes())
        this.VersionOneRouter.use('/users', this.UserRoutes.routes())

        return this.VersionOneRouter
    }
}

export default VersionOneRoutes
