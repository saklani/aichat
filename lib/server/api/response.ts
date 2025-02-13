import { NextResponse } from "next/server";

export function createResponse({
  data,
  error,
  status
}: {
  data?: unknown;
  error?: string;
  status: number;
}): NextResponse {
  if (error) {
    return NextResponse.json({ error }, { status });
  }
  return NextResponse.json({ data, error }, { status });
}

export const ZOD_BAD_REQUEST = (error: Record<string, any>) => createResponse({ error: JSON.stringify(error), status: 400 });
export const HTTP_400 = createResponse({ error: 'Bad Request', status: 400 });
export const HTTP_404 = createResponse({ error: 'Not Found', status: 404 });
export const HTTP_409 = createResponse({ error: 'Conflict', status: 409 });
export const HTTP_401 = createResponse({ error: 'Unauthorized', status: 401 });
export const HTTP_429 = createResponse({ error: 'Too many requests', status: 429 });
export const HTTP_500 = createResponse({ error: "Internal server error", status: 500 });
