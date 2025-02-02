import { z } from "zod";


export const formSchema = z.object({
    name: z.string().min(1),
    modelId: z.string().default("1"),
});