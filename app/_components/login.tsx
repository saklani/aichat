"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function Login() {
    const router = useRouter()
    const handleClick = () => router.push("/login")

    return (
        <Button onClick={handleClick}>
            Login
        </Button>
    )
}
