import { redirect } from "next/navigation";
import { randomUUID } from "node:crypto";

export default function Chat() {
    const id = randomUUID();
    return redirect(`/chat/${id}`);
}