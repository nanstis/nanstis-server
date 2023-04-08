import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios'
import {Method, MethodValue} from '../Domain/Methods'
import {ConfigModule} from './Config'

module HostModule {

    import config = ConfigModule.config;

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
            return this.axiosInstance.request<T>({
                ...(config ? config : {}),
                method: method,
                url: this.apiVersion + path,
                baseURL: this.domainName,
                headers: {
                    Authorization: `Bearer ${this.bearerToken}`,
                    'Content-Type': 'application/json',
                },
            }).then((response: AxiosResponse<T>) => (response.data as { object: object, data: T }).data)
        }
    }

    class Host extends Client {
        constructor(domainName: string, bearerToken: string, apiVersion: string) {
            super(domainName, bearerToken, apiVersion)
        }

        public get<T>(path: string, params?: object): Promise<T> {
            return this.axiosRequest<T>(path, MethodValue.GET, {
                params: params,
            })
        }

        public post<T>(path: string, data?: object): Promise<T> {
            return this.axiosRequest<T>(path, MethodValue.POST, {
                data: data,
            })
        }
    }

    export const getHost = (name: string) => {
        switch (name) {
            case 'gpt':
                return new Host(
                    config.OPENAI_DOMAIN_NAME,
                    config.OPENAI_BEARER_TOKEN,
                    config.OPENAI_API_VERSION
                )
            case 'assembly':
                return new Host(
                    config.ASSEMBLY_DOMAIN_NAME,
                    config.ASSEMBLY_BEARER_TOKEN,
                    config.ASSEMBLY_API_VERSION
                )
        }
    }
}

export {HostModule}
