import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "./presentation/lib/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("%22selectedWallet%22%3B")?.value;
  const verifyToken = token && (await verifyAuth(token).catch((err) => { }));
  // if (req.nextUrl.pathname.startsWith("/") && req.nextUrl.pathname.endsWith("/") && !verifyToken) {
  //   return;
  // }

  // if (req.nextUrl.pathname.startsWith("/") && req.nextUrl.pathname.endsWith("/") && verifyToken && token) {
  //   return NextResponse.redirect(new URL("/start", req.url));
  // }

  // if (req.nextUrl.pathname.startsWith("/start") && !verifyToken && !token) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }
}

export const config = { 
  matcher: ["/", "/start/:path*"],
};
