import { AImessageCopy } from "./ai-message-copy"
import { AImessageReply } from "./ai-message-reply"
import { Markdown } from "@/components/chat/messages/markdown"
import { memo } from "react"

export const AIMessage = memo(({ id, content, setParentId }: { id: string, content: string, setParentId: (parentId: string) => void }) => (
    <div className={"flex flex-col w-full py-[24px] gap-[8px] flex-1 h-full"}>
        <div id={id} className={"flex flex-col w-full p-3 scroll-mt-5 rounded-md"}>
            <Markdown>{content}</Markdown>
        </div>
        <div className="flex gap-2 mt-2 p-3">
            <AImessageCopy content={content} />
            <AImessageReply id={id} setParentId={setParentId} />
        </div>
    </div>
))

AIMessage.displayName = "AIMessage"