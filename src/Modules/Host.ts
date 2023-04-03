import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'
import {ConfigModule} from './Config'

module HostModule {
    import config = ConfigModule.config;

    export type Method = keyof typeof MethodValue;

    export enum MethodValue {
        GET = 'GET',
        POST = 'POST',
    }


    export interface HostInterface {
        get<T>(_path: string, _config?: AxiosRequestConfig): Promise<T>;

        post<T>(_path: string, _config?: AxiosRequestConfig): Promise<T>;
    }


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
            method: Method,
            config?: AxiosRequestConfig
        ): Promise<T> {
            return this.axiosInstance.request({
                ...(config ? config : {}),
                method: method,
                url: this.apiVersion + path,
                baseURL: this.domainName,
                headers: {
                    Authorization: `Bearer ${this.bearerToken}`,
                    'Content-Type': 'application/json',
                },
            }).then((response: AxiosResponse<T>) => (response.data as { object: string, data: T }).data)
        }

    }

    class Host extends Client implements HostInterface {
        constructor(domainName: string, bearerToken: string, apiVersion: string) {
            super(domainName, bearerToken, apiVersion)
        }

        public get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
            return this.axiosRequest<T>(path, MethodValue.GET, config)
        }

        public post<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
            return this.axiosRequest<T>(path, MethodValue.POST, config)
        }
    }

    export const GPT: HostInterface = new Host(
        config.get().OPENAI_DOMAIN_NAME,
        config.get().OPENAI_BEARER_TOKEN,
        config.get().OPENAI_API_VERSION
    )
}

export {HostModule}
