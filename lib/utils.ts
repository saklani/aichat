import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function generateTitleFromUserMessage({ message }: { message: string }) {
  const { text: title } = await generateText({
    model: openai('gpt-4o-mini'),
    system: `\n
    - you will generate a short title based on the first message a user begins a conversation with
    - ensure it is not more than 60 characters long
    - the title should be a summary of the user's message
    - do not use quotes or colons`,
    prompt: JSON.stringify(message),
  });

  return title;
}

export type ComponentStatus = 'idle' | 'pending' | 'error' | 'success'