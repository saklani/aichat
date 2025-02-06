import * as auth from "@/lib/server/auth"
import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const sessionToken = await auth.getSession()
    switch (request.nextUrl.pathname) {
        case "/login":
        case "/register":
            {
                if (sessionToken) {
                    const { session } = await auth.validateSessionToken(sessionToken.value)
                    if (session) {
                        auth.setSessionTokenCookie(sessionToken.value, session.expiresAt)
                        return NextResponse.redirect(new URL('/', request.url))
                    } else {
                        auth.deleteSessionTokenCookie()
                    }
                }
                return NextResponse.next();
            }
        case "/": {
            if (!sessionToken) {
                return NextResponse.redirect(new URL("/login", request.nextUrl))
            } else {
                return NextResponse.redirect(new URL("/chat", request.nextUrl))
            }
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
