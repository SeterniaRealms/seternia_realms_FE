import { HttpMethod } from "./HttpMethod";
import { IHttpResponse } from "./IHttpResponse";

export interface IHttpClient {
  request: <
    Response,
    Payload = undefined,
    Params = object | undefined,
    Headers = object
  >({
    url,
    method,
    params,
    payload,
    baseURL,
    headers,
  }: {
    url: string;
    method: HttpMethod;
    params?: Params;
    payload?: Payload;
    baseURL?: string;
    headers?: Headers;
  }) => Promise<IHttpResponse<Response>>;
}
