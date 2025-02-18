"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function Login() {
    const router = useRouter()


    return (
        <Button variant={"ghost"} onClick={handleClick}>
            Log in
        </Button>
    )
}
