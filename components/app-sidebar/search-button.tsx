"use client"
import { Search } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { DialogTitle, DialogDescription } from "../ui/dialog";

export function SearchButton() {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState("")

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const handleOpen = () => {
        setOpen(true)
    }
    return (
        <div className="flex gap-2">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={handleOpen}>
                            <Search strokeWidth={0.9} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <span>Search</span>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <DialogTitle className="sr-only">Search</DialogTitle>
                <DialogDescription className="sr-only">Search for a chat</DialogDescription>
                <CommandInput placeholder="Search" />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem>Calendar</CommandItem>
                        <CommandItem>Search Emoji</CommandItem>
                        <CommandItem>Calculator</CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </div>
    )
}