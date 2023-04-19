import {execSync} from 'child_process'
import {FfmpegFormat} from '../env'
import {logger} from '../Core/Logger'

class StringBuilder {
    private elements: string[] = []

    public append(str: string): void {
        this.elements.push(str)
    }

    public toString(): string {
        return this.elements.join('')
    }
}

class FfmpegProvider {
    private readonly inputFile: string
    private readonly queryBuilder: StringBuilder

    constructor(inputFile: string) {
        this.inputFile = inputFile
        this.queryBuilder = new StringBuilder()

        logger.info(`Audio streams: ${this.getStreams()}`)
        this.queryBuilder.append(`ffmpeg -i ${this.inputFile}`)
    }

    public formatTo(value: FfmpegFormat): FfmpegProvider {
        this.queryBuilder.append(`-f ${value}`)
        return this
    }

    public bitRate(kiloHertz: number): FfmpegProvider {
        this.queryBuilder.append(`-ar ${kiloHertz * 1000}`)
        return this
    }

    public channels(value: number): FfmpegProvider {
        this.queryBuilder.append(`-ac ${value}`)
        return this
    }

    public segmentTime(value: number): FfmpegProvider {
        this.queryBuilder.append(`-segment_time ${value}`)
        return this
    }

    public outDir(absolutePath: string): FfmpegProvider {
        this.queryBuilder.append(absolutePath)
        return this
    }

    public outDirCopy(absolutePath: string): FfmpegProvider {
        this.queryBuilder.append(`-c copy ${absolutePath}`)
        return this
    }

    public execSync(): Buffer {
        return execSync(this.queryBuilder.toString())
    }

    private getStreams(): number {
        return +execSync(`
            ffprobe 
            -v error
            -show_entries stream=index,codec_type 
            -of csv=p=0:s=x ${this.inputFile} | grep a | wc -l`)
    }
}

export function ffmpeg(inputFile: string): FfmpegProvider {
    return new FfmpegProvider(inputFile)
}
