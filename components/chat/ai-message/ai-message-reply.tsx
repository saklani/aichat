"use client"

import { Button } from "@/components/ui/button"
import { Copy, ReplyIcon } from "lucide-react"
import { memo } from "react"
import { toast } from "sonner"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export const AImessageReply = memo(({ id, setParentId }: { id: string, setParentId: (parentId: string) => void }) => {

    const handleReply = () => setParentId(id)        

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={handleReply}>
                        <ReplyIcon className="w-4 h-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    Reply to Message
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
})