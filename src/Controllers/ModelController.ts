import {Request, RequestHandler, Response} from 'express'
import {Controller} from '../Core/Controller'
import {DtoModel} from '../Domain/Data/Dto/DtoModel'
import {ClientService} from '../Services/ClientService'
import {json} from 'body-parser'
import {injectable} from 'tsyringe'

@injectable()
class ModelController extends Controller {
    constructor(private clientService: ClientService) {
        super()
    }

    public getModels(): RequestHandler {
        return (req: Request, res: Response): void => {
            this.clientService.getModels()
                .then((response: string[]): void => {
                    res.send({models: response})
                })
        }
    }

    public getModel(): RequestHandler {
        return (req: Request, res: Response): void => {
            const modelId: string = req.params.modelId

            this.clientService.getModel(modelId)
                .then((response: DtoModel): void => {
                    res.send(response)
                })
        }
    }

    protected configureRouter(): void {
        this.router.use(json())
    }

    protected initializeRoutes(): void {
        this.router
            .get('/models', this.getModels())
            .get('/models/:modelId', this.getModel())
    }
}

export {ModelController}