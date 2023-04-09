import {Request, RequestHandler, Response} from 'express'
import {ModelDto} from '../Domain/dto/ModelDto'
import {HostModule} from '../Modules/Host'
import {ModelsDto} from '../Domain/dto/ModelsDto'
import {RouterModule} from '../Modules/Router'
import Controller = RouterModule.Controller;
import getHost = HostModule.getHost;
import HostType = HostModule.HostType;


class ModelController extends Controller {
    constructor() {
        super()
    }

    public getModels(): RequestHandler {
        return (req: Request, res: Response): void => {
            getHost(HostType.GPT).get<ModelsDto>('/models').then((response: ModelsDto): void => {
                res.send(response.data.map((model: ModelDto) => model.id))
            })
        }
    }

    public getModel(): RequestHandler {
        return (req: Request, res: Response): void => {
            getHost(HostType.GPT).get<ModelDto>(`/models/${req.params.modelId}`).then((response: ModelDto): void => {
                res.send(response)
            })
        }
    }

    protected initializeRoutes(): void {
        this.router
            .get('/models', this.getModels())
            .get('/models/:modelId', this.getModel())
    }
}

export {ModelController}