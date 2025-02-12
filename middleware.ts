import * as auth from "@/lib/server/auth"
import { NextRequest, NextResponse } from 'next/server'


export async function middleware(request: NextRequest) {
    const sessionToken = await auth.getSession()
    switch (request.nextUrl.pathname) {
        case "/login":
        case "/register":
        case "/forgot-password":
            {
                if (sessionToken) {
                    const { session } = await auth.validateSessionToken(sessionToken.value)
                    if (session) {
                        return NextResponse.redirect(new URL('/chat', request.nextUrl))
                    }
                }
                return NextResponse.next();
            }
        case "/chat":
        case "/settings":
            {
                if (!sessionToken) {
                    return NextResponse.redirect(new URL("/login", request.nextUrl))
                }
                return NextResponse.next();
            }
        default:
            return NextResponse.next();
    }
}


export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
