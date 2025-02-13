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
import { GetChats } from "@/lib/client/types"

export function Content() {
    const router = useRouter()
    const pathname = usePathname()
    const { data: response } = useQuery<GetChats>({
        queryKey: ["chats"],
        queryFn: () => fetch("/api/chat").then(res => res.json())
    })

    return (
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu className="overflow-y-scroll">
                        {
                            response && response.data && response.data.map((chat) => (
                                <SidebarMenuItem key={chat.id} className={pathname.split('/').at(-1) === chat.id ? "bg-sidebar-select" : ""}>
                                    <SidebarMenuButton onClick={() =>
                                        router.push(`/chat/${chat.id}`)
                                    }>
                                        <span>{chat.title}</span>
                                    </SidebarMenuButton>
                                    <SidebarMenuAction>
                                        <Options id={chat.id} />
                                    </SidebarMenuAction>
                                </SidebarMenuItem>
                            )
                            )
                        }
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    )
}


export function Options({ id }: { id: string }) {
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: ({ id }: { id: string }) => fetch(`/api/chat/${id}`, { method: "DELETE" }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['chats'] }),
    })
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Ellipsis size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => mutate({ id })}>
                    <p className="text-2xs text-red-400">Delete</p>
                    <DropdownMenuShortcut><Delete size={14} className="text-red-400"/></DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


