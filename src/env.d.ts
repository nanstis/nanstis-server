import * as e from "express";
import {Express} from "express";

declare type FfmpegFormat = 'segment' | 'mp3';

declare type Router = e.Router;

declare type File = Express.Multer.File

declare type FileDestination = (error: Error | null, destination: string) => void

export {
    FileDestination,
    FfmpegFormat,
    Router,
    File,
};