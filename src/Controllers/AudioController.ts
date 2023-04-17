import {injectable} from 'tsyringe'

import {Request, RequestHandler, Response} from 'express'
import {FileService} from '../Services/FileService'
import {MulterModule} from '../Modules/Multer'
import {RouterModule} from '../Modules/Router'
import {File} from '../Domain/Interfaces/MulterInterface'
import {CoreModule} from '../Modules/Core'
import Controller = RouterModule.Controller;
import logger = CoreModule.logger;

@injectable()
class AudioController extends Controller {
    constructor(private fileService: FileService) {
        super()
    }

    public generateText(): RequestHandler {
        return (req: Request, res: Response): void => {
            this.fileService.getTextFromAudio(req.file as unknown as File).then((text: string[]): void => {
                logger.info('Generated text from audio', text)
                res.send({segments: text})
            })
        }
    }

    protected configureRouter(): void {
        this.router
            .use(MulterModule.fileHandler('audio'))
    }

    protected initializeRoutes(): void {
        this.router.post('/transcription', this.generateText()
        )
    }
}

export {AudioController}
