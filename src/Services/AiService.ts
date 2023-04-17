import {IHost} from '../Domain/Interfaces/HostInterface'
import {DtoCompletion} from '../Domain/Data/DtoCompletion'
import {ReqQuestion} from '../Domain/Request/ReqQuestion'
import {DtoModel, DtoModels} from '../Domain/Data/DtoModel'
import {HostModule} from '../Modules/Host'
import {DtoTranscript} from '../Domain/Data/DtoTranscript'
import {readFile} from 'fs/promises'
import {Blob, Buffer} from 'buffer'
import {ConfigModule} from '../Modules/Config'
import * as fs from 'fs'
import environment = ConfigModule.environment;


export class AiService {
    private readonly apiHost: IHost

    constructor() {
        this.apiHost = HostModule.newHost({
            domainName: environment.OPENAI_DOMAIN_NAME,
            apiVersion: environment.OPENAI_API_VERSION,
            bearerToken: environment.OPENAI_BEARER_TOKEN,
        })
    }

    public getModels(): Promise<string[]> {
        return this.apiHost.get<DtoModels>('/models').then((response: DtoModels): string[] => {
            return response.data.map((model: DtoModel) => model.id)
        })
    }

    public getModel(name: string): Promise<DtoModel> {
        return this.apiHost.get<DtoModel>('/models/' + name)
            .then((response: DtoModel): DtoModel => {
                return response
            })
    }

    public getCompletion(question: ReqQuestion): Promise<DtoCompletion> {
        return this.apiHost.post<DtoCompletion>('/chat/completions', question)
            .then((response: DtoCompletion): DtoCompletion => {
                return response
            })
    }

    public createTranscript(filePath: string): void {
        const data: FormData = new FormData()
        readFile(filePath).then((fileBuffer: Buffer): void => {
            const fileBlob: Blob = new Blob([fileBuffer])

            // @ts-ignore - value is typed Blob | string
            data.append('file', fileBlob, filePath)
            data.append('model', 'whisper-1')

            this.apiHost.postFormData<DtoTranscript>('/audio/transcriptions', data)
                .then((response: DtoTranscript): void => {
                    fs.writeFileSync(`${filePath}.txt`, response.text)
                    fs.rmSync(filePath)
                })
        })
    }
}