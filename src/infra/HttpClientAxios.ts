import cookies from "js-cookie";
import axios, { AxiosRequestConfig } from "axios";
import { IHttpClient, HttpMethod, IHttpResponse } from "@/services/http";

const NEXT_PUBLIC_COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME;
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const client = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
  timeout: 7200000,
});

client.interceptors.request.use((config) => {
  const token: string | undefined = cookies.get(
    NEXT_PUBLIC_COOKIE_NAME as string
  );

  if (token != null && config.headers)
    config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export class HttpClientAxios implements IHttpClient {
  async request<
    Response,
    Payload = undefined,
    Params = undefined,
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
  }): Promise<IHttpResponse<Response>> {
    const sanitizedParams =
      typeof params === "object"
        ? Object.fromEntries(
            Object.entries(params as Record<string, unknown>).filter(
              ([_, v]) => {
                if (typeof v === "string") return v.length > 0;

                return true;
              }
            )
          )
        : undefined;

    const response = await client.request({
      url,
      method,
      params: sanitizedParams,
      data: payload,
      baseURL,
    });

    return await Promise.resolve({
      statusCode: response.status,
      body: response.data,
    });
  }
}
