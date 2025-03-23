import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/" || path.startsWith("/_next") || path.startsWith("/api/auth")

  // Get the authentication token from cookies
  const isAuthenticated = request.cookies.get("auth")?.value

  // Redirect logic
  if (!isAuthenticated && !isPublicPath) {
    // Redirect to login if trying to access protected route without auth
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isAuthenticated && (path === "/login" || path === "/signup")) {
    // Redirect to dashboard if already authenticated and trying to access login/signup
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

// Configure which paths the middleware runs on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

