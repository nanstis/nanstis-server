import {Request, RequestHandler, Response} from 'express'
import {ControllerModule} from '../Modules/Controller'
import {HostModule} from '../Modules/Host'
import Controller = ControllerModule.Controller;

class GptController extends Controller {
    constructor() {
        super()
    }

    public transcribeAudio(): RequestHandler {
        return (req: Request, res: Response): void => {

        }
    }

    protected initializeRoutes(): void {
        this.router.post('/transcribe', this.transcribeAudio())
    }
}

export {GptController}