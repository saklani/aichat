"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

export function FileUpload() {
    return (
        <DropdownMenuItem onClick={() => { document.getElementById("input-file")?.click() }}>
            <p>Upload a file</p>
            <Input
                id={"input-file"}
                type="file"
                onInput={(event) =>{
                    console.log(event)
                    console.log(event.target)
                }}
                multiple
                className="hidden"
            />
        </DropdownMenuItem>
    )
}