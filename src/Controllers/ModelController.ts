import * as e from 'express'
import {Request, Response, Router} from 'express'
import {Model} from '../Domain/Model'
import {HostModule} from '../Modules/Host'

module ModelModule {
    import GPT = HostModule.GPT;

    const getAll = (req: Request, res: Response): void => {
        GPT.get<Model[]>('/models').then((response: Model[]): void => {
            res.send(response.map((model: Model) => model.id))
        })
    }

    const getOne = (req: Request, res: Response): void => {
        GPT.get<Model[]>(`/models/${req.params.id}`).then(
            (response: Model[]): void => {
                res.send(response.map((model: Model) => model.id))
            }
        )
    }

    export const controller: e.Router = Router()
        .get('/', getAll)
        .get('/:id', getOne)
}

export const modelController: e.Router = ModelModule.controller
