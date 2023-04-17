import {Express, Request} from 'express'

type MulterCallback = (error: Error | null, destination: string) => void
type File = Express.Multer.File

interface MulterInterface {
    (req: Request, file: Express.Multer.File, multer: MulterCallback): void
}

export type {MulterInterface, MulterCallback, File}