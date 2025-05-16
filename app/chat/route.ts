import { redirect } from "next/navigation";
import { randomUUID } from "node:crypto";

export function GET() {
    const id = randomUUID();
    return redirect(`/chat/${id}`);
}