import { NextResponse } from "next/server";

export const BAD_REQUEST = (error: Record<string, any>) => NextResponse.json({ ...error }, { status: 400 })
export const NOT_FOUND = NextResponse.json({ message: 'Not Found' }, { status: 404 })
export const CONFLICT = NextResponse.json({ message: 'Conflict' }, { status: 409 })
export const UNAUTHORIZED = NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
export const INTERNAL_SERVER_ERROR = NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })