import { CookieServiceJSCookie } from "@/infra/CookieServiceJSCookie";
import axios, { AxiosInstance } from "axios";

export class AuthService {
  cookieService = new CookieServiceJSCookie();
  protected readonly instance: AxiosInstance;

  public constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      timeout: 3000,
      timeoutErrorMessage: "Time out!",
    });
  }

  loginWallet = (publicKey: string) => {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getDay() + 1);
    this.cookieService.setCookie(
      process.env.NEXT_PUBLIC_COOKIE_NAME as string,
      publicKey,
      {
        expires: currentDate,
      }
    );
  };
}
