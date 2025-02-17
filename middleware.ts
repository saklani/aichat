import { getSessionCookie } from "better-auth";
import { NextRequest, NextResponse } from "next/server";


function handleRedirection(req: NextRequest,
    redirectTo: string,
    condition: boolean) {
    if (condition) {
        return NextResponse.redirect(new URL(redirectTo, req.nextUrl.origin));
    }
    return NextResponse.next()
}

 
export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);
    const loggedIn = !!sessionCookie

    if (request.nextUrl.pathname.startsWith("/chat")
        || request.nextUrl.pathname.startsWith("/settings")
    ) {
        return handleRedirection(request, "/login", !loggedIn);
    }
    if (request.nextUrl.pathname.startsWith("/login")
        || request.nextUrl.pathname.startsWith("/register")
    ) {
        return handleRedirection(request, "/chat", loggedIn);
    }
    return NextResponse.next();
}
 

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}