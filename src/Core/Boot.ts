import * as express from 'express'
import {Express} from 'express'
import {Controller} from './Controller'
import {environment} from './Configuration'
import * as cors from 'cors'
import * as mogran from 'morgan'
import {createWriteStream, WriteStream} from 'fs'
import {join} from 'path'

class Boot {
    private readonly serverInstance: Express

    constructor(controllers: Controller[]) {
        this.serverInstance = express()

        this.initializeMiddlewares()
        this.initializeControllers(controllers)

        this.serverInstance.listen(environment.PORT)
    }

    private initializeMiddlewares(): void {
        const accessLogStream: WriteStream = createWriteStream(
            join(environment.LOG_PATH, 'access.log'), {flags: 'a'})

        this.serverInstance.use(mogran('combined', {
            stream: accessLogStream,
        }))

        this.serverInstance.use(cors({
            origin: environment.ALLOWED_ORIGIN,
            allowedHeaders: '*',
            methods: '*',
        }))
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller): void => {
            this.serverInstance.use('/api', controller.getRouter())
        })
    }
}

const bootstrap = (controllers: Controller[]) => new Boot(controllers)

export {bootstrap}