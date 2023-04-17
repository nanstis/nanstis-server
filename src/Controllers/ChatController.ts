import {Request, RequestHandler, Response} from 'express'
import {DtoCompletion} from '../Domain/Data/DtoCompletion'
import {injectable} from 'tsyringe'
import {RouterModule} from '../Modules/Router'
import {AiService} from '../Services/AiService'
import Controller = RouterModule.Controller;

@injectable()
class ChatController extends Controller {

    constructor(private aiService: AiService) {
        super()
    }

    public getCompletion(): RequestHandler {
        return (req: Request, res: Response): void => {
            this.aiService.getCompletion(req.body).then((response: DtoCompletion): void => {
                res.send(response)
            })
        }
    }

    protected configureRouter(): void {
    }

    protected initializeRoutes(): void {
        this.router.post('/completions', this.getCompletion())
    }
}

export {ChatController}