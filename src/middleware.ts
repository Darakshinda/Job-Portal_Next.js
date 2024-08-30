import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define route groups
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
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const account_type = request.cookies.get("account_type")?.value;

  // Check for login routes first
  if (loginRoutes.some((route) => pathname.startsWith(route))) {
    console.log("Login route");
    // Redirect authenticated users away from login routes
    if (token) {
      if (account_type === "job_seeker") {
        return NextResponse.redirect(new URL("/seeker-dashboard", request.url));
      } else {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
    return NextResponse.next(); // Allow access to login routes for unauthenticated users
  }

  // Allow public routes for everyone
  if (publicRoutes.includes(pathname)) {
    console.log("Public route");
    return NextResponse.next();
  }

  // From this point on, we'll handle authenticated routes

  // Allow seeker dashboard routes for everyone except job_hirer
  if (seekerDashboardRoutes.some((route) => pathname.startsWith(route))) {
    console.log("Seeker dashboard route");
    if (token) {
      if (account_type !== "job_seeker") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } else {
        return NextResponse.next();
      }
    } else {
      return NextResponse.next();
    }
  }
  // Redirect unauthenticated users to login
  if (!token) {
    console.log("No token found");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Protect hirer routes
  if (hirerRoutes.some((route) => pathname.startsWith(route))) {
    console.log("Hirer route");
    if (account_type !== "job_hirer") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Protect seeker routes
  if (seekerRoutes.some((route) => pathname.startsWith(route))) {
    console.log("Seeker route");
    if (account_type !== "job_seeker") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  console.log("No route matched");

  // For any other routes, do not allow access
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets|images).*)"],
};
