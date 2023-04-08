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

        public getOutput(): DotenvParseOutput {
            return this.environment
        }
    }

    export const config: DotenvParseOutput = new Configuration(env.config().parsed).getOutput()
}

export {ConfigModule}
