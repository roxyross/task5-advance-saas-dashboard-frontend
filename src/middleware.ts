import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define which routes are private and which are public
const privateRoutes = ['/dashboard', '/analytics', '/settings', '/logs'];
const authRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Try to get the token from cookies (assuming your AuthContext/API saves it there)
  // If you only use localStorage, middleware can't access it, but we can check for a 'session' cookie
  const token = request.cookies.get('access_token')?.value;

  // 1. Log request performance (simple example)
  const startTime = Date.now();
  const response = NextResponse.next();
  const duration = Date.now() - startTime;
  response.headers.set('x-proxy-duration', `${duration}ms`);

  // 2. Route Protection
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  if (isPrivateRoute && !token) {
    // Redirect to login if trying to access private route without token
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && token) {
    // Redirect to dashboard if already logged in and trying to access login/register
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/analytics/:path*',
    '/settings/:path*',
    '/logs/:path*',
    '/login',
    '/register',
  ],
};
