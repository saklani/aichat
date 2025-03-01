import { eq, and, sql, or } from "drizzle-orm";
import * as schema from "../schema";
import { db } from "../db";
import { execute } from "./utils";


interface SearchParams {
    userId: string;
    query: string;
    page?: number;
    limit?: number;
    fuzzyThreshold?: number;
  }
  
  export interface SearchResult {
    chats: Array<schema.Chat & { messages: schema.Message[] }>;
    total: number;
    page: number;
    limit: number;
  }

export async function search({
    userId,
    query,
    page = 1,
    limit = 10,
    fuzzyThreshold = 0.3,
  }: SearchParams): Promise<SearchResult> {
    try {
      // Input validation already handled in handler, but keeping basic checks
      if (page < 1 || limit < 1) {
        throw new Error("Invalid pagination parameters");
      }
      if (fuzzyThreshold < 0 || fuzzyThreshold > 1) {
        throw new Error("fuzzyThreshold must be between 0 and 1");
      }
  
      if (query.length === 0) {
        return { chats: [], total: 0, page, limit };
      }
  
      return await execute(`search chats of user ${userId} with query ${query}`, async () => {
        const fullTextCondition = or(
          sql`to_tsvector('english', ${schema.chats.title}) @@ websearch_to_tsquery('english', ${query})`,
          sql`to_tsvector('english', ${schema.messages.content}) @@ websearch_to_tsquery('english', ${query})`
        );
  
        const fuzzyCondition = or(
          sql`similarity(${schema.chats.title}, ${query}) > ${fuzzyThreshold}`,
          sql`similarity(${schema.messages.content}, ${query}) > ${fuzzyThreshold}`
        );
  
        const searchCondition = or(fullTextCondition, fuzzyCondition);
  
        const countResult = await db
          .select({ count: sql<number>`count(distinct ${schema.chats.id})` })
          .from(schema.messages)
          .leftJoin(schema.chats, eq(schema.messages.chatId, schema.chats.id))
          .where(and(eq(schema.chats.userId, userId), searchCondition));
  
        const total = countResult[0]?.count ?? 0;
  
        const chatsResult = await db
          .select({
            chat: schema.chats,
            message: schema.messages,
            titleSimilarity: sql<number>`similarity(${schema.chats.title}, ${query})`,
            contentSimilarity: sql<number>`similarity(${schema.messages.content}, ${query})`,
            tsRank: sql<number>`ts_rank(to_tsvector('english', ${schema.messages.content}), websearch_to_tsquery('english', ${query}))`,
          })
          .from(schema.messages)
          .leftJoin(schema.chats, eq(schema.messages.chatId, schema.chats.id))
          .where(and(eq(schema.chats.userId, userId), searchCondition))
          .limit(limit)
          .offset((page - 1) * limit)
          .orderBy(
            sql`GREATEST(
              similarity(${schema.chats.title}, ${query}),
              similarity(${schema.messages.content}, ${query}),
              ts_rank(to_tsvector('english', ${schema.messages.content}), websearch_to_tsquery('english', ${query}))
            ) DESC`
          );
  
        const aggregatedChats: Record<string, schema.Chat & { messages: schema.Message[] }> = {};
        for (const { chat, message } of chatsResult) {
          if (chat) {
            if (!aggregatedChats[chat.id]) {
              aggregatedChats[chat.id] = { ...chat, messages: [] };
            }
            if (message) {
              aggregatedChats[chat.id].messages.push(message);
            }
          }
        }
  
        return {
          chats: Object.values(aggregatedChats),
          total,
          page,
          limit,
        };
      });
    } catch (error) {
      console.error("Search error:", error);
      throw new Error(`Failed to search chats: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }