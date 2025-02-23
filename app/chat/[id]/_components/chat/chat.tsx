"use client"

import type { Message } from "@/lib/client/types";
import { useQueryClient } from "@tanstack/react-query";
import { useChat } from "ai/react";
import { useEffect, useRef, useState, useCallback } from "react";
import { toast } from "sonner";
import { useChatData } from '../../hooks/useChatData';
import { Messages } from "./messages";
import { Input } from "@/components/chat/input/input";

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

export function NonMemoizedChat({ id, initialMessages, model }: { id: string, initialMessages: Message[], model: string }) {
    const queryClient = useQueryClient()
    const [isLoading, setIsLoading] = useState(false)
    const messageRef = useRef<HTMLDivElement>(null)
    const [parentId, setParentId] = useState<string | undefined>(undefined)

    const scrollToBottom = useCallback(() => {
        if (messageRef.current) {
            messageRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [messageRef])

    const { messages, input, handleInputChange, handleSubmit } = useChat({
        id,
        initialMessages,
        onResponse: () => {
            setParentId(undefined);
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

    return (
        <div className="flex flex-col w-full items-center">
            <div
                className="flex flex-col pb-[128px] w-[calc(100%-24px)] max-w-3xl pt-[24px] px-4"
            >
                <Messages messages={messages} isLoading={isLoading} messageRef={messageRef} setParentId={setParentId} />
            </div>
            
            
            <Input id={id} parent={messages.find(m => m.id === parentId)} parentId={parentId} setParentId={setParentId} handleFormSubmit={handleFormSubmit} handleInputChange={handleInputChange} input={input} />
        </div>
    )
}