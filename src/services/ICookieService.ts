export interface ICookieService {
  setCookie: (
    name: string,
    value: string | object,
    options?: Cookies.CookieAttributes | undefined
  ) => string | undefined;

  getCookieByName: (name: string) => string | object | undefined;

  removeCookie: (
    name: string,
    options?: Cookies.CookieAttributes | undefined
  ) => void;
}
