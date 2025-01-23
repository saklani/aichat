"use client"

import { Button } from "@/components/ui/button"
import { logout } from "./_action"


export function LogoutButton() {
  return (
    <Button variant={"destructive"} onClick={() => logout()}>
      Logout
    </Button>
  )
}
