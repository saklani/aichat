import React from "react";
import { AppSidebar } from "./_components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <SidebarProvider>
            <div className="flex w-full">
                <AppSidebar />
                {children}
            </div>
        </SidebarProvider>
    )
}