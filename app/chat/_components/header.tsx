"use client"

import { SidebarHeader, SidebarGroup, SidebarGroupLabel, SidebarGroupAction } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export function Header() {

    const router = useRouter()
    return (
        <SidebarHeader>
            <SidebarGroup>
                <SidebarGroupLabel>Chats</SidebarGroupLabel>
                <SidebarGroupAction title="New Chat" onClick={() => router.push("/chat")}>
                    <Plus />
                    <span className="sr-only">New Chat</span>
                </SidebarGroupAction>
            </SidebarGroup>
        </SidebarHeader>
    )
}