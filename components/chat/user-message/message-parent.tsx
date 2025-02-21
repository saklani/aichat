import { GetMessage as Message } from "@/lib/client/types";
import { Button } from "../../ui/button";
import { X } from "lucide-react";

export const MessageParent = ({ parent }: { parent: Message }) => {

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

    return (
        <div className="flex items-start bg-slate-700/60 rounded-xs cursor-pointer p-2 text-sm text-muted-foreground w-full" onClick={scrollToMessage}>
            {parent.content.slice(0, 400)} {parent.content.length > 400 && "..."}
        </div>
    )
}