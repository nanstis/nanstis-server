import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Transcript } from './Transcript'

@Entity({ name: 'transcript_segment' })
export class TranscriptSegment {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Transcript, (transcript: Transcript) => transcript.segments, { onDelete: 'CASCADE' })
    transcript: Transcript

    @Column()
    name: string

    @Column()
    text: string
}