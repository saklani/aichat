import { withAuth } from "@/lib/server/api/middleware";
import { GetUserPreferenceResponseSchema, GetUserResponseSchema, PutUserPreferenceRequestSchema } from "@/lib/server/api/schema";
import { queries } from "@/lib/server/db";
import { NextRequest } from "next/server";

/**
 * PUT /api/user/preferences
 * Get user preferences
 */
export async function GET() {
    return withAuth(async (userId) => {
        const preferences = await queries.getUserPreferences({ userId });
        if (!preferences) {
            return {
                error: "Preferences not found",
                status: 404
            };
        }

        const validatedUserPreferences = GetUserPreferenceResponseSchema.safeParse(preferences);
        if (!validatedUserPreferences.success) {
            console.error("[Data Validation Error]", validatedUserPreferences.error);
            return {
                error: "Invalid user preferences data format",
                status: 500
            };
        }
        return {
            data: validatedUserPreferences.data,
            status: 200
        };
    });
}
/**
 * PUT /api/user/preferences
 * Update the users preferences
 */
export async function PUT(request: NextRequest) {
    return withAuth(async (userId) => {
        const body = await request.json()
        const validatedInput = PutUserPreferenceRequestSchema.safeParse(body)

        if (!validatedInput.success) {
            console.error("[Data Validation Error]", validatedInput.error);
            return {
                error: "Invalid user data format",
                status: 500
            };
        }

        const { defaultModel } = validatedInput.data


        await queries.updateUserPreferences({ userId, defaultModel });
        return {
            data: { success: true },
            status: 200
        };
    });
}
