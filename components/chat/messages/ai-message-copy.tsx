"use client"

import { Button } from "@/components/ui/button"
import { CopyIcon, CheckIcon } from "lucide-react"
import { memo, useState  } from "react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export const AImessageCopy = memo(({ content }: { content: string }) => {
    const [isCopied, setIsCopied] = useState(false)
    const handleCopy = () => {
        navigator.clipboard.writeText(content)
        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
        }, 2000)
    }
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={handleCopy}>
                        {isCopied ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    Copy response
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
})
AImessageCopy.displayName = "AImessageCopy"