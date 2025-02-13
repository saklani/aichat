import { z } from "zod";

export const GetUserResponseSchema = z.object({
    id: z.string(),
    email: z.string(),
});


export const GetPlanResponseSchema = z.object({
    id: z.number(),
    userId: z.string(),
    type: z.enum(["free", "pro", "enterprise"]),
    messageUsage: z.number().int().min(0),
    messageLimit: z.number().int().min(0),
    storageUsage: z.number().int().min(0),
    storageLimit: z.number().int().min(0),
    startDate: z.date(),
    endDate: z.date().optional().nullable(),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date()
});

export const PutPlanResponseSchema = z.object({
    type: z.enum(["free", "pro", "enterprise"]),
    messageLimit: z.number().int().min(0),
    storageLimit: z.number().int().min(0)
});

export const GetMessagesResponseSchema = z.array(
    z.object({
        id: z.string().uuid(),
        content: z.string(),
        role: z.enum(["user", "assistant", "system"]),
        chatId: z.string().optional(),
    })
)

export const PostMessageRequestSchema =
    z.object({
        id: z.string().uuid().optional(),
        content: z.string(),
        role: z.enum(["user", "assistant", "system"]),
        chatId: z.string().optional(),
    })


export const PostRequestSchema = z.object({
    id: z.string().uuid(),
    messages: z.array(PostMessageRequestSchema)
});

export const GetChatResponseSchema = z.object({
    id: z.string().uuid(),
    title: z.string(),
    userId: z.string(),
    createdAt: z.date(),
});

export const GetChatsResponseSchema = z.array(GetChatResponseSchema)


