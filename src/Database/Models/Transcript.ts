import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity({name: 'transcripts'})
export class Transcript {
    @PrimaryGeneratedColumn()
    id: number

    @Column({name: 'absolute_path'})
    absolutePath: string
}