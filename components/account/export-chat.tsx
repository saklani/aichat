"use client"
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useMutation } from "@tanstack/react-query";
import { GetChatExportsResponse } from "@/lib/client/types";
import { toast } from "sonner";

export function History() {

    const { mutate, status } = useMutation<GetChatExportsResponse>({
        mutationFn: () => fetch("/api/chat/export").then(res => res.json()),
        onSuccess: ({data}) => {
            if (data.length === 0) {
                toast.error("No chats found")
                return
            }
            const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
                JSON.stringify(data)
            )}`;
            const link = document.createElement("a");
            link.href = jsonString;
            link.download = "chats.json";
            link.click();
        }
    })


    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-start">
                <div className="flex flex-col items-start gap-2">
                    <CardTitle>Chats</CardTitle>
                    <CardDescription>Export your chats history</CardDescription>
                </div>
                <Button status={status} className="mt-4" onClick={() => mutate()}>Export Chats</Button>
            </CardHeader>
        </Card>
    )

}