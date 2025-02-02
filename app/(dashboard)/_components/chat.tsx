"use client"
import { Textarea } from "@/components/ui/textarea"
import { schema } from "@/lib/db"
import { useChat } from "ai/react"
import { Sparkles } from "lucide-react"
import { Markdown } from "./markdown"

function UserMessage({ content }: { content: string }) {
    return (
        <div className="flex justify-end w-full">
            <div className="max-w-[500px] border py-[4px] px-[12px] rounded">
                <p>{content}</p>
            </div>
        </div>
    )
}


function AIMessage({ action, content }: { action?: string; content: string; }) {
    return (
        <div className="flex w-full py-[24px] gap-[8px]">
            <div className="flex border p-[8px] h-[40px] w-[40px] rounded-[99px] items-center"><Sparkles size={24} /></div>
            <div className="flex flex-col">
                <p className="h-[36px]">{action}</p>
                <Markdown>{content}</Markdown>
            </div>
        </div>
    )
}


export function Chat({ id, initialMessages }: { id: string, initialMessages: schema.Message[] }) {
    const { messages, input, handleInputChange, handleSubmit } = useChat({ id, initialMessages });
    return (
        <div className="flex flex-col gap-[8px]">
            <div className="flex flex-col p-[24px] overflow-y-scroll pb-[100px]">
                {messages.map(m => (
                    <div key={m.id} className="whitespace-pre-wrap">
                        {m.role === 'user' ? <UserMessage content={m.content} /> : <AIMessage content={m.content} />}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-center bg-red-100 fixed bottom-3 w-full">
                    <Textarea
                        className="h-[64px] w-full max-w-xl resize-none"
                        value={input}
                        placeholder="Ask anything"
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && e.shiftKey == false) {
                                e.preventDefault();
                                //@ts-ignore
                                (e.target.form as HTMLFormElement).requestSubmit();
                            }
                        }}
                    />
                </div>
            </form>
        </div>
    )
}