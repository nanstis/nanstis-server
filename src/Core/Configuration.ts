import {container, singleton} from 'tsyringe'
import {config, DotenvParseOutput} from 'dotenv'
import {join} from 'path'

@singleton()
class Configuration {
    private readonly environment: DotenvParseOutput
    private readonly rootPath: string

    constructor() {
        this.environment = config().parsed
        this.rootPath = join(__dirname, '../../')
    }

    public getEnvironment(): DotenvParseOutput {
        return this.environment
    }

    public getBasePath(): string {
        return this.rootPath
    }
}


const configuration: Configuration = container.resolve(Configuration)
const environment: DotenvParseOutput = configuration.getEnvironment()

export {configuration, environment}