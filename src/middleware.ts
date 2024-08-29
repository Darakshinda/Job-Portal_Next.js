import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of public routes
const publicRoutes = ["/"];

const seekerDashboardRoutes = [
  "/seeker-dashboard",
  "/seeker-dashboard/:jobId/path*",
];

const loginRoutes = [
  "/login",
  "/signup",
  "/signup-recruiter",
  "/signup-seeker",
  "/reset-password",
  "/reset-password/:path*",
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

  const seekerDashboardRegex = /^\/seeker-dashboard\/[^\/]+(\/.*)?$/;
  const hirerPostedJobsRegex = /^\/postedJobs\/[^\/]+(\/.*)?$/;
  const hirerEditJobRegex = /^\/postedJobs\/[^\/]+\/edit(\/.*)?$/;
  const resetPasswordRegex = /^\/reset-password\/(.*)?$/;

  // Check if the pathname is in the list of public routes
  if (
    publicRoutes.includes(pathname) ||
    pathname.startsWith("/reset-password/")
  ) {
    return NextResponse.next();
  }

  if (loginRoutes.includes(pathname) && !token) {
    return NextResponse.next();
  }

  if (loginRoutes.includes(pathname) && token) {
    console.log("Already logged in, Redirecting to /dashboard");
    if (accountType === "job_hirer") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/seeker-dashboard", request.url));
  }

  //Allow seeker dashboard public

  if (seekerDashboardRegex.test(pathname) && accountType !== "job_hirer") {
    return NextResponse.next();
  }

  // Check if the token is present
  if (!token) {
    console.log("Auth required, Redirecting to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check access for hirer routes
  if (hirerEditJobRegex.test(pathname) && accountType === "job_hirer") {
    return NextResponse.next();
  }

  // Check access for seeker routes
  if (
    (seekerRoutes.includes(pathname) || seekerDashboardRegex.test(pathname)) &&
    accountType === "job_seeker"
  ) {
    return NextResponse.next();
  }

  if (hirerRoutes.includes(pathname) && accountType === "job_seeker") {
    return NextResponse.redirect(new URL("/seeker-dashboard", request.url));
  }

  if (
    (seekerRoutes.includes(pathname) ||
      seekerDashboardRoutes.includes(pathname)) &&
    accountType === "job_hirer"
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If no conditions match, redirect to login
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets|images).*)"],
};
