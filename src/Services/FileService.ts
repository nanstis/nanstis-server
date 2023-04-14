import {CoreModule} from '../Modules/Core'
import {File} from '../Domain/Interfaces/MulterInterface'
import logger = CoreModule.logger;

export class FileService {
    constructor() {
    }

    public extractAudio(file: File): void {
        logger.info(file)
    }
}