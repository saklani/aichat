"use client"
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function Sidebar() {
    const router = useRouter()
    const pathName = usePathname()
    return (
        <div className="flex flex-col w-[220px] h-[calc(100vh-8px)] px-[8px] gap-[4px]">
            <div className="h-[100px] pt-[12px]">
                <p className="text-2xl">Multimodal AI Search</p>
            </div>
            <Button onClick={() => router.push("/")} className={pathName === "/" ? "bg-accent" : ""} variant="sidebar">Chat</Button>
            <Button onClick={() => router.push("/files")} className={pathName === "/files" ? "bg-accent" : ""} variant="sidebar">Files</Button>
            <Button onClick={() => router.push("/connectors")} className={pathName === "/connectors" ? "bg-accent" : ""} variant="sidebar">Connectors</Button>
            <Button onClick={() => router.push("/settings")} className={pathName === "/settings" ? "bg-accent" : ""} variant="sidebar">Settings</Button>
        </div>
    );
}