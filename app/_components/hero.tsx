"use client"

import { useSession } from "@/lib/client/auth";
import { Dashboard } from "./dashboard";
import { GetStarted } from "./get-started";

export function Hero() {
    const session = useSession()
    return (
        <section className="mx-auto max-w-3xl flex flex-col items-center justify-center text-center py-16 px-4 gap-8">
            <div className="flex flex-col gap-3 max-w-xl">
                <h1 className="title leading-tight">
                    Find any information you need in minutes
                </h1>
                <p className="muted max-w-2xl">
                    An open-source interface for all your AI chats and data.
                </p>
            </div>
            {session?.data ? <Dashboard/>: <GetStarted/>}
        </section>
    )
}