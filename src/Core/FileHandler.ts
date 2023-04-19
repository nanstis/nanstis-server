import {Request, RequestHandler} from 'express'
import {configuration, environment} from './Configuration'
import {join} from 'path'
import {mkdir} from 'fs'
import * as multer from 'multer'
import {diskStorage, StorageEngine} from 'multer'
import {logger} from './Logger'
import {IMulter} from '../Domain/Interfaces/IMulter'
import {File, FileDestination} from '../env'

class FileHandler {
    private readonly requestHandler: RequestHandler
    private readonly uploadPath: string

    constructor(fieldName: string) {
        this.uploadPath = join(configuration.getBasePath(), environment.UPLOAD_PATH)

        this.requestHandler = multer({
            storage: this.getStorageEngine(),
        }).single(fieldName)
    }

    public getRequestHandler(): RequestHandler {
        return this.requestHandler
    }

    private getPathResolver(): IMulter {
        return (req: Request, file: File, destination: FileDestination): void => {
            const dynamicPath: string = join(this.uploadPath, Date.now().toString())
            mkdir(dynamicPath, {recursive: true}, (err: Error): void => {
                err ? logger.info(err) : destination(null, dynamicPath)
            })
        }
    }

    private getStorageEngine(): StorageEngine {
        return diskStorage({
            destination: this.getPathResolver(),
        })
    }
}

const incomingFile = (fieldName: string): RequestHandler => {
    return new FileHandler(fieldName).getRequestHandler()
}

export {incomingFile}