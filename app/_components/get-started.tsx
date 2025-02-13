"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function GetStarted() {
    const router = useRouter()
    return (
        <Button onClick={() => router.push("/register")}>
            Get Started
        </Button>
    )
}