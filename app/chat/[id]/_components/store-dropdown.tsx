"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";
import { FileUpload } from "./file-upload";

export function FileDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"outline"} size={"icon"}>
                    <Plus />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" className="w-[200px]">
                <DropdownMenuLabel>Add data to chat</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <FileUpload />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}