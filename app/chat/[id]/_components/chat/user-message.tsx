import { cn } from "@/lib/utils"
import { memo } from "react"

export const UserMessage = memo(function ({ content }: { content: string }) {
    return (
        <div className="flex justify-end w-full">
            <div className="text-[12.5px] bg-foreground/90 text-background max-w-[500px] border py-3 px-5 rounded-[24px]">
                <p>{content}</p>
            </div>
        </div >
    )
})

UserMessage.displayName = "UserMessage"