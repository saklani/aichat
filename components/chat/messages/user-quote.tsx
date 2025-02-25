import { Message as Message } from "@/lib/client/types";

export const MessageParent = ({ parent }: { parent: Message }) => {

    const scrollToMessage = () => {
        const messageElement = document.getElementById(parent.id);
        if (messageElement) {
            messageElement.scrollIntoView({ behavior: "smooth", block: "start" });
            messageElement.classList.add("bg-quote/30");
            setTimeout(() => {
                messageElement.classList.remove("bg-quote/30");
            }, 1000);
        }
    }

    return (
        <div className="flex items-start bg-quote text-quote-foreground rounded-md max-w-md cursor-pointer p-2 text-sm w-full" onClick={scrollToMessage}>
            {parent.content.slice(0, 200)} {parent.content.length > 200 && "..."}
        </div>
    )
}