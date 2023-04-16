import {Request, RequestHandler} from 'express'
import * as multer from 'multer'
import {StorageEngine} from 'multer'
import {ConfigModule} from './Config'
import {File, MulterCallback, MulterInterface} from '../Domain/Interfaces/MulterInterface'
import {CoreModule} from './Core'
import * as fs from 'fs'
import * as path from 'path'


module MulterModule {

    import config = ConfigModule.config;
    import environment = ConfigModule.environment;
    import logger = CoreModule.logger;

    class FileHandler {
        private readonly requestHandler: RequestHandler
        private readonly uploadPath: string

        constructor(fieldName: string) {
            this.uploadPath = path.join(config.getRootPath(), environment.UPLOAD_PATH)

            this.requestHandler = multer({
                storage: this.getStorageEngine(),
            }).single(fieldName)
        }

        public getRequestHandler(): RequestHandler {
            return this.requestHandler
        }

        private pathResolver(): MulterInterface {
            return (req: Request, file: File, multer: MulterCallback): void => {
                const dynamicPath: string = path.join(this.uploadPath, Date.now().toString())
                fs.mkdir(dynamicPath, {recursive: true}, (err: Error): void => {
                    err ? logger.info(err) : multer(null, dynamicPath)
                })
            }
        }

        private getStorageEngine(): StorageEngine {

            return multer.diskStorage({
                destination: this.pathResolver(),
            })
        }
    }

    export const fileHandler = (fieldName: string): RequestHandler => {
        return new FileHandler(fieldName).getRequestHandler()
    }
}

export {MulterModule}