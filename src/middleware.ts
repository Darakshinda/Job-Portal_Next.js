import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of public routes
const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/signup-recruiter",
  "/signup-seeker",
  "/reset-password",
  "/reset-password/(.*)",
];

export function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const token = request.cookies.get("token");
  const accountType = request.cookies.get("account_type");

  // Check if the pathname is in the list of public routes
  if (
    token ||
    publicRoutes.includes(pathname) ||
    pathname.startsWith("/reset-password/")
  ) {
    return NextResponse.next();
  }
  // return NextResponse.next();
  // If not, redirect to /
  console.log("Auth required, Redirecting to /login");
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets|images).*)"],
};
