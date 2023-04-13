import { Request, RequestHandler, Response } from 'express'
import { RouterModule } from '../Modules/Router'
import * as bodyParser from 'body-parser'
import { CoreModule } from '../Modules/Core'
import Controller = RouterModule.Controller;
import logger = CoreModule.logger;

class AudioController extends Controller {
  constructor() {
    super()
  }

  public generateText(): RequestHandler {
    return (req: Request, res: Response): void => {
      logger.info(req.body)

    }
  }

  protected initializeRoutes(): void {
    this.router.post(
      '/transcription',
      bodyParser.urlencoded({
        extended: true,
      }),
      this.generateText()
    )
  }
}

export { AudioController }
