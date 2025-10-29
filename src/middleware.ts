import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/checkout")) {
    const token = request.cookies.get("bigburger_auth_token");

    if (!token) {
      const homeUrl = new URL("/", request.url);
      homeUrl.searchParams.set("login", "true");
      return NextResponse.redirect(homeUrl);
    }

    try {
      const payload = JSON.parse(atob(token.value));
      if (payload.exp < Date.now()) {
        const homeUrl = new URL("/", request.url);
        homeUrl.searchParams.set("login", "true");
        return NextResponse.redirect(homeUrl);
      }
    } catch {
      const homeUrl = new URL("/", request.url);
      homeUrl.searchParams.set("login", "true");
      return NextResponse.redirect(homeUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/checkout/:path*",
};
