import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function ChatHeader() {
    return (
        <div className="sticky bg-background top-0 z-10 flex gap-3 p-2 items-center border-b w-full justify-between">
            <SidebarTrigger />
        </div>
    )
}