import { CoreModule } from './Modules/Core'
import { ModelController } from './Controllers/ModelController'
import { ChatController } from './Controllers/ChatController'
import { AudioController } from './Controllers/AudioController'

CoreModule.bootstrap([
  new ModelController(),
  new ChatController(),
  new AudioController(),
])
