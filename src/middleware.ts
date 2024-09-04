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
  "/profile",
  "/profile/edit",
];
const seekerRoutes = [
  "/appliedJobs",
  "/appliedJobs/:jobId/path*",
  "/profile",
  "/profile/edit",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;
  const account_type = request.cookies.get("account_type")?.value;

  // Allow public routes for everyone
  if (publicRoutes.includes(pathname)) {
    console.log("Public route");
    return NextResponse.next();
  }

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

  // From this point on, we'll handle authenticated routes
  // Redirect unauthenticated users to login
  if (!token) {
    console.log("No token found");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/profile" || pathname === "/profile/edit") {
    if (token) {
      if (account_type === "job_seeker") {
        return NextResponse.next(); // Allow access to seekers
      } else if (account_type === "job_hirer") {
        // console.log("Hirer profile route");
        return NextResponse.next(); // Allow access to hirers
      } else {
        return NextResponse.redirect(new URL("/", request.url)); // Redirect other roles or unauthenticated users
      }
    } else {
      return NextResponse.redirect(new URL("/login", request.url)); // Redirect unauthenticated users to login
    }
  }

  // Handle seeker routes first
  if (seekerRoutes.some((route) => pathname.startsWith(route))) {
    console.log("Seeker route");
    if (token) {
      if (account_type === "job_seeker") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Handle seeker dashboard routes
  if (seekerDashboardRoutes.some((route) => pathname.startsWith(route))) {
    console.log("Seeker dashboard route");
    if (token) {
      if (account_type !== "job_seeker") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } else {
        return NextResponse.next();
      }
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Handle hirer routes
  if (hirerRoutes.some((route) => pathname.startsWith(route))) {
    console.log("Hirer route");
    if (token) {
      if (account_type === "job_hirer") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/seeker-dashboard", request.url));
      }
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  console.log("No route matched");

  // For any other routes, do not allow access
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets|images).*)"],
};
