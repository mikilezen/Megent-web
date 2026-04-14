import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "megent_visit";
const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  if (!request.cookies.has(COOKIE_NAME)) {
    response.cookies.set({
      name: COOKIE_NAME,
      value: "1",
      path: "/",
      maxAge: ONE_YEAR_IN_SECONDS,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
