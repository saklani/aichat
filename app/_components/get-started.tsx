"use client"
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function GetStarted() {
    const router = useRouter()
    const handleClick = () => router.push("/register")
    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.5 }}>
                <Button size={"lg"} className={"mt-12 animate-slide700"} onClick={handleClick}>
                    Get Started
                </Button>
            </motion.div>
        </>
    )
}
