import { Message as Message } from "@/lib/client/types";
import { Button } from "../../ui/button";
import { X } from "lucide-react";

export const Quote = ({ parent, setParentId }: { parent: Message, setParentId: (parentId: string) => void }) => {
    const scrollToMessage = () => {
        const messageElement = document.getElementById(parent.id);
        if (messageElement) {
            messageElement.scrollIntoView({ behavior: "smooth" });
            messageElement.classList.add("bg-quote/30");
            setTimeout(() => {
                messageElement.classList.remove("bg-quote/30");
            }, 1000);
        }
    }

    const resetParentId = (e: React.MouseEvent<HTMLButtonElement>) => {
        setParentId("");
        e.stopPropagation();
    }

    return (
        <div className="flex items-start bg-quote text-quote-foreground text-xs rounded-md cursor-pointer p-2" onClick={scrollToMessage}>
            <div className="w-full" >
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