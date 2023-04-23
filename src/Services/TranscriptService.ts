import {injectable} from 'tsyringe'
import {TranscriptRepository} from '../Database/Repository/TranscriptRepository'
import {Transcript} from '../Database/Models/Transcript'
import {FfmpegProvider} from '../Providers/FfmpegProvider'
import {File} from '../env'
import {readdirSync, rmSync} from 'fs'
import {ClientService} from './ClientService'
import {join} from 'path'
import {DtoTranscript} from '../Domain/Data/Dto/DtoTranscript'
import {SegmentRepository} from '../Database/Repository/SegmentRepository'
import {Segment} from '../Database/Models/Segment'
import {logger} from '../Core/Logger'

@injectable()
class TranscriptService {
    private audioPath: string
    private file: File

    constructor(
        private transcriptRepository: TranscriptRepository,
        private segmentRepository: SegmentRepository,
        private clientService: ClientService) {
    }

    public async createTranscript(file: File): Promise<Promise<Segment>[]> {
        this.file = file
        logger.info(this.file)

        const dirPath: string = this.file.destination
        return this.transcriptRepository.createTranscript(dirPath)
            .then((transcript: Transcript): Promise<Segment>[] => {
                this.extractAudio()
                this.splitAudio()

                return readdirSync(dirPath).map((file: string) => {
                    const filePath: string = join(dirPath, file)

                    return this.clientService.getTranscript(filePath)
                        .then(async (response: DtoTranscript): Promise<Segment> => {
                            rmSync(filePath)

                            return this.segmentRepository.createSegment(transcript, filePath, response.text)
                                .then((segment: Segment) => {
                                    logger.info(segment.absolutePath)
                                    return segment
                                })
                        })
                })
            })
    }

    extractAudio(): void {
        this.audioPath = `${this.file.path}.mp3`

        new FfmpegProvider(this.file.path)
            .formatTo('mp3')
            .bitRate(16)
            .channels(1)
            .outDir(this.audioPath)
            .execSync()
    }

    splitAudio(): void {
        new FfmpegProvider(this.audioPath)
            .formatTo('segment')
            .segmentTime(60)
            .outDirCopy(`${this.file.destination}/%03d.mp3`)
            .execSync()

        rmSync(this.audioPath)
    }
}

export {TranscriptService}