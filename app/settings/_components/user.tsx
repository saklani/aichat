"use client"
import {
    Avatar,
    AvatarFallback
} from "@/components/ui/avatar"
import type { User } from "@/lib/client/types"
import { useQuery } from "@tanstack/react-query"

export function User() {
    const { data: user } = useQuery<User>({
        queryKey: ["user"],
        queryFn: () => fetch("/api/user").then(res => res.json())
    })
    return (
        <div className="flex flex-col items-center gap-[8px] py-[12px] w-full h-[150px]">
            <Avatar className="w-[100px] h-[100px] border">
                <AvatarFallback>{user?.email[0]}</AvatarFallback>
            </Avatar>
            <p className="text-xs">{user?.email}</p>
        </div>
    )
}