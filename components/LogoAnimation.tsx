"use client";

import { pulseVariants } from "@/lib/variants";
import { motion } from "framer-motion";

export function LogoAnimation() {
  return (
    <motion.div
      variants={pulseVariants}
      initial="initial"
      animate="animate"
      className="relative "
    >
      <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-blue-700 rounded-full blur-2xl opacity-30" />
      <div className="relative flex justify-center items-center ">
        <img src="/logo.svg" className="w-[80%]" />
      </div>
    </motion.div>
  );
}
