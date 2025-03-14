import { GetUserPreferenceResponseSchema, PutUserPreferenceRequestSchema, PutUserPreferenceResponseSchema } from "@/lib/schema";
import { withAuth } from "@/lib/server/api/middleware";
import { queries } from "@/lib/server/db";
import type { NextRequest } from "next/server";

/**
 * GET /api/user/preferences
 * Get user preferences
 */
export async function GET() {
    return withAuth(async (userId) => {
        const preferences = await queries.getUserPreferences({ userId });
        if (!preferences) {
            return { error: "Preferences not found", status: 404 };
        }
        const validatedPreferences = GetUserPreferenceResponseSchema.safeParse(preferences);
        if (!validatedPreferences.success) {
            console.error("[Data Validation Error]", validatedPreferences.error);
            return { error: "Invalid user data format", status: 500 };
        }
        return { data: validatedPreferences.data, status: 200 };
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

        const updatedPreferences = await queries.updateUserPreferences({ userId, defaultModel });
        if (!updatedPreferences) {
            return { error: "Failed to update preferences", status: 500 };
        }

        const validatedPreferences = PutUserPreferenceResponseSchema.safeParse(updatedPreferences);
        if (!validatedPreferences.success) {
            console.error("[Data Validation Error]", validatedPreferences.error);
            return { error: "Invalid user data format", status: 500 };
        }

        return {
            data: validatedPreferences.data,
            status: 200
        };
    });
}
