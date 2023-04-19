import {injectable} from 'tsyringe'
import {TranscriptRepository} from '../Database/Repository/TranscriptRepository'
import {Transcript} from '../Database/Models/Transcript'
import {ffmpeg} from '../Providers/FfmpegProvider'
import {logger} from '../Core/Logger'
import {File} from '../env'

@injectable()
class TranscriptService {
    private dirPath: string
    private inputPath: string
    private audioPath: string

    constructor(private repository: TranscriptRepository) {

    }

    public createTranscript(file: File): Promise<Transcript> {
        this.dirPath = file.destination
        this.inputPath = file.path

        return this.repository.createTranscript(file.destination).then((transcript: Transcript): Transcript => {

            logger.info(this.extractAudio())
            logger.info(this.splitAudio())

            return transcript
        })
    }

    public extractAudio(): string {
        this.audioPath = `${this.inputPath}.mp3`

        return ffmpeg(this.inputPath)
            .formatTo('mp3')
            .bitRate(20)
            .channels(1)
            .outDir(this.audioPath)
            .execSync().toString()
    }

    public splitAudio(): string {
        return ffmpeg(this.audioPath)
            .formatTo('segment')
            .segmentTime(60)
            .outDirCopy(`${this.dirPath}/%03d.mp3`)
            .execSync().toString()
    }
}

export {TranscriptService}