import { z } from "zod";
import { MessageSchema, ObjectSchema, PlanSchema, UserPreferenceSchema, UserSchema, ChatSchema } from "../schema";
import type { SuccessResponse } from "../server/api/types";

export type User = z.infer<typeof UserSchema>
export type GetUserResponse = SuccessResponse<User>

export type UserPreferences = z.infer<typeof UserPreferenceSchema>
export type GetUserPreferencesResponse = SuccessResponse<UserPreferences>

export type Plan = z.infer<typeof PlanSchema>
export type GetPlanResponse = SuccessResponse<Plan>


export type Message = z.infer<typeof MessageSchema>
export type GetMessageResponse = SuccessResponse<Message>
export type GetMessagesResponse = SuccessResponse<Message[]>

export type Object = z.infer<typeof ObjectSchema>
export type GetObjectResponse = SuccessResponse<Object>
export type GetObjectsResponse = SuccessResponse<Object[]>

export type Chat = z.infer<typeof ChatSchema>
export type GetChatResponse = SuccessResponse<Chat>
export type GetChatsResponse = SuccessResponse<Chat[]>
