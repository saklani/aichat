"use client"

import { motion } from "framer-motion";
import { Section } from "./section";
const variants = {
  container: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  },
  item: {
    initial: { opacity: 0, y: 0 },
    animate: { opacity: 1, y: 0 }
  }
};

export function Hero() {
  return (
    <Section>
      <motion.div
        className="flex flex-col gap-8 items-center"
        variants={variants.container}
        initial="initial"
        animate="animate"
      >
        <motion.h1 className="text-[clamp(2.4rem,_4vw,_4rem)] text-balance -tracking-[1px] lg:-tracking-[1.8px] leading-[1] text-center" variants={variants.item}>
          All your AI chats in one place
        </motion.h1>
        <motion.p className="-tracking-[0.1px] md:-tracking-[0.2px] lg:-tracking-[0.3px] xl:-tracking-[0.4px] text-wrap text-[clamp(1.1rem,_2vw,_1.4rem)] font-medium text-center" variants={variants.item}>
          An open-source interface for all your AI chats and data.
        </motion.p>
      </motion.div>
    </Section>
  );
}
