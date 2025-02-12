"use client"
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function Back() {
    const router = useRouter()
    return (
        <Button className="gap-[4px]" variant={"ghost"} onClick={() => router.back()}>
            <ArrowLeft />
            Back
        </Button>
    )
}