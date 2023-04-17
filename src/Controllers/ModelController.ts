import {Request, RequestHandler, Response} from 'express'
import {DtoModel} from '../Domain/Data/DtoModel'
import {injectable} from 'tsyringe'
import {RouterModule} from '../Modules/Router'
import {AiService} from '../Services/AiService'
import Controller = RouterModule.Controller;

@injectable()
class ModelController extends Controller {
    constructor(private aiService: AiService) {
        super()
    }

    public getModels(): RequestHandler {
        return (req: Request, res: Response): void => {
            this.aiService.getModels().then((response: string[]): void => {
                res.send({models: response})
            })
        }
    }

    public getModel(): RequestHandler {
        return (req: Request, res: Response): void => {
            this.aiService.getModel(req.params.modelId).then((response: DtoModel): void => {
                res.send(response)
            })
        }
    }

    protected configureRouter(): void {
    }

    protected initializeRoutes(): void {
        this.router
            .get('/models', this.getModels())
            .get('/models/:modelId', this.getModel())
    }
}

export {ModelController}