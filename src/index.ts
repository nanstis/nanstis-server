import 'reflect-metadata'
import { container } from 'tsyringe'
import { CompletionController } from './Controllers/CompletionController'
import { ModelController } from './Controllers/ModelController'
import { TranscriptController } from './Controllers/TranscriptController'
import { bootstrap } from './Core/Boot'
import { environment } from './Core/Configuration'
import { dataSource } from './Core/Database'
import { logger } from './Core/Logger'

dataSource.initialize().then((): void => {

  bootstrap([
    container.resolve(TranscriptController),
    container.resolve(CompletionController),
    container.resolve(ModelController),
  ])

  logger.info(`Server started on port ${environment.PORT}...`)

}).catch((err: Error): void => {
  logger.error('Problem starting server: ', err)
})

