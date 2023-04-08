import {Request, RequestHandler, Response} from 'express'
import {ControllerModule} from '../Modules/Controller'
import {HostModule} from '../Modules/Host'
import {Model} from '../Domain/dto/Model'
import Controller = ControllerModule.Controller;
import getHost = HostModule.getHost;

class GptController extends Controller {
    constructor() {
        super()
    }

    public getModels(): RequestHandler {
        return (req: Request, res: Response): void => {
            getHost('gpt').get<Model[]>('/models').then((response): void => {
                res.send(response.map((model: Model) => model.id))
            })
        }
    }

    protected initializeRoutes(): void {
        this.router.get('/models', this.getModels())
    }
}

export {GptController}