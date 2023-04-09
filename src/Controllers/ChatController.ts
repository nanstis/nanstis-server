import {Request, RequestHandler, Response} from 'express'
import {HostModule} from '../Modules/Host'
import {CompletionDto} from '../Domain/dto/CompletionDto'
import {RouterModule} from '../Modules/Router'
import Controller = RouterModule.Controller;
import getHost = HostModule.getHost;
import HostType = HostModule.HostType;

class ChatController extends Controller {
    constructor() {
        super()
    }

    public getCompletion(): RequestHandler {
        return (req: Request, res: Response): void => {
            getHost(HostType.GPT).post<CompletionDto>('/chat/completions', req.body)
                .then((response: CompletionDto): void => {
                    res.send(response)
                })
        }
    }
    
    protected initializeRoutes(): void {
        this.router.get('/completions', this.getCompletion())
    }
}

export {ChatController}