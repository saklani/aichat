import { openai } from "@ai-sdk/openai";

export const models = {
    "gpt-4o-mini": openai('gpt-4o-mini'),
    "gpt-4o": openai('gpt-4o'),
    "gpt-o1-mini": openai('gpt-4o')
}