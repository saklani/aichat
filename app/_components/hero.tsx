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
    <section className="flex flex-col items-stretch px-12 py-24 w-full">
      <motion.div
        className="flex flex-col gap-8"
        variants={variants.container}
        initial="initial"
        animate="animate"
      >
        <motion.h1 className="text-3xl md:text-4xl lg:text-6xl leading-tight" variants={variants.item}>
          Find information fast
        </motion.h1>
        <motion.p className="muted text-md md:text-lg lg:text-xl" variants={variants.item}>
          An open-source interface where you can add your own models and chat with your data.
        </motion.p>
        <GetStarted />
      </motion.div>
    </section>
  );
}
