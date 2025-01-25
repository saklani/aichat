"use client"

import { Button } from "../ui/button"
import { deleteObjects } from "./_action"

export function DeleteButton({ id }: { id: string }) {
    return <Button onClick={() => deleteObjects(id)}>Delete</Button>
}