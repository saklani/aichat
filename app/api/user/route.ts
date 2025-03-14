import { withAuth } from "@/lib/server/api/middleware";
import { GetUserResponseSchema } from "@/lib/schema";
import { auth } from "@/lib/server/auth";
import { queries } from "@/lib/server/db";
import { headers } from "next/headers";

/**
 * GET /api/user
 * Retrieves the current user's profile
 */
export async function GET() {
    return withAuth(async (userId) => {
        const user = await queries.getUser({ id: userId });
        if (!user) {
            console.error("[User Not Found]", {
                userId,
            });
            return {
                error: "User not found",
                status: 404
            };
        }
        const validatedUser = GetUserResponseSchema.safeParse(user);
        if (!validatedUser.success) {
            console.error("[User Validation Error]", {
                userId,
                errors: validatedUser.error.toString()
            });
            return {
                error: "Invalid user data format",
                status: 500
            };
        }
        return {
            data: validatedUser.data,
            status: 200
        };
    });
}

/**
 * DELETE /api/user
 * Deletes the current user's account
 */
export async function DELETE() {
    return withAuth(async (userId) => {
        await queries.deleteUser({ id: userId });
        return {
            data: { success: true },
            status: 200
        };
    }).then(async (res) => {
        await auth.api.signOut({ headers: await headers()});
        return res
    });
}
