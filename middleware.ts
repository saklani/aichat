import { auth } from "@/auth"
import { NextRequest, NextResponse } from "next/server"


function handleRedirection(req: NextRequest,
    redirectTo: string,
    condition: boolean) {
    if (condition) {
        return NextResponse.redirect(new URL(redirectTo, req.nextUrl.origin));
    }
    return NextResponse.next()
}

export default auth((req) => {
    if (req.nextUrl.pathname.startsWith("/chat")
        || req.nextUrl.pathname.startsWith("/settings")
    ) {
        return handleRedirection(req, "/login", !req.auth);
    }
    if (req.nextUrl.pathname.startsWith("/login")
        || req.nextUrl.pathname.startsWith("/register")
    ) {
        return handleRedirection(req, "/chat", !!req.auth);
    }
    return NextResponse.next()
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}