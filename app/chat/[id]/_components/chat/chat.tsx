"use client"

import { MessageParent } from "@/components/chat/ai-message/message-parent";
import { Textarea } from "@/components/ui/textarea";
import type { GetMessages } from "@/lib/client/types";
import { useQueryClient } from "@tanstack/react-query";
import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useChatData } from '../../hooks/useChatData';
import { DataDialog } from "./data-dialog";
import { Messages } from "./messages";
import { SwitchModels } from "./models";

export function Chat({ id }: { id: string }) {

    const { messages, preferences, isLoading, isError } = useChatData(id);

    if (isLoading) return <></>;
    if (isError || !preferences) return <div className="text-destructive">Error loading chat data.</div>;

    return (
        <NonMemoizedChat
            id={id}
            initialMessages={messages}
            model={preferences.defaultModel}
        />
    );
}

export function NonMemoizedChat({ id, initialMessages, model }: { id: string, initialMessages: GetMessages, model: string }) {
    const queryClient = useQueryClient()
    const [isLoading, setIsLoading] = useState(false)
    const messageRef = useRef<HTMLDivElement>(null)
    const [parentId, setParentId] = useState<string>("")

    const scrollToBottom = () => {
        if (messageRef.current) {
            messageRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }

    const { messages, input, handleInputChange, handleSubmit } = useChat({
        id,
        initialMessages,
        onResponse: () => {
            setParentId("");
            setIsLoading(false)
            queryClient.invalidateQueries({ queryKey: ["chats"] })
            scrollToBottom();
        },
        onError: (error) => {
            setIsLoading(false)
            console.error(error)
            toast(JSON.parse(error.message))
        },
        body: {
            model,
            currentParentId: parentId,
        }
    });

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        scrollToBottom();
        setIsLoading(true);
        handleSubmit(e);
    };

    // Scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [scrollToBottom, messages]);
    console.log(messages.at(-1))


    return (
        <div className="flex flex-col w-full items-center">
            <div
                className="flex flex-col pb-[128px] w-[calc(100%-24px)] max-w-3xl pt-[24px] px-4"
            >
                <Messages messages={messages} isLoading={isLoading} messageRef={messageRef} setParentId={setParentId} />
            </div>
            <div className="bg-background fixed bottom-0 z-1 border border-input rounded-lg p-2 lg:w-[calc(100%-24px)] sm:w-[500px] w-[350px] max-w-3xl mb-1 h-[1">
                {parentId && <MessageParent parent={messages.find(m => m.id === parentId)} setParentId={setParentId} />}

                <form onSubmit={handleFormSubmit}>
                    <Textarea
                        className="w-full resize-none h-[72px]"
                        value={input}
                        placeholder="Ask anything"
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && e.shiftKey === false) {
                                e.preventDefault();
                                //@ts-expect-error convert to form element
                                (e.target.form as HTMLFormElement).requestSubmit();
                            }
                        }}
                    />
                </form>
                <div className="flex h-[32px] px-3 gap-1">
                    <SwitchModels />
                    <DataDialog id={id} />
                </div>
            </div>
        </div>
    )
}