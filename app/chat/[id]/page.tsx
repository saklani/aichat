import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Chat } from "./_components/chat";
import { ChatHeader } from "./_components/chat-header";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return (
        <Tabs className="flex flex-col h-screen items-start w-full p-2" defaultValue="chat">
            <ChatHeader />
            <TabsContent className="flex flex-col flex-grow w-full p-0" value="chat">
                <Chat id={id} />
            </TabsContent>
            <TabsContent className="w-full" value="files">
            </TabsContent>
        </Tabs>
    );
}