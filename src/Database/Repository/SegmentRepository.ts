import {Transcript} from '../Models/Transcript'
import {Repository} from './Repository'
import {Segment} from '../Models/Segment'

class SegmentRepository extends Repository<Segment> {
    constructor() {
        super(Segment)
    }

    public createSegment(transcript: Transcript, absolutePath: string, text: string): Promise<Segment> {
        const segment: Segment = new Segment()

        segment.text = text
        segment.absolutePath = absolutePath
        segment.transcript = transcript
        
        return this.repository.save(segment)
    }

    public getSegments(transcript: Transcript): Promise<Segment[]> {
        return this.repository.find({
            where: {
                transcript: transcript,
            },
        })
    }
}

export {SegmentRepository}