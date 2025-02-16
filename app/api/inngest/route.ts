import { serve } from "inngest/next";
import { inngest } from "@/lib/server/bg/client";
import { helloWorld } from "@/lib/server/bg/helloworld";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    helloWorld, // <-- This is where you'll always add all your functions
  ],
});
