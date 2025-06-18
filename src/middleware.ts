import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt";
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  // Check if user is authenticated (has valid token)
  const isAuthenticated = !!token;
  
  // Define auth routes (public) and private routes
  const isAuthRoute = ['/login', '/signup', '/forgot-password', '/reset-password'].some(route => 
    request.nextUrl.pathname.startsWith(route)
  );
  
  const isPrivateRoute = ['/dashboard', '/strategic-planning', '/change-password'].some(route => 
    request.nextUrl.pathname.startsWith(route)
  );

  // const isPublicRoute = ['/leadership'].some(route => 
  //   request.nextUrl.pathname.startsWith(route)
  // );

  // If trying to access private route without authentication
  if (isPrivateRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect authenticated users from auth routes and root path to dashboard
  if (isAuthenticated && (isAuthRoute || request.nextUrl.pathname === '/')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets/).*)",
  ],
};
