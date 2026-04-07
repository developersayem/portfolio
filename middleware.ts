import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PROTECTED_PREFIX = "/admin";
const LOGIN_PATH = "/admin/login";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only handle /admin routes
  if (!pathname.startsWith(PROTECTED_PREFIX)) {
    return NextResponse.next();
  }

  const token = req.cookies.get("admin-token")?.value;
  const secret = new TextEncoder().encode(
    process.env.ADMIN_JWT_SECRET || "fallback-secret",
  );

  let isAuthenticated = false;
  if (token) {
    try {
      await jwtVerify(token, secret);
      isAuthenticated = true;
    } catch {
      isAuthenticated = false;
    }
  }

  // Already authenticated → redirect away from login
  if (isAuthenticated && pathname === LOGIN_PATH) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // Not authenticated and not on login page → redirect to login
  if (!isAuthenticated && pathname !== LOGIN_PATH) {
    const loginUrl = new URL(LOGIN_PATH, req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
