
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogoutButton } from "../logout/client-component"
import { use } from "react"
import { getSession } from "@/lib/session"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export function Account() {
  const userData = use(getSession())
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-[24px] h-[24px] rounded-[32px] border-none text-xs">
          <AvatarFallback>{userData?.email.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuLabel className="text-sm font-medium">{userData?.email}</DropdownMenuLabel>
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>

  )
}