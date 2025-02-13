
import { signIn } from "@/auth";
import React from "react";

export async function ProviderLogin({ provider, children }: { provider: string; children: React.ReactNode }) {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("google", {redirect: true, redirectTo: "/chat"})
            }}
        >
            {children}
        </form>
    )
}

