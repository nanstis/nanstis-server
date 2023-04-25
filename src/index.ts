import {dataSource} from './Core/Database'
import {bootstrap} from './Core/Boot'
import {container} from 'tsyringe'
import {TranscriptController} from './Controllers/TranscriptController'
import {ModelController} from './Controllers/ModelController'
import {CompletionController} from './Controllers/CompletionController'
import {logger} from './Core/Logger'
import {environment} from './Core/Configuration'

dataSource.initialize().then((): void => {

    bootstrap([
        container.resolve(TranscriptController),
        container.resolve(CompletionController),
        container.resolve(ModelController),
    ])

    logger.info(`Server started on port ${environment.PORT}...`)

})

