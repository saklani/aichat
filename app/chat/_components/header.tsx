import { SidebarHeader, SidebarGroup, SidebarGroupLabel, SidebarGroupAction } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";

export async function Header() {
    return (
        <SidebarHeader>
            <SidebarGroup>
                <SidebarGroupLabel>Sable</SidebarGroupLabel>
                <form action={async () => {
                    "use server"
                    redirect("/chat")
                }}>
                    <SidebarGroupAction title="New Chat" type="submit">
                        <Plus strokeWidth={0.9} /> <span className="sr-only">New Chat</span>
                    </SidebarGroupAction>
                </form>
            </SidebarGroup>
        </SidebarHeader >
    )
}