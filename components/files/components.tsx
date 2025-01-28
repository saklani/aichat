
import { use } from "react"
import { deleteObjects, getObjects } from "./_action"

import { DeleteButton, FileTable } from "./client-components"

export function Files() {
    return (
        <div>
            
            <FileTable/>
        </div>
    )
}

