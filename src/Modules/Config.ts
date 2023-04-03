import * as env from 'dotenv'
import {DotenvParseOutput} from 'dotenv'
import {Logger} from 'tslog'
import * as path from 'path'

module ConfigModule {
    class Configuration {
        private readonly appLogger: Logger<unknown>
        private readonly environment: DotenvParseOutput
        private readonly rootPath: string

        constructor(environment: DotenvParseOutput) {
            this.appLogger = new Logger<unknown>({
                type: 'pretty',
                name: 'Application',
            })

            this.environment = environment
            this.rootPath = path.join(__dirname, '../../')
        }

        public get(): DotenvParseOutput {
            return this.environment
        }

        public getLogger(): Logger<unknown> {
            return this.appLogger
        }
    }

    export const config: Configuration = new Configuration(env.config().parsed)
    export const logger: Logger<unknown> = config.getLogger()
}

export {ConfigModule}
