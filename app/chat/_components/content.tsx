"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Delete, Ellipsis, Share } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { deleteChat, getChats } from "./actions"

export function Content() {
    const router = useRouter()
    const pathname = usePathname()
    const { data: chats } = useQuery({
        queryKey: ["chats"],
        queryFn: getChats
    })

    return (
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu className="overflow-y-scroll">
                        {chats && chats.map((chat) => (
                            <SidebarMenuItem key={chat.id} className={pathname.split('/').at(-1) === chat.id ? "bg-slate-200" : ""}>
                                <SidebarMenuButton onClick={() => router.push(`/chat/${chat.id}`)}>
                                    <span>{chat.title}</span>
                                </SidebarMenuButton>
                                <SidebarMenuAction>
                                    <Options id={chat.id} />
                                </SidebarMenuAction>
                            </SidebarMenuItem>))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    )
}


export function Options({ id }: { id: string }) {
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: () => deleteChat({ id }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['chats']
            })
            console.log("chats")
        },

    })
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Ellipsis size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <p className="text-sm">Share</p>
                    <DropdownMenuShortcut><Share size={14} /></DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => mutate()}>
                    <p className="text-sm">Delete</p>
                    <DropdownMenuShortcut><Delete size={14} /></DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


