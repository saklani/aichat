import { createResponse, HTTP_401 } from '@/lib/server/api/response';
import { queries } from '@/lib/server/db';
import type { NextRequest } from 'next/server';

export function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return HTTP_401;
    }
    queries.resetPlan()
    return createResponse({ data: { success: true }, status: 200 })
}