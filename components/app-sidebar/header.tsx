import { Logo } from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarGroup, SidebarGroupLabel, SidebarHeader } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SearchButton } from "./search-button";

export async function Header() {
    return (
        <SidebarHeader>
            <SidebarGroup>
                <SidebarGroupLabel>
                    <Link href="/">
                        <Logo />
                    </Link>
                </SidebarGroupLabel>
                <Separator className="mt-5 mb-4" />
                <div className="flex gap-2">
                    <NewChatButton />
                    {/* <SearchButton />   */}
                </div>
            </SidebarGroup>
        </SidebarHeader >
    )
}


function NewChatButton() {
    return (
        <TooltipProvider>
            <Tooltip>
                <form className="w-full" action={async () => {
                    "use server"
                    redirect("/chat")
                }}>
                    <TooltipTrigger asChild>
                        <Button className="gap-2 w-full" type="submit">
                            <span className="text-xs">New Chat</span>
                        </Button>
                    </TooltipTrigger>
                </form>
                <TooltipContent>
                    <span>New Chat</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
