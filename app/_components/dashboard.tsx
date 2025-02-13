"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function Dashboard() {
    const router = useRouter()
    return (
        <Button onClick={() => router.push("/chat")}>
            Dashboard
        </Button>
    )
}