import { randomUUID } from "crypto";
import { Chat } from "./[id]/_components/chat";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ChatHeader } from "./[id]/_components/chat-header";


export default function Page() {
    const id = randomUUID()
    return (
        <Tabs className="flex flex-col h-screen items-start w-full p-2" defaultValue="chat">
            <ChatHeader />
            <TabsContent className="flex flex-col flex-grow w-full p-0" value="chat">
                <Chat id={id} key={id} />
            </TabsContent>
            <TabsContent className="w-full" value="files">
            </TabsContent>
        </Tabs>
    );
}