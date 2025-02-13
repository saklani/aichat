"use client"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react"

export function Logout() {
  return (
    <DropdownMenuItem asChild>
      <button className="w-full" onClick={() => signOut()}>Logout</button>
    </DropdownMenuItem>
  )
}