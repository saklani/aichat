"use client"

import { GetStarted } from "./get-started";
import { motion } from "framer-motion";

const variants = {
  container: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  },
  item: {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 }
  }
};

export function Hero() {
    return (
        <section className="bg-background/30 border-b  flex flex-col items-center justify-center text-center py-32 px-4 w-full">
            <motion.div 
                className="flex flex-col max-w-xl"
                variants={variants.container}
                initial="initial"
                animate="animate"
            >
                <motion.h1 className="title leading-tight" variants={variants.item}>
                    Find any information you need in minutes
                </motion.h1>
                <motion.p className="mt-5 muted max-w-2xl text-lg" variants={variants.item}>
                    An open-source interface for all your AI chats and data.
                </motion.p>
            </motion.div> 
            <GetStarted />
        </section>
    );
}