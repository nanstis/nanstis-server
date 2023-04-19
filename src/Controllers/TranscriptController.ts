import {injectable} from 'tsyringe'
import {incomingFile} from '../Core/FileHandler'
import {Controller} from '../Core/Controller'
import {Request, RequestHandler, Response} from 'express'
import {TranscriptService} from '../Services/TranscriptService'
import {File} from '../env'
import {Segment} from '../Database/Models/Segment'

@injectable()
class TranscriptController extends Controller {
    constructor(private transcriptService: TranscriptService) {
        super()
    }

    public generateText(): RequestHandler {
        return (req: Request, res: Response): void => {
            const incomingFile: File = req.file

            this.transcriptService.createTranscript(incomingFile).then((promises: Promise<Segment>[]): void => {
                Promise.all(promises).then((segments: Segment[]): void => {
                    res.send(segments)
                })
            })
        }
    }

    protected configureRouter(): void {
        this.router
            .use(incomingFile('file'))
    }

    protected initializeRoutes(): void {
        this.router.post('/transcription', this.generateText()
        )
    }
}

export {TranscriptController}
