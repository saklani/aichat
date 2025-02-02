
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { getSession } from "@/lib/session"
import { use } from "react"
import { LogoutButton } from "./logout"

export function Account() {
  const userData = use(getSession())
  if (userData) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="w-[24px] h-[24px] rounded-[32px] border-none text-xs">
            <AvatarFallback>{userData.email.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuLabel className="text-sm font-medium">{userData.email}</DropdownMenuLabel>
          <LogoutButton />
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
}