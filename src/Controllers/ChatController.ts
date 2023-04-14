import {Request, RequestHandler, Response} from 'express'
import {DtoCompletion} from '../Domain/Data/DtoCompletion'
import {injectable} from 'tsyringe'
import {GPT} from '../index'
import {RouterModule} from '../Modules/Router'
import Controller = RouterModule.Controller;

@injectable()
class ChatController extends Controller {
    constructor() {
        super()
    }

    public getCompletion(): RequestHandler {
        return (req: Request, res: Response): void => {
            GPT.post<DtoCompletion>('/chat/completions', req.body)
                .then((response: DtoCompletion): void => {
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