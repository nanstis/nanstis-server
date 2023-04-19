import {Router} from '../env'
import * as express from 'express'


abstract class Controller {
    protected readonly router: Router = express()

    protected constructor() {
        this.configureRouter()
        this.initializeRoutes()
    }

    public getRouter(): Router {
        return this.router
    }

    protected abstract configureRouter(): void;

    protected abstract initializeRoutes(): void;
}

export {Controller}