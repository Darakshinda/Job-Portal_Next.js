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
  "/reset-password/:path*",
  "/seeker-dashboard",
  "/seeker-dashboard/:jobId/path*",
];

const hirerRoutes = [
  "/dashboard",
  "/post",
  "/postedJobs",
  "/postedJobs/:jobId/path*",
  "/postedJobs/:jobId/edit/:path*",
  "/payment",
  "/razorpay",
];

const seekerRoutes = ["/appliedJobs"];

export function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const token = request.cookies.get("token")?.value;
  const accountType = request.cookies.get("account_type")?.value;

  // Check if the pathname is in the list of public routes
  if (
    publicRoutes.includes(pathname) ||
    pathname.startsWith("/reset-password/")
  ) {
    return NextResponse.next();
  }

  // Check if the token is present
  if (!token) {
    console.log("Auth required, Redirecting to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check access for hirer routes
  if (hirerRoutes.includes(pathname) && accountType === "job_hirer") {
    return NextResponse.next();
  }

  // Check access for seeker routes
  if (seekerRoutes.includes(pathname) && accountType === "job_seeker") {
    return NextResponse.next();
  }

  if (hirerRoutes.includes(pathname) && accountType === "job_seeker") {
    return NextResponse.redirect(new URL("/seeker-dashboard", request.url));
  }

  if (seekerRoutes.includes(pathname) && accountType === "job_hirer") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If no conditions match, redirect to login
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets|images).*)"],
};
