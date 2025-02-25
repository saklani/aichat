"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function Dashboard() {
    const router = useRouter()

    const handleClick = () => router.push("/chat")

    return (
        <Button onClick={handleClick}>
            Dashboard
        </Button>
    )
}
