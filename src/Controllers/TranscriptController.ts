import {injectable} from 'tsyringe'
import {incomingFile} from '../Core/FileHandler'
import {Controller} from '../Core/Controller'
import {Request, RequestHandler, Response} from 'express'
import {TranscriptService} from '../Services/TranscriptService'
import {Transcript} from '../Database/Models/Transcript'
import {File} from '../env'

@injectable()
class TranscriptController extends Controller {
    constructor(private transcriptService: TranscriptService) {
        super()
    }

    public generateText(): RequestHandler {
        return (req: Request, res: Response): void => {
            const incomingFile: File = req.file

            this.transcriptService.createTranscript(incomingFile)
                .then((transcript: Transcript): void => {
                    res.send({
                        message: 'File uploaded successfully',
                        transcript: transcript,
                    })
                })
        }
    }

    protected configureRouter(): void {
        this.router
            .use(incomingFile('audio'))
    }

    protected initializeRoutes(): void {
        this.router.post('/transcription', this.generateText()
        )
    }
}

export {TranscriptController}
