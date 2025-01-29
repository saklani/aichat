import { z } from "zod";

export const formSchema = z.object({
    message: z.string().min(1),
});

export const createChatFormSchema = z.object({
    name: z.string().min(1),
    fileIds: z.array(z.string()),
});