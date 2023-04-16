import {Request, RequestHandler, Response} from 'express'
import {injectable} from 'tsyringe'
import {FileService} from '../Services/FileService'
import {MulterModule} from '../Modules/Multer'
import {RouterModule} from '../Modules/Router'
import {File} from '../Domain/Interfaces/MulterInterface'
import Controller = RouterModule.Controller;

@injectable()
class AudioController extends Controller {
    constructor(private fileService: FileService) {
        super()
    }

    public generateText(): RequestHandler {
        return (req: Request, res: Response): void => {
            this.fileService.extractAudio(req.file as unknown as File)

            res.send({
                text: 'Hello World',
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
