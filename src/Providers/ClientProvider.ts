import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'
import * as FormData from 'form-data'

class Client {
    private readonly domainName: string
    private readonly apiVersion: string
    private readonly bearerToken: string
    private axiosInstance: AxiosInstance

    constructor(
        domainName: string,
        bearerToken: string,
        apiVersion: string
    ) {
        this.domainName = domainName
        this.apiVersion = apiVersion
        this.bearerToken = bearerToken
        this.axiosInstance = axios.create()
    }


    public get<T>(path: string, params?: object): Promise<T> {
        return this.axiosRequest<T>(path, 'GET', {
            params: params,
            ...this.newHeaders('application/json'),

        })
    }

    public post<T>(path: string, data?: object): Promise<T> {
        return this.axiosRequest<T>(path, 'POST', {
            data: data,
            ...this.newHeaders('application/json'),

        })
    }

    public postFormData<T>(path: string, data: FormData): Promise<T> {
        return this.axiosInstance.post(this.url(path), data, {
                ...this.newHeaders('multipart/form-data'),
            }
        ).then((response: AxiosResponse<T>) => response.data as T)
    }

    private axiosRequest<T>(
        path: string,
        method: 'POST' | 'GET' | 'PUT' | 'DELETE',
        config?: AxiosRequestConfig
    ): Promise<T> {
        return this.axiosInstance.request<T>({
            ...(config ? config : {}),
            method: method,
            url: this.apiVersion + path,
            baseURL: this.domainName,
        }).then((response: AxiosResponse<T>) => response.data as T)
    }

    private url(path: string): string {
        return `${this.domainName}/${this.apiVersion}` + path
    }

    private newHeaders(contentType: string, headers?: object): object {
        return {
            headers: {
                'Content-Type': contentType,
                'Authorization': `Bearer ${this.bearerToken}`,
                ...headers,
            },
        }
    }
}

export {Client}