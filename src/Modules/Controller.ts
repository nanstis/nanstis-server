import * as e from 'express'
import {RequestHandler, Router} from 'express'
import {HostModule} from './Host'
import {AxiosResponse} from 'axios'

module ControllerModule {

    import HostInterface = HostModule.HostInterface;

    export interface ControllerInterface {
        getHandlers(): RequestHandler[]

        get<T>(_path: string, _handler: () => RequestHandler): Promise<AxiosResponse<T>>
    }

    class Controller implements ControllerInterface {

        private readonly host: HostInterface

        private requestHandlers: RequestHandler[] = []

        constructor(host: HostInterface) {
            this.host = host
        }

        public getHandlers(): RequestHandler[] {
            return this.requestHandlers
        }

        public get(path: string, handler: () => RequestHandler): Promise<AxiosResponse> {
            return this.host.get(path).then((response: AxiosResponse) => {
                this.requestHandlers.push(handler())
                return response
            })
        }
    }

    /**
     * const getAll = (req: Request, res: Response): void => {
     *         GPT.get<Model[]>('/models').then((response: Model[]): void => {
     *             res.send(response.map((model: Model) => model.id))
     *         })
     *     }
     *
     *     const getOne = (req: Request, res: Response): void => {
     *         GPT.get<Model[]>(`/models/${req.params.id}`).then(
     *             (response: Model[]): void => {
     *                 res.send(response.map((model: Model) => model.id))
     *             }
     *         )
     *     }
     */

    export function newInstance(host: HostInterface): Controller {
        return new Controller(host)
    }

    export function addRoute(path: string, handler: e.RequestHandler): e.Router {
        return Router().get(path, handler)
    }
}

export {ControllerModule}
