interface HostConfigInterface {
    domainName: string
    apiVersion: string
    bearerToken: string
}

interface IHost {
    get<T>(path: string, params?: object): Promise<T>

    post<T>(path: string, data?: object): Promise<T>

    postFormData<T>(path: string, data: FormData): Promise<T>;
}

export type {HostConfigInterface, IHost}