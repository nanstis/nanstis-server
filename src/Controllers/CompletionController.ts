import {json} from 'body-parser'

import {Request, RequestHandler, Response} from 'express'
import {Controller} from '../Core/Controller'
import {DtoCompletion} from '../Domain/Data/Dto/DtoCompletion'
import {injectable} from 'tsyringe'
import {ClientService} from '../Services/ClientService'
import {ReqCompletion} from '../Domain/Data/Request/ReqCompletion'

@injectable()
class CompletionController extends Controller {

    constructor(private clientService: ClientService) {
        super()
    }

    public getCompletion(): RequestHandler {
        return (req: Request, res: Response): void => {
            const prompt: ReqCompletion = req.body
            
            this.clientService.getCompletion(prompt)
                .then((response: DtoCompletion): void => {
                    res.send(response)
                })
        }
    }

    protected configureRouter(): void {
        this.router.use(json())
    }

    protected initializeRoutes(): void {
        this.router.post('/completions', this.getCompletion())
    }
}

export {CompletionController}