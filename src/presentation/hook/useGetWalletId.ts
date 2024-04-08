import { CookieServiceJSCookie } from "@/infra/CookieServiceJSCookie";

export function useGetWalletId(): string {
  const cookieService = new CookieServiceJSCookie();
  const walletId = cookieService.getCookieByName(process.env.NEXT_PUBLIC_COOKIE_NAME ?? "%22selectedWallet%22%3B")?.toString();
  return walletId ?? ""
}