"use client";

import { redirect } from "next/navigation";

export default function Page() {
    const id = self.crypto.randomUUID();
    
    redirect(`/chat/${id}?`);
}