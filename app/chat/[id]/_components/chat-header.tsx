import { SidebarTrigger } from "@/components/ui/sidebar";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ChatHeader() {
    return (
        <div className="flex gap-3 p-2 items-center border-b w-full">
            <SidebarTrigger />
            <TabsList>
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="files" disabled>Files</TabsTrigger>
            </TabsList>
        </div>
    )
}