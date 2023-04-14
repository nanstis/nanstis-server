import 'reflect-metadata'
import {container} from 'tsyringe'

import {CoreModule} from './Modules/Core'
import {ModelController} from './Controllers/ModelController'
import {ChatController} from './Controllers/ChatController'
import {AudioController} from './Controllers/AudioController'
import {HostModule} from './Modules/Host'
import {ConfigModule} from './Modules/Config'
import {IHost} from './Domain/Interfaces/HostInterface'

import gptConfig = ConfigModule.gptConfig;

CoreModule.bootstrap([
    container.resolve(AudioController),
    container.resolve(ChatController),
    container.resolve(ModelController),
])

export const GPT: IHost = HostModule.newHost(gptConfig)
