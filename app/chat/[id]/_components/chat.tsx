"use client"
import { Textarea } from "@/components/ui/textarea"
import { GetMessages, GetMessagesResponse, GetUserPreferences } from "@/lib/client/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useChat } from "ai/react"
import { Sparkles } from "lucide-react"
import { usePathname } from "next/navigation"
import { Markdown } from "./markdown"
import { SwitchModels } from "./models"
import { toast } from "sonner"

function UserMessage({ content }: { content: string }) {
    return (
        <div className="flex justify-end w-full">
            <div className="text-sm max-w-[500px] border py-2 px-4 rounded-xl">
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

export function Chat({ id }: { id: string }) {
    const { data: response1 } = useQuery<GetMessagesResponse>({ queryKey: ["chat", id], queryFn: () => fetch(`/api/chat/${id}/messages`).then(res => res.json()) })
    const { data: response2 } = useQuery<GetUserPreferences>({ queryKey: ["preferences"], queryFn: () => fetch("/api/user/preferences").then(res => res.json()) })

    if (!response1?.data || !response2?.data) {
        return <></>
    }

    return <UnmemoizedChat id={id} initialMessages={response1.data ?? []} model={response2.data.defaultModel} />
}


export function UnmemoizedChat({ id, initialMessages, model }: { id: string, initialMessages: GetMessages, model: string }) {
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
        },
        onError: (error) => {
            toast(JSON.parse(error.message)["error"])
        },
        body: { model }
    });

    return (
        <div className="flex justify-center h-screen">
            <div className="flex flex-col px-4 max-w-3xl items-stretch w-full">
                <div className="flex flex-col overflow-y-scroll py-[50px] h-[calc(100vh-109px)]">
                    {messages.length === 0 ?
                        <h1 className="text-2xl">What can I help with?</h1> :
                        messages.map(m => (
                            <div key={m.id} className="whitespace-pre-wrap">
                                {m.role === 'user' ? <UserMessage content={m.content} /> : <AIMessage content={m.content} />}
                            </div>
                        ))}
                </div>
                <div className="w-full h-[108px]">
                    <div className="border-t border-x border-input w-full p-[4px] pt-0 rounded-t-lg group">
                        <form onSubmit={handleSubmit}>
                            <Textarea
                                className="w-full resize-none h-[72px]"
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
                        <div className="flex h-[32px] px-3 gap-[2px]">
                            <SwitchModels />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}