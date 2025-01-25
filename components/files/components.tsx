
import { use } from "react"
import { deleteObjects, getObjects } from "./_action"

import { DeleteButton } from "./client-components"

export function Files() {
    const objects = use(getObjects())
    return (
        <div>
            {objects.map((o) => <div className="border border-input p-2 my-2">
                <p>{o.name ?? o.id}</p>
                <DeleteButton id={o.id} />
            </div>)}

        </div>
    )
}

