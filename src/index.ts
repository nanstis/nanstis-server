import {CoreModule} from './Modules/Core'
import {GptController} from './Controllers/GptController'

CoreModule.bootstrap([
    new GptController(),
])