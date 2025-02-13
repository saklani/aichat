"use client"
import { GetUser } from "@/lib/client/types";
import { useQuery } from "@tanstack/react-query";
import { ChevronUp, User2 } from "lucide-react";

export function UserMenu() {
    const { data: response } = useQuery<GetUser>({
        queryKey: ["user"],
        queryFn: () => fetch("/api/user").then(res => res.json())
    })
    return (
        <>
            <User2 />
            {response?.data?.email ?? ""}
            <ChevronUp className="ml-auto" />
        </>
    )
}