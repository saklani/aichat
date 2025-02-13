import { signOut } from "@/auth";
import { withAuth } from "@/lib/server/api/middleware";
import { GetUserResponseSchema } from "@/lib/server/api/schema";
import { queries } from "@/lib/server/db";

/**
 * GET /api/user
 * Retrieves the current user's profile
 */
export async function GET() {
    return withAuth(async (userId) => {
        const user = await queries.getUser({ id: userId });

        if (!user) {
            return {
                error: "User not found",
                status: 404
            };
        }

        // Validate user data against schema
        const validatedUser = GetUserResponseSchema.safeParse(user);
        if (!validatedUser.success) {
            console.error("[Data Validation Error]", validatedUser.error);
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
    await signOut()
    return withAuth(async (userId) => {
        await queries.deleteUser({ id: userId });
  
        return {
            data: { success: true },
            status: 200
        };
    });
}
