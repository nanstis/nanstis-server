import 'reflect-metadata'
import {container} from 'tsyringe'

import {CoreModule} from './Modules/Core'
import {ModelController} from './Controllers/ModelController'
import {ChatController} from './Controllers/ChatController'
import {AudioController} from './Controllers/AudioController'

CoreModule.bootstrap([
    container.resolve(AudioController),
    container.resolve(ChatController),
    container.resolve(ModelController),
])

