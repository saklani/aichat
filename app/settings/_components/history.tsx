import { Button } from "@/components/ui/button";

export function History() {
    return (
        <div className="flex flex-col items-start gap-2">
            <h1 className="title">Chats</h1>
            <p>Export your message history</p>
            <Button disabled>Export Chats</Button>
        </div>
    )

}