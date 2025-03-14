import { z } from "zod";

const ModelNameEnum = z.enum(["gpt-4o-mini", "gpt-4o", "gpt-o1-mini"])

const UserSchema = z.object({ id: z.string(), email: z.string() });
export const GetUserResponseSchema = UserSchema
export type GetUserResponse = z.infer<typeof GetUserResponseSchema>

const UserPreferenceSchema = z.object({ defaultModel: ModelNameEnum });
export const GetUserPreferenceResponseSchema = UserPreferenceSchema.pick({ defaultModel: true })
export type GetUserPreferenceResponse = z.infer<typeof GetUserPreferenceResponseSchema>
export const PutUserPreferenceRequestSchema = UserPreferenceSchema.pick({ defaultModel: true })
export type PutUserPreferenceRequest = z.infer<typeof PutUserPreferenceRequestSchema>
export const PutUserPreferenceResponseSchema = UserPreferenceSchema.pick({ defaultModel: true })
export type PutUserPreferenceResponse = z.infer<typeof PutUserPreferenceResponseSchema>


export const PlanSchema = z.object({
    id: z.string(),
    userId: z.string(),
    type: z.enum(["free", "pro", "enterprise"]),
    messageUsage: z.number().int().min(0),
    messageLimit: z.number().int().min(0),
    storageUsage: z.number().int().min(0),
    storageLimit: z.number().int().min(0),
    startDate: z.date(),
    endDate: z.date(),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date()
});

export const BaseMessageSchema = z.object({
    id: z.string().uuid(),
    content: z.string(),
    role: z.enum(["user", "assistant", "system", "data"]),
    chatId: z.string().optional(),
});

export const MessageSchema = BaseMessageSchema.extend({
    parentId: z.string().uuid().nullish(),
    parent: BaseMessageSchema.nullish(),
});

export const ChatSchema = z.object({
    id: z.string().uuid(),
    title: z.string(),
    userId: z.string(),
    createdAt: z.date(),
    collectionId: z.string().uuid().nullish(),
});

export const ChatExportSchema = ChatSchema.extend({
    messages: z.array(MessageSchema)
});

const ObjectStatusEnum = z.enum([
    'created',
    'processing',
    'ready',
    'failed'
]);

export const ObjectSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: z.string().nullish(),
    size: z.number().nullish(),
    url: z.string().url().nullish(),
    metadata: z.string().nullish(),
    status: ObjectStatusEnum,
    createdAt: z.date(),
    updatedAt: z.date(),
});
