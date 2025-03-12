import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type React from "react";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <SidebarProvider>
            <div className="flex w-screen min-h-screen">
                <AppSidebar />
                <SidebarInset>
                    <div className="flex flex-1 h-full">
                        <SidebarTrigger className="fixed top-0 z-1 m-[2px]" />
                    </div>
                    <div className="flex flex-col items-stretch w-full min-h-screen">
                        {children}
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}