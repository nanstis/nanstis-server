import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'
import {MethodValue} from '../Domain/Enums/MethodValue'
import {HostConfigInterface, IHost} from '../Domain/Interfaces/HostInterface'

module HostModule {

    abstract class Client {
        protected readonly domainName: string
        protected readonly apiVersion: string
        protected readonly bearerToken: string
        protected axiosInstance: AxiosInstance

        protected constructor(
            domainName: string,
            bearerToken: string,
            apiVersion: string
        ) {
            this.domainName = domainName
            this.apiVersion = apiVersion
            this.bearerToken = bearerToken
            this.axiosInstance = axios.create()
        }

        protected axiosRequest<T>(
            path: string,
            method: MethodValue,
            config?: AxiosRequestConfig
        ): Promise<T> {
            return this.axiosInstance.request<T>({
                ...(config ? config : {}),
                method: method,
                url: this.apiVersion + path,
                baseURL: this.domainName,
            }).then((response: AxiosResponse<T>) => response.data as T)
        }

        protected url(path: string): string {
            return `${this.domainName}/${this.apiVersion}` + path
        }

        protected newHeaders(contentType: string, headers?: object): object {
            return {
                headers: {
                    Authorization: `Bearer ${this.bearerToken}`,
                    'Content-Type': contentType,
                    ...headers,
                },
            }
        }
    }

    class Host extends Client implements IHost {
        constructor(domainName: string, bearerToken: string, apiVersion: string) {
            super(domainName, bearerToken, apiVersion)
        }

        public get<T>(path: string, params?: object): Promise<T> {
            return this.axiosRequest<T>(path, MethodValue.GET, {
                params: params,
                ...this.newHeaders('application/json'),
            })
        }

        public post<T>(path: string, data?: object): Promise<T> {
            return this.axiosRequest<T>(path, MethodValue.POST, {
                data: data,
                ...this.newHeaders('application/json'),
            })
        }

        public postFormData<T>(path: string, data: FormData): Promise<T> {
            return this.axiosInstance.post(this.url(path), data, {
                ...this.newHeaders('multipart/form-data'),
            }).then((response: AxiosResponse<T>) => response.data as T)
        }


    }

    export const newHost = (config: HostConfigInterface): Host => {
        return new Host(
            config.domainName,
            config.bearerToken,
            config.apiVersion
        )
    }
}

export {HostModule}
