import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAuthPath = path === "/login" || path === "/signup";

  const token = request.cookies.get("token")?.value || "";

  if (token && isAuthPath) {
    return NextResponse.redirect(new URL("/code", request.nextUrl));
  }
  if (!token && path == "/code") {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  return;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/code", "/login", "/signup"],
};
