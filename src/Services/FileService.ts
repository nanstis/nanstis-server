import {File} from '../Domain/Interfaces/MulterInterface'
import {CoreModule} from '../Modules/Core'
import {exec} from 'child_process'
import logger = CoreModule.logger;


export class FileService {

    constructor() {
    }

    public extractAudio(file: File): void {
        logger.info(`Extracting audio from ${file}`)
        exec(`ffmpeg -i ${file.path} -f wav -ar 16000 -ac 1 ${file.path}.wav`).on('exit', (code: number): void => {
            const isSuccess: boolean = code === 0
            logger.info(`ffmpeg exited with code ${isSuccess}`)
        })
    }
}