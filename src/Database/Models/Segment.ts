import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import {Transcript} from './Transcript'

@Entity({name: 'segments'})
export class Segment {
    @PrimaryGeneratedColumn()
    id: number

    @Column({name: 'absolute_path'})
    absolutePath: string

    @Column()
    text: string

    @ManyToOne(() => Transcript)
    transcript: Transcript
}