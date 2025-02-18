"use client"
import { useSession } from "@/lib/client/auth";
import Link from "next/link";
import { Dashboard } from "./dashboard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function Header() {
    const session = useSession()
    const router = useRouter()
    const handleLogin = () => router.push("/register")
    const handleRegister = () => router.push("/login")
    return (
        <header className="bg-header w-full border-b">
            <div className="flex items-center justify-between py-4 px-6 h-16">
                <Link href="/">
                    <span className="text-lg font-semibold tracking-wider">Sable</span>
                </Link>
                {session.isPending ? <></> :
                    session?.data ?
                        <Dashboard /> :
                        <div className="flex gap-2">
                            <Button variant={"ghost"} onClick={handleLogin}>
                                Log in
                            </Button>
                            <Button onClick={handleRegister}>
                                Sign up
                            </Button>
                        </div>
                }
            </div>
        </header>
    )
}