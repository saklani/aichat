import { Message } from "ai/react";
import { UserMessage } from "./user-message";
import { AIMessage } from "./ai-message";
import { cn } from "@/lib/utils";
import { Markdown } from "./markdown";

export function Messages({ messages, isLoading, messageRef, isFinished }: { messages: Message[], isLoading: boolean, messageRef: React.RefObject<HTMLDivElement | null>, isFinished: boolean }) {
    return (
        <>
            {messages.length === 0 ?
                <h1 className="text-2xl">What can I help with?</h1> :
                messages.slice(0, -1).map(m => (
                    <div key={m.id}>
                        {
                            m.role === 'user' ?
                                <UserMessage content={m.content} />
                                : <AIMessage content={m.content} />
                        }

                    </div>
                ))}
            <div className={"flex flex-col h-full min-h-[calc(100vh-152px)]"}>
                {
                    messages.at(-1)?.role === 'user' ?
                        <UserMessage content={messages.at(-1)?.content ?? ""} /> :
                        <></>
                }
                {
                    isLoading ?
                        <div ref={messageRef}>Thinking...</div> : <AIMessage content={messages.at(-1)?.content ?? ""} />
                }
            </div>
        </>
    )
}