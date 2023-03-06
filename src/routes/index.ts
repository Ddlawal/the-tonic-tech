import express, { Router } from 'express'
import VersionOneRoutes from './v1'

class Routes {
    private Router: Router
    private VersionOneRoutes: VersionOneRoutes

    constructor() {
        this.VersionOneRoutes = new VersionOneRoutes()
        this.Router = express.Router()
    }

    public routes(): Router {
        this.Router.use('/v1', this.VersionOneRoutes.routes())

        return this.Router
    }
}
export default Routes
