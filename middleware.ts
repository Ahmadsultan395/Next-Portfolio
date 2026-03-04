// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ✅ Runs once when server starts
console.log("Middleware loaded and running");

// Main middleware function
export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || null; // get cookie
  const { pathname } = req.nextUrl;

  console.log("Middleware log → Token:", token, "| Path:", pathname);

  // 1️⃣ If user is logged in and tries to access /auth/* → redirect to /dashboard
  if (token && pathname.startsWith("/auth")) {
    console.log("Redirecting logged-in user from /auth to /dashboard");
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 2️⃣ If user is not logged in and tries to access /dashboard/* → redirect to /auth/login
  if (!token && pathname.startsWith("/dashboard")) {
    console.log("Redirecting non-logged-in user to /auth/login");
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // 3️⃣ All other pages are allowed
  return NextResponse.next();
}

// 4️⃣ Apply middleware only on these routes
export const config = {
  matcher: [
    "/auth/:path*", // all /auth routes
    "/dashboard/:path*", // dashboard and nested routes
  ],
};
