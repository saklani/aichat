"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function SignUp() {
    const router = useRouter()
    const handleClick = () => router.push("/login")

    return (
        <Button onClick={handleClick}>
            Sign Up
        </Button>
    )
}
