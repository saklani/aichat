import { memo } from "react";
import { Markdown } from "./markdown";
import { cn } from "@/lib/utils";

export const AIMessage = memo(({ content }: { content: string; }) => (
        <div className={cn("flex w-full py-[24px] gap-[8px] flex-1 h-full")}> 
            <div className="flex flex-col w-full py-2">
                <Markdown>{content}</Markdown>
            </div>
        </div>
    ))

AIMessage.displayName = "AIMessage"