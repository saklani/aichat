"use client"
import { useSession } from "@/lib/client/auth";
import Link from "next/link";
import { Dashboard } from "./dashboard";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
export function Header() {
    const session = useSession()
    return (
        <header className="bg-header w-full border-b">
            <div className="flex items-center justify-between py-4 px-6 h-14">
                <Link href="/">
                    <span className="text-lg font-semibold tracking-wider">Sable</span>
                </Link>
                {session.isPending ? <></> :
                    session?.data ?
                        <Dashboard /> :
                        <div className="flex gap-2">
                            <Login />
                            <Register />
                        </div>
                }
            </div>
        </header>
    )
}

function Login() {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <a href="/login" className="flex items-center justify-center text-sm font-medium hover:bg-accent hover:text-accent-foreground px-3 w-[83px] h-[28px] rounded-md">
                        <span>Login</span>
                    </a>
                </TooltipTrigger>
                <TooltipContent>
                    Login
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
} 

function Register() {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <a href="/register" className="flex items-center justify-center bg-primary text-primary-foreground hover:bg-white/90 min-w-[83px] h-[28px] rounded-md">
                        <span className=" text-sm font-medium">Sign up</span>
                    </a>
                </TooltipTrigger>
                <TooltipContent>
                    Create an account 
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
} 