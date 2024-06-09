import { ICookieService } from "@/services/ICookieService";
import Cookies from "js-cookie";

export class CookieServiceJSCookie implements ICookieService {
  setCookie(
    name: string,
    value: string | object,
    options?: Cookies.CookieAttributes | undefined
  ): string | undefined {
    if (typeof value === "object") {
      value = JSON.stringify(value);
    }

    return Cookies.set(name, value, options);
  }

  getCookieByName(name: string): string | object | undefined {
    const value = Cookies.get(name);

    if (value) {
      try {
        return JSON.parse(value);
      } catch (error) {
        if (error instanceof SyntaxError) {
          return value;
        }
      }
    }

    return undefined;
  }

  removeCookie(
    name: string,
    options?: Cookies.CookieAttributes | undefined
  ): void {
    Cookies.remove(name, options);
  }
}
