"use client"
import { Search } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { DialogTitle, DialogDescription } from "../ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { GetChatSearchResponse } from "@/lib/client/types";

export function SearchButton() {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const { mutate, data: response, isPending } = useMutation<GetChatSearchResponse, Error, { query: string }>({
        mutationFn: ({ query }) => fetch(`/api/chat/search?query=${query}`).then(res => res.json()),
        onSuccess: (data) => {
            console.log(data)
        }
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
        router.push("/chat/new")
    }

    const handleChatSelect = (chatId: string) => {
        router.push(`/chat/${chatId}`)
    }

    const handleSearch = (query: string) => {
        mutate({ query })
    }

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
                <CommandGroup heading="Suggestions">
                    <CommandItem onSelect={handleNewChat}>New Chat</CommandItem>
                </CommandGroup>
                <CommandList className="gap-2 p-2" >
                    {isPending ?
                        <CommandEmpty>Searching...</CommandEmpty>
                        :
                        response?.data?.length == 0 ?
                            <CommandEmpty>No results found.</CommandEmpty>
                            :
                            response?.data?.map((chat) => (
                                <CommandItem key={chat.id} onSelect={() => handleChatSelect(chat.id)}>
                                    {chat.title}
                                </CommandItem>
                            ))}
                </CommandList>
            </CommandDialog>
        </div>
    )
}