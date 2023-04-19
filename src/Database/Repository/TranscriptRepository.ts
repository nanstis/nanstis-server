import {Transcript} from '../Models/Transcript'
import {Repository} from './Repository'

export class TranscriptRepository extends Repository<Transcript> {
    constructor() {
        super(Transcript)
    }

    public createTranscript(destPath: string): Promise<Transcript> {
        const transcript: Transcript = new Transcript()

        transcript.path = destPath
        return this.repository.save(transcript)
    }

    public getOne(id: number): Promise<Transcript> {
        return this.repository.findOne({
            where: {id: id},
        })
    }
} 