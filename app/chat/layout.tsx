import React from "react";
import { AppSidebar } from "./_components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <SidebarProvider>
            <div className="flex gap-1 w-full">
                <AppSidebar />
                <div className="w-[1rem]">
                    <SidebarTrigger className="mt-1" />
                </div>
                <div className="w-full">
                    {children}
                </div>
            </div>
        </SidebarProvider>
    )
}