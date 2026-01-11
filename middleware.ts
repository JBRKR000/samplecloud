import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/collection", "/allSamples", "/profile", "/settings", "/cloud", "/favorites", "/recent", "/tags"];

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    
    const isProtected = protectedRoutes.some(route => pathname.startsWith(route));
    
    if (isProtected) {
        const token = request.cookies.get("better-auth.session_token")?.value;
        if (!token) {
            return NextResponse.redirect(new URL("/auth", request.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/collection/:path*", "/allSamples/:path*", "/profile/:path*", "/settings/:path*", "/recent/:path*", "/favorites/:path*", "/cloud/:path*", "/tags/:path*"]
};
