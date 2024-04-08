import { AxiosError } from "axios";
import { left, right, TEither } from "@/core/Either";
import { CriticalError, TApplicationError } from "@/core/Errors";
import { CookieServiceJSCookie } from "@/infra/CookieServiceJSCookie";
import { HttpMethod, HttpStatusCode, IHttpClient } from "@/services";
import {
  generateHttpErrorResponse,
  HttpResponseError,
  IApiResponse,
} from "./modules";
import { IAuthenticationRepository } from "@/domain/repositories/IAuthenticationRepository";

interface ISignInUsecaseParams {
  publicKey: string;
}

export class AuthenticationRepository implements IAuthenticationRepository {
  cookieService = new CookieServiceJSCookie();

  constructor(private readonly client: IHttpClient) { }

  signIn({
    publicKey,
  }: ISignInUsecaseParams): boolean {
    try {
      const currentDate = new Date();
      currentDate.setDate(new Date().getDate() + 1)

      this.cookieService.setCookie(
        process.env.NEXT_PUBLIC_COOKIE_NAME as string,
        publicKey,
        {
          expires: currentDate,
        }
      );

      return true
    } catch (error) {
      return false
    }
  }

  async signOut(): Promise<TEither<TApplicationError, void>> {
    try {
      this.cookieService.removeCookie(
        process.env.NEXT_PUBLIC_COOKIE_NAME as string
      );
      return right(undefined);
    } catch (error) {
      return left(generateHttpErrorResponse(error));
    }
  }
}
