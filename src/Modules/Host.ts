import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { ConfigModule } from "./Config";

module HostModule {
  import config = ConfigModule.config;
  import logger = ConfigModule.logger;

  enum MethodValue {
    GET = "GET",
    POST = "POST",
  }

  export interface HostInterface {
    get<T>(path: string, config?: AxiosRequestConfig): Promise<T>;

    post<T>(path: string, config?: AxiosRequestConfig): Promise<T>;
  }

  export type Method = keyof typeof MethodValue;

  abstract class Client {
    protected readonly domainName: string;
    protected readonly apiVersion: string;
    protected readonly bearerToken: string;
    protected axiosInstance: AxiosInstance;

    protected constructor(
      domainName: string,
      bearerToken: string,
      apiVersion: string
    ) {
      this.domainName = domainName;
      this.apiVersion = apiVersion;
      this.bearerToken = bearerToken;
      this.axiosInstance = axios.create();
    }

    protected axiosRequest<T>(
      method: Method,
      path: string,
      config?: AxiosRequestConfig
    ): Promise<T> {
      return this.axiosInstance.request({
        ...(config ? config : {}),
        method: method,
        url: this.apiVersion + path,
        baseURL: this.domainName,
        headers: {
          Authorization: `Bearer ${this.bearerToken}`,
          "Content-Type": "application/json",
        },
      });
    }
  }

  class Host extends Client implements HostInterface {
    constructor(domainName: string, bearerToken: string, apiVersion: string) {
      super(domainName, bearerToken, apiVersion);
    }

    public get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
      return this.axiosRequest<T>(MethodValue.GET, path, config);
    }

    public post<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
      return this.axiosRequest<T>(MethodValue.POST, path, config);
    }
  }

  export const GPT: HostInterface = new Host(
    config.get("OPENAI_DOMAIN_NAME"),
    config.get("OPENAI_API_KEY"),
    config.get("OPENAI_API_VERSION")
  );

  logger.info(GPT);
}

export { HostModule };
