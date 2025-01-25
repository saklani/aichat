import { z } from "zod";

export const formSchema = z.object({
    file: z.instanceof(File).refine((file) => file.size < 7000000, {
        message: 'Your file must be less than 7MB.',
    }),
});