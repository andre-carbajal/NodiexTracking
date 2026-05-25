import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const tokenCookie = request.cookies.get("nodiex-auth")?.value;
    const authHeader = request.headers.get("authorization") || "";
    const token = tokenCookie || (authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "");

    if (!token) {
      const loginUrl = new URL("/admin", request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const user = verifyToken(request);
      if (!user) throw new Error("Token invalido");
      return NextResponse.next();
    } catch {
      const response = NextResponse.redirect(new URL("/admin", request.url));
      response.cookies.delete("nodiex-auth");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
