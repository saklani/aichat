import { tool } from "ai";
import { z } from "zod";
import { findRelevantContent } from "../embeddings";

export const fileSearch = tool({
    description: `add a resource to your knowledge base.
      If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
    parameters: z.object({
      content: z
        .string()
        .describe('the content or resource to add to the knowledge base'),
    }),
    execute: async ({ content }) => findRelevantContent(content),
  })