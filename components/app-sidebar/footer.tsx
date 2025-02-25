"use client"
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { UserMenu } from "./user-menu";
import { useState, useCallback } from "react";
import { signOut } from "@/lib/client/auth";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LogOut, Settings } from "lucide-react";

const links = [
  // { label: "Collections", href: "/collections" },
  { label: "Settings", href: "/settings", icon: Settings },
] as const;

export const Footer = () => {
  const [open, setOpen] = useState(false)

  const router = useRouter()
  const handleLogout = useCallback(async () => {
    await signOut()
    router.push("/login")
  }, [router])
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <SidebarMenuButton isActive={open}>
                <UserMenu />
              </SidebarMenuButton>
            </PopoverTrigger>
            <PopoverContent
              side="top"
              className="w-[--radix-popper-anchor-width] flex flex-col"
            >
              {links.map((link) => (
                <Button variant="ghost" className="font-[300] justify-start text-xs tracking-wider" asChild key={link.href}>
                  <a className="flex items-center gap-2" href={link.href}>
                    <link.icon className="w-4 h-4" />
                    <span>{link.label}</span></a>
                </Button>
              ))}
              <Button variant="ghost" className="font-[300] flex items-center gap-2 justify-start text-xs tracking-wider hover:bg-destructive/80 hover:text-destructive-foreground " key="logout" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </PopoverContent>
          </Popover>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}

Footer.displayName = "Footer";