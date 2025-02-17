import { serve } from "inngest/next";
import { inngest } from "@/lib/server/bg/client";
import { embed } from "@/lib/server/bg/embed";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    embed,
  ],
});
