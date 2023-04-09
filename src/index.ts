import {CoreModule} from './Modules/Core'
import {ModelController} from './Controllers/ModelController'
import {ChatController} from './Controllers/ChatController'

CoreModule.bootstrap([
    new ModelController(),
    new ChatController(),
])