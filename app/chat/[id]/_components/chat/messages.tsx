import { UserMessage } from "./user-message";
import { AIMessage } from "./ai-message";
import type { Message } from "@/lib/client/types";

export function Messages({ messages, isLoading, messageRef, setParentId }: { messages: Message[], isLoading: boolean, messageRef: React.RefObject<HTMLDivElement | null>, setParentId: (parentId: string) => void }) {
    return (
        <>
            {messages.length === 0 ?
                <h1 className="text-2xl">What can I help with?</h1> :
                messages.slice(0, -1).map(m => (
                    <div key={m.id}>
                        {
                            m.role === 'user' ?
                                <UserMessage message={m} />
                                : <AIMessage id={m.id} content={m.content} setParentId={setParentId} />
                        }

                    </div>
                ))}
            <div className={"flex flex-col h-full min-h-[calc(100vh-152px)]"}>
                {
                    messages.length > 0 && messages[messages.length - 1] && messages[messages.length - 1].role === 'user' ?
                        <UserMessage message={messages[messages.length - 1]} /> :
                        <></>
                }
                {
                    isLoading ?
                        <div ref={messageRef}>Thinking...</div> :
                        messages.length > 0 && messages[messages.length - 1] && messages[messages.length - 1].role === 'assistant' ?
                            <AIMessage id={messages[messages.length - 1].id} content={messages[messages.length - 1].content} setParentId={setParentId} />
                            : <></>
                }
            </div>
        </>
    )
}