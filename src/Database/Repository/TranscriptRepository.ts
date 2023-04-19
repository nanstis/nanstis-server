import {Transcript} from '../Models/Transcript'
import {Repository} from './Repository'

class TranscriptRepository extends Repository<Transcript> {
    constructor() {
        super(Transcript)
    }

    public createTranscript(destPath: string): Promise<Transcript> {
        const transcript: Transcript = new Transcript()

        transcript.absolutePath = destPath
        return this.repository.save(transcript)
    }
}

export {TranscriptRepository}