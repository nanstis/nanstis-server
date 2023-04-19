import {Request} from 'express'
import {File, FileDestination} from '../../env'

interface IMulter {
    (req: Request, file: File, destination: FileDestination): void
}

export type {IMulter}