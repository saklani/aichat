import { queries } from "@/lib/server/db";
import { UserSchema } from "./validation";

export type GetUserInput = { userId: string };

export async function get({ userId }: GetUserInput) {
    const user = await queries.getUser({ id: userId });
    if (!user) {
        return {
            error: "User not found",
            status: 404
        };
    }

    const validatedUser = UserSchema.safeParse(user);
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
}

export type RemoveUserInput = { userId: string };   

export async function remove({ userId }: RemoveUserInput) {
    await queries.deleteUser({ id: userId });
    return {
        data: { success: true },
        status: 200
    };
}