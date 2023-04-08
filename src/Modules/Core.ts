import * as express from 'express'
import {Application, Express} from 'express'
import {ConfigModule} from './Config'
import * as bodyParser from 'body-parser'
import {ControllerModule} from './Controller'

module CoreModule {
    import config = ConfigModule.config;
    import Controller = ControllerModule.Controller;

    class Core {
        private readonly serverInstance: Express

        constructor(controllers: Controller[]) {
            this.serverInstance = express()
            this.serverInstance.listen(config.PORT)

            this.initializeMiddlewares()
            this.initializeControllers(controllers)
        }

        public getApplication(): Application {
            return this.serverInstance
        }

        private initializeMiddlewares(): void {
            this.serverInstance.use(bodyParser.json())
        }

        private initializeControllers(controllers: Controller[]): void {
            controllers.forEach((controller: Controller): void => {
                this.serverInstance.use('/', controller.getRouter())
            })
        }
    }

    export const bootstrap = (controllers: Controller[]) => new Core(controllers).getApplication()
}

export {CoreModule}
