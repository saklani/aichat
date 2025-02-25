import { getSessionCookie } from "better-auth";
import { type NextRequest, NextResponse } from "next/server";

 
export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);
 
    if (!sessionCookie && (request.nextUrl.pathname.startsWith("/chat")
        || request.nextUrl.pathname.startsWith("/settings"))
    ) {
        return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
    }

    if (sessionCookie && (request.nextUrl.pathname.startsWith("/login")
        || request.nextUrl.pathname.startsWith("/register"))
    ) {
        return NextResponse.redirect(new URL("/", request.nextUrl.origin));
    }

    return NextResponse.next();
}
 

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}