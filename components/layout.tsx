"use client"

import { usePathname } from "next/navigation"
import React from "react"
import { Sidebar } from "./sidebar/component";

export function Layout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname()

    switch (pathname) {
        case "/":
        case "/files":
        case "/connectors":
        case "/settings":
            {
                return (
                    <div className="flex w-full">
                        <Sidebar />
                        <div className="flex flex-col w-full h-screen overflow-y-scroll">
                            {children}
                        </div>
                    </div>
                )
            }
        default:
            {
                return <div
                    className={`flex flex-col bg-background min-h-[100vh] items-center justify-center p-[16px]`}
                >
                    {children}
                </div>
            }
    }
}