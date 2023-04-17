import {File} from '../Domain/Interfaces/MulterInterface'
import {CoreModule} from '../Modules/Core'
import {execSync} from 'child_process'
import * as fs from 'fs'
import {injectable} from 'tsyringe'
import {AiService} from './AiService'
import logger = CoreModule.logger;

@injectable()
export class FileService {

    constructor(private aiService: AiService) {
    }

    public getTextFromAudio(file: File): Promise<string[]> {
        const segments: string[] = this.getSegments(file)

        return new Promise((): void => {
            segments.forEach((item: string): void => {
                this.aiService.createTranscript(item)
            })
        }).then((): string[] => {
            return segments.map((item: string): string => {
                return fs.readFileSync(`${item}.txt`, 'utf8')
            })
        })
    }

    public getSegments(file: File): string[] {
        logger.info(`Extracting audio from ${file.path}`)
        execSync(`ffmpeg -i ${file.path} -f mp3 -ar 16000 -ac 1 ${file.path}.mp3`)
        execSync(`ffmpeg -i ${file.path}.mp3 -f segment -segment_time 60 -c copy ${file.destination}/%03d.mp3`)

        fs.rmSync(file.path)
        fs.rmSync(`${file.path}.mp3`)

        return fs.readdirSync(file.destination).map((item: string): string => {
            return file.destination + '/' + item
        })
    }
}