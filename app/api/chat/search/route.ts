import { withAuth } from "@/lib/server/api/middleware";
import { GetChatExportResponseSchema, GetChatsResponseSchema, GetMessagesResponseSchema } from "@/lib/server/api/schema";
import { queries } from "@/lib/server/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    return withAuth(async (userId) => {
        const query = req.nextUrl.searchParams.get("query")
        if (!query) {
            return {
                error: "Query is required",
                status: 400
            }
        }    
        // Optional parameters
        const page = req.nextUrl.searchParams.get("page");
        const limit = req.nextUrl.searchParams.get("limit");
        const fuzzyThreshold = req.nextUrl.searchParams.get("fuzzyThreshold");
    
        const {chats} = await queries.search({
          userId,
          query,
          ...(page && { page: parseInt(page, 10) }),
          ...(limit && { limit: parseInt(limit, 10) }),
          ...(fuzzyThreshold && { fuzzyThreshold: parseFloat(fuzzyThreshold) }),
        });
        console.log(chats)
        const validatedChats = GetChatExportResponseSchema.safeParse(chats);
        if (!validatedChats.success) {
            console.error("[Chats Validation Error]", {
                userId,
                errors: validatedChats.error.toString()
            });
            return {
                error: "Invalid chat data format",
                status: 500
            };
        }

        return {
            data: validatedChats.data,
            status: 200,
        }
    })
}
