import { z } from "zod";
import { GetChatResponseSchema, GetChatsResponseSchema, GetMessagesResponseSchema, GetPlanResponseSchema, GetUserPreferenceResponseSchema, GetUserResponseSchema } from "../server/api/schema";
import { SuccessResponse } from "../server/api/types";

export type GetUser = SuccessResponse<z.infer<typeof GetUserResponseSchema>>
export type GetUserPreferences = SuccessResponse<z.infer<typeof GetUserPreferenceResponseSchema>>
export type GetPlan = SuccessResponse<z.infer<typeof GetPlanResponseSchema>>
export type GetChat = SuccessResponse<z.infer<typeof GetChatResponseSchema>>
export type GetChats = SuccessResponse<z.infer<typeof GetChatsResponseSchema>>

export type GetMessages = z.infer<typeof GetMessagesResponseSchema>
export type GetMessagesResponse = SuccessResponse<z.infer<typeof GetMessagesResponseSchema>>