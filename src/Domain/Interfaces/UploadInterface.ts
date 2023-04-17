import * as fs from 'fs'

interface UploadInterface {
    createReadStream(): fs.ReadStream;
}