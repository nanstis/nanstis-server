import {ILogObj, Logger} from 'tslog'

export const logger: Logger<ILogObj> = new Logger<ILogObj>({
    type: 'pretty',
    name: 'Application',
})
