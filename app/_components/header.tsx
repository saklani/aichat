"use client"
import { useSession } from "@/lib/client/auth";
import Link from "next/link";
import { Dashboard } from "./dashboard";
import { GetStarted } from "./get-started";
import { Login } from "./login";
import React from "react";

export function Header() {
    const session = useSession()

    return (
        <header className="bg-header w-full border-b">
            <div className="mx-auto max-w-5xl flex items-center justify-between py-4 px-6">
                <Link href="/">
                    <span className="text-lg font-semibold">Sable</span>
                </Link>

                {session?.data ?
                    <Dashboard /> :
                    <div className="flex gap-2">
                        <Login />
                        <GetStarted />
                    </div>
                }
            </div>
        </header>
    )
}