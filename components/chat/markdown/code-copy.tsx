"use client"

import { Button } from "@/components/ui/button"
import { CopyIcon } from "lucide-react"
import { memo } from "react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export const CodeCopy = memo(({ content }: { content: string }) => {

    const handleCopy = () => {
        navigator.clipboard.writeText(content)
    }
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button className="w-[22px] h-[22px]" variant="ghost" size="icon" onClick={handleCopy}>
                        <CopyIcon />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    Copy code
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
})