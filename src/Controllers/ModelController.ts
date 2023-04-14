import {Request, RequestHandler, Response} from 'express'
import {DtoModel, DtoModels} from '../Domain/Data/DtoModel'
import {injectable} from 'tsyringe'
import {GPT} from '../index'
import {RouterModule} from '../Modules/Router'
import Controller = RouterModule.Controller;

@injectable()
class ModelController extends Controller {
    constructor() {
        super()
    }

    public getModels(): RequestHandler {
        return (req: Request, res: Response): void => {
            GPT.get<DtoModels>('/models').then((response: DtoModels): void => {
                res.send(response.data.map((model: DtoModel) => model.id))
            })
        }
    }

    public getModel(): RequestHandler {
        return (req: Request, res: Response): void => {
            GPT.get<DtoModel>(`/models/${req.params.modelId}`).then((response: DtoModel): void => {
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