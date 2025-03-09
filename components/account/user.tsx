"use client";
import {
    Avatar,
    AvatarFallback
} from "@/components/ui/avatar";
import type { GetUserResponse } from "@/lib/client/types";
import { useQuery } from "@tanstack/react-query";

export function User() {
    const { data: response } = useQuery<GetUserResponse>({
        queryKey: ["user"],
        queryFn: () => fetch("/api/user").then(res => res.json()),
    });
    return (
        <div className="flex flex-col items-center gap-2 py-3 w-full">
            <Avatar className="w-[60px] h-[60px] border">
                <AvatarFallback>
                    {response?.data.email?.at(0) ?? ""}
                </AvatarFallback>
            </Avatar>
            <div className="h-[25px] flex items-center">
                {response && response.data ? <p className="text-xs font-semibold">{response.data.email}</p> : <></>}
            </div>
        </div>
    );
}
