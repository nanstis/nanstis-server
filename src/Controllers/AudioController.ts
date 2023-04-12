import {Request, RequestHandler, Response} from 'express'
import {RouterModule} from '../Modules/Router'
import {HostModule} from '../Modules/Host'
import {CompletionDto} from '../Domain/dto/CompletionDto'
import Controller = RouterModule.Controller;
import HostType = HostModule.HostType;
import getHost = HostModule.getHost;

class ChatController extends Controller {
    constructor() {
        super()
    }

    public generateText(): RequestHandler {
        return (req: Request, res: Response): void => {
            getHost(HostType.GPT).post('/audio/transcription', req.body)
        }
    }


    protected initializeRoutes(): void {
        this.router.post('/completions', this.generateText())
    }
}

export {ChatController}