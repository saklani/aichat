import { z } from "zod";
import { UserSchema, UserPreferenceSchema, PlanSchema, MessageSchema, ChatSchema, ObjectSchema, ChatExportSchema } from "@/lib/schema";



export const GetUserResponseSchema = UserSchema.pick({ id: true, email: true })

export const GetUserPreferenceResponseSchema = UserPreferenceSchema
export const PutUserPreferenceRequestSchema = UserPreferenceSchema

export const GetPlanResponseSchema = PlanSchema.pick({ id: true, userId: true, type: true, messageUsage: true, messageLimit: true, storageUsage: true, storageLimit: true, startDate: true, endDate: true, isActive: true, createdAt: true, updatedAt: true })
export const PutPlanResponseSchema = PlanSchema.pick({ type: true, messageLimit: true, storageLimit: true })

export const GetMessageResponseSchema = MessageSchema
export const GetMessagesResponseSchema = z.array(MessageSchema)
export const PostMessageRequestSchema = MessageSchema.pick({ content: true, role: true, chatId: true, parentId: true })

export const PostChatRequestSchema = ChatSchema.pick({ id: true }).extend({
    messages: z.array(MessageSchema.pick({ content: true, role: true })),
    model: z.string(),
    currentParentId: z.string().uuid().nullish()
})
export const GetChatResponseSchema = ChatSchema
export const GetChatsRequestSchema = z.object({
    cursor: z.string().uuid().optional(),
});
export const GetChatsResponseSchema = z.array(GetChatResponseSchema)
export const GetChatExportResponseSchema = z.array(ChatExportSchema)

// Schema for file upload response
export const FileUploadResponseSchema = z.object({
    url: z.string().url(),
    fileId: z.string(),
});


export const GetObjectResponseSchema = ObjectSchema
export const GetObjectsResponseSchema = z.array(ObjectSchema)
export const CreateCollectionRequestSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    fileIds: z.array(z.string()),
    userId: z.string(),
})

export const GetCollectionResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    fileIds: z.array(z.string()),
    userId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export const UpdateCollectionRequestSchema = z.object({
    name: z.string().optional(),
    fileIds: z.array(z.string()).optional(),
})

export const GetCollectionsResponseSchema = z.array(GetCollectionResponseSchema)