"use client"

import { Button } from "@/components/ui/button";
import { CommandDialog, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { GetChatSearchResponse } from "@/lib/client/types";
import { useMutation } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchButton() {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const { mutate, data: response } = useMutation<GetChatSearchResponse, Error, { query: string }>({
        mutationFn: ({ query }) => fetch(`/api/chat/search?query=${query}`).then(res => res.json())
    })

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const handleOpen = () => {
        setOpen(true)
    }

    const handleNewChat = () => {
        setOpen(false)
        router.push("/chat")
    }

    const handleChatSelect = (chatId: string) => {
        router.push(`/chat/${chatId}`)
    }

    const handleSearch = (query: string) => {
        mutate({ query })
    }

    console.log(response)

    return (
        <div className="flex gap-2">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={handleOpen}>
                            <Search strokeWidth={0.9} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <span>Search</span>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <DialogTitle className="sr-only">Search</DialogTitle>
                <DialogDescription className="sr-only">Search chats and messages</DialogDescription>
                <CommandInput placeholder="Search" onValueChange={handleSearch} />
                <CommandGroup>
                    <CommandItem onSelect={handleNewChat}>New Chat</CommandItem>
                </CommandGroup>
                    <CommandList className="gap-2 p-2">
                        {
                            response?.data?.map((chat) => (
                                <CommandItem key={chat.id} onSelect={() => handleChatSelect(chat.id)}>
                                    {chat.title}
                                </CommandItem>
                            ))
                        }
                    </CommandList>
            </CommandDialog>
        </div>
    )
}