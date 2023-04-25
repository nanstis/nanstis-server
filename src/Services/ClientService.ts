import {DtoTranscript} from '../Domain/Data/Dto/DtoTranscript'
import {DtoCompletion} from '../Domain/Data/Dto/DtoCompletion'
import {ReqCompletion} from '../Domain/Data/Request/ReqCompletion'
import {Client} from '../Providers/ClientProvider'
import {DtoModel, DtoModels} from '../Domain/Data/Dto/DtoModel'
import {environment} from '../Core/Configuration'
import * as FormData from 'form-data'
import {createReadStream} from 'fs'


class ClientService {
    private readonly httpClient: Client

    constructor() {
        this.httpClient = new Client(
            environment.OPENAI_DOMAIN_NAME,
            environment.OPENAI_BEARER_TOKEN,
            environment.OPENAI_API_VERSION
        )
    }

    public getModels(): Promise<DtoModel[]> {
        return this.httpClient.get<DtoModels>('/models').then((response: DtoModels): DtoModel[] => {
            return response.data.map((model: DtoModel): DtoModel => {
                return {
                    id: model.id,
                    permission: model.permission,
                }
            })
        })
    }

    public getModel(name: string): Promise<DtoModel> {
        return this.httpClient.get<DtoModel>('/models/' + name)
            .then((response: DtoModel): DtoModel => {
                return response
            })
    }

    public getCompletion(reqCompletion: ReqCompletion): Promise<DtoCompletion> {
        return this.httpClient.post<DtoCompletion>('/chat/completions', reqCompletion)
            .then((response: DtoCompletion): DtoCompletion => {
                return response
            })
    }

    public getTranscript(audioFilePath: string): Promise<DtoTranscript> {
        const data: FormData = new FormData()

        data.append('file', createReadStream(audioFilePath))
        data.append('model', 'whisper-1')

        return this.httpClient.postFormData<DtoTranscript>('/audio/transcriptions', data)
    }
}

export {ClientService}