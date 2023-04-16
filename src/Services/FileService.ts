import {File} from '../Domain/Interfaces/MulterInterface'
import {CoreModule} from '../Modules/Core'
import {execSync} from 'child_process'
import logger = CoreModule.logger;


export class FileService {

    constructor() {
    }

    public extractAudio(file: File): void {
        logger.info(`Extracting audio from ${JSON.stringify(file)}`)
        execSync(`ffmpeg -i ${file.path} -f mp3 -ar 16000 -ac 1 ${file.path}.mp3`)
        execSync(`ffmpeg -i ${file.path}.mp3 -f segment -segment_time 60 -c copy ${file.destination}/%03d.mp3`)
    }
}