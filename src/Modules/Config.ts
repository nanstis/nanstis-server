import * as env from 'dotenv'
import {DotenvParseOutput} from 'dotenv'
import * as path from 'path'

module ConfigModule {

    class Configuration {
        private readonly environment: DotenvParseOutput
        private readonly rootPath: string

        constructor(environment: DotenvParseOutput) {
            this.environment = environment
            this.rootPath = path.join(__dirname, '../../')
        }

        public getOutput(): DotenvParseOutput {
            return this.environment
        }

        public getRootPath(): string {
            return this.rootPath
        }
    }

    export const config: Configuration = new Configuration(env.config().parsed)
    export const environment: DotenvParseOutput = config.getOutput()
}

export {ConfigModule}
