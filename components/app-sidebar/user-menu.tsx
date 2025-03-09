"use client"
import { GetUserResponse } from "@/lib/schema";
import { useQuery } from "@tanstack/react-query";
import { ChevronUp, User2 } from "lucide-react";

export function UserMenu() {
    const { data: response } = useQuery<{ data: GetUserResponse }>({
        queryKey: ["user"],
        queryFn: () => fetch("/api/user").then(res => res.json())
    });
    
    return (
        <>
            <User2 />
            {response?.data.email}
            <ChevronUp className="ml-auto" />
        </>
    )
}