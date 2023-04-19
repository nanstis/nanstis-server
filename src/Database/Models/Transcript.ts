import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { TranscriptSegment } from './TranscriptSegment'

@Entity({ name: 'transcripts' })
export class Transcript {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    path: string

    @OneToMany(() => TranscriptSegment, (segment: TranscriptSegment) => segment.transcript, { cascade: true })
    segments: TranscriptSegment[]
}