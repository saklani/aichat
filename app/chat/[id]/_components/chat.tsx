"use client"
import { Textarea } from "@/components/ui/textarea"
import { schema } from "@/lib/db"
import { useQueryClient } from "@tanstack/react-query"
import { useChat } from "ai/react"
import { Sparkles } from "lucide-react"
import { usePathname } from "next/navigation"
import { ChatHeader } from "./chat-header"
import { Markdown } from "./markdown"

function UserMessage({ content }: { content: string }) {
    return (
        <div className="flex justify-end w-full">
            <div className="text-sm max-w-[500px] border py-[4px] px-[12px] rounded">
                <p>{content}</p>
            </div>
        </div>
    )
}


function AIMessage({ content }: { action?: string; content: string; }) {
    return (
        <div className="flex w-full py-[24px] gap-[8px]">
            <div className="flex border p-[8px] h-[40px] w-[40px] rounded-[99px] items-center"><Sparkles size={24} strokeWidth={0.5} /></div>
            <div className="flex flex-col w-full p-[4px]">
                <Markdown>{content}</Markdown>
            </div>
        </div>
    )
}


export function Chat({ id, initialMessages }: { id: string, initialMessages?: schema.Message[] }) {
    const pathname = usePathname()
    const queryClient = useQueryClient()
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        id,
        initialMessages,
        onResponse: () => {
            if (pathname === "/chat") {
                window.history.replaceState(null, '', `/chat/${id}`);
                queryClient.invalidateQueries({ queryKey: ["chats"] })
            }
        }
    });

    return (
        <div className="flex flex-col w-full h-screen">
            <ChatHeader />
            <div className="flex flex-col px-[16px] md:px-[48px] p-[24px] overflow-y-scroll pb-[50px] h-[calc(100vh-128px)]">
                {messages.length === 0 ?
                    <h1 className="text-2xl">What can I help with?</h1> :
                    messages.map(m => (
                        <div key={m.id} className="whitespace-pre-wrap">
                            {m.role === 'user' ? <UserMessage content={m.content} /> : <AIMessage content={m.content} />}
                        </div>
                    ))}
            </div>
            <div className="w-full px-[16px] md:px-[24px] h-[77px]">
                <form onSubmit={handleSubmit}>
                    <Textarea
                        className="w-full resize-none"
                        value={input}
                        placeholder="Ask anything"
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && e.shiftKey == false) {
                                e.preventDefault();
                                //@ts-expect-error comvert to form element
                                (e.target.form as HTMLFormElement).requestSubmit();
                            }
                        }}
                    />
                </form>
            </div>
        </div>
    )
}