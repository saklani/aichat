"use client"

import { GetStarted } from "./get-started";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="flex flex-col items-center justify-center text-center py-32 px-4 w-full">
            <div className="flex flex-col max-w-xl">
                <motion.h1 className="title leading-tight" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                    Find any information you need in minutes
                </motion.h1>
                <motion.p className="mt-5 muted max-w-2xl text-lg" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }}>
                    An open-source interface for all your AI chats and data.
                </motion.p>
            </div> 
            <GetStarted />
        </section>
    )
}