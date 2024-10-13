import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    
    // Define authentication paths
    const authPaths = ["/login", "/signup", "/verify-mail"];
    
    // Define protected paths
    const protectedPaths = [
      "/my-profile",
      "/create-blog",
      "/blog",
      "/update"
    ];
  
    const isAuthPath = authPaths.some(authPath => path === authPath);
    const isProtectedPath = protectedPaths.some(protectedPath => path.startsWith(protectedPath));
  
    const token = request.cookies.get("token")?.value || "";
  
    // Redirect logged-in users away from auth pages
    if (isAuthPath && token) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  
    // Redirect non-logged-in users to login for protected paths
    if (isProtectedPath && !token) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  
    // Allow all other requests to proceed
    return NextResponse.next();
  }
  
  export const config = {
    matcher: [
      "/login",
      "/signup",
      "/verify-mail",
      "/my-profile",
      "/create-blog",
      "/blog/:path*",
      "/update/:path*",
      "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
  };