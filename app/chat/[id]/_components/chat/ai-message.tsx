import { memo } from "react"
import { Markdown } from "@/components/chat/markdown/markdown"
import { AImessageCopy } from "@/components/chat/ai-message/ai-message-copy"
import { AImessageReply } from "@/components/chat/ai-message/ai-message-reply"

export const AIMessage = memo(({ id, content, setParentId }: { id: string, content: string, setParentId: (parentId: string) => void }) => (
    <div className={"flex flex-col w-full py-[24px] gap-[8px] flex-1 h-full rounded-xs"}>
        <div id={id} className={"flex flex-col w-full p-3"}>
            <Markdown>{content}</Markdown>
        </div> 
        <div className="flex gap-2 mt-2 p-3">
                <AImessageCopy content={content} />
                <AImessageReply id={id} setParentId={setParentId} />
            </div>
    </div>
))

AIMessage.displayName = "AIMessage"