import { inngest } from "./client";

export const embed = inngest.createFunction(
  { id: "embed" },
  { event: "run/embed" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);