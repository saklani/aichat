import type React from "react";
import { AppSidebar } from "../_components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <SidebarProvider>
            <div className="flex w-screen min-h-screen">
                <AppSidebar />
                <div className="flex flex-1 h-full">
                    <SidebarTrigger className="fixed top-0 z-1 m-[2px]" />
                </div>
                <div className="flex flex-col items-stretch w-full h-screen">
                    {children}
                </div>
            </div>
        </SidebarProvider>
    )
}