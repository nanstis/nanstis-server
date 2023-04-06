import {CoreModule} from './Modules/Core'
import {HostModule} from './Modules/Host'
import {ConfigModule} from './Modules/Config'
import {ControllerModule} from './Modules/Controller'

module IndexModule {

    import config = ConfigModule.config;
    import HostInterface = HostModule.HostInterface;
    import ControllerInterface = ControllerModule.ControllerInterface;
    import logger = ConfigModule.logger;

    const GPT: HostInterface = HostModule.newInstance(
        config.get().OPENAI_DOMAIN_NAME,
        config.get().OPENAI_BEARER_TOKEN,
        config.get().OPENAI_API_VERSION
    )

    const gptController: ControllerInterface = ControllerModule.newInstance(GPT)

    gptController.get('/')

    logger.info(gptController.getHandlers())

    export const bootstrap = () => {
        CoreModule.load('/models', gptController.getHandlers())
    }
}

IndexModule.bootstrap()