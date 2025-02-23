import { Message as Message } from "@/lib/client/types";
import { Button } from "../../ui/button";
import { X } from "lucide-react";

export const Quote = ({ parent, setParentId }: { parent: Message, setParentId: (parentId: string) => void }) => {

    const scrollToMessage = () => {
        const messageElement = document.getElementById(parent.id);
        if (messageElement) {
            messageElement.scrollIntoView({ behavior: "smooth" });
            messageElement.classList.add("bg-slate-700/30");
            setTimeout(() => {
                messageElement.classList.remove("bg-slate-700/30");
            }, 1000);
        }
    }

    const resetParentId = () => {
        setParentId("")
    }

    return (
        <div className="flex items-start bg-slate-700/60 rounded-xs cursor-pointer p-2">
            <div className="text-sm text-muted-foreground w-full" onClick={scrollToMessage}>
                {parent.content.slice(0, 400)} {parent.content.length > 400 && "..."}
            </div>
            <div>
                <Button variant="ghost" size="icon" onClick={resetParentId} className="shrink-0">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close reply context</span>
                </Button>
            </div>
        </div>
    )
}