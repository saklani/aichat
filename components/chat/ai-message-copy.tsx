"use client"

import { Button } from "@/components/ui/button"
import { CopyIcon } from "lucide-react"
import { memo } from "react"
import { toast } from "sonner"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export const AImessageCopy = memo(({ content }: { content: string }) => {

    const handleCopy = () => {
        navigator.clipboard.writeText(content)
        toast.success(`Copied Message: ${content.slice(0, 25)}...`)
    }
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={handleCopy}>
                        <CopyIcon className="w-4 h-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    Copy Message
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
})