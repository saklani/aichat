"use client"
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function Back() {
    const router = useRouter()
    return (
        <Button className="flex gap-[4px] items-center" variant={"ghost"} onClick={() => router.back()}>
            <ArrowLeft />
            <p className="pt-[1px]">Back</p>
        </Button>
    )
}