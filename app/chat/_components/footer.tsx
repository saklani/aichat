"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { User } from "@/lib/client/types";
import { useQuery } from "@tanstack/react-query";
import { ChevronUp, User2 } from "lucide-react";
import { LogoutButton } from "./logout";

export function Footer() {
  const { data: user } = useQuery<User>({
    queryKey: ["user"], 
    queryFn: () => fetch("/api/user").then(res => res.json())
  })
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <User2 />
                {user?.email ?? ""}
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-anchor-width]"
            >
              <DropdownMenuItem asChild>
                <a href="/settings"><span>Settings</span></a>
              </DropdownMenuItem>
              <LogoutButton />
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}