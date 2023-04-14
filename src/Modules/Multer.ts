import {Request, RequestHandler} from 'express'
import * as multer from 'multer'
import {StorageEngine} from 'multer'
import {ConfigModule} from './Config'
import * as path from 'path'
import {File, MulterCallback, MulterInterface} from '../Domain/Interfaces/MulterInterface'

module MulterModule {

    import config = ConfigModule.config;

    class FileHandler {
        private readonly requestHandler: RequestHandler

        constructor(fieldName: string) {
            this.requestHandler = multer({
                storage: this.getStorageEngine(),
            }).single(fieldName)
        }

        public getRequestHandler(): RequestHandler {
            return this.requestHandler
        }

        private newHandler(absolutePath: string, option?: (file: File) => string): MulterInterface {
            return (req: Request, file: File, multer: MulterCallback): void => {
                const destination: string = option ? absolutePath + option(file) : absolutePath

                multer(null, destination)
            }
        }

        private getStorageEngine(): StorageEngine {
            const location: string = path.join(config.getRootPath(), '/public/tmp')
            const prefix: string = Date.now() + '-' + Math.round(Math.random() * 1E9)

            return multer.diskStorage({
                destination: this.newHandler(location),
                filename: this.newHandler(prefix, (file: File) => file.originalname),
            })
        }
    }

    export const fileHandler = (fieldName: string): RequestHandler => {
        return new FileHandler(fieldName).getRequestHandler()
    }
}

export {MulterModule}