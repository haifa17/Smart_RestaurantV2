"use client";

import { pulseVariants } from "@/lib/variants";
import { motion } from "framer-motion";

export function LoadingSpinner() {
  return (
    <motion.div
      variants={pulseVariants}
      initial="initial"
      animate="animate"
      className="relative "
    >
      <div className="absolute inset-0  rounded-full " />
      <div className="relative flex justify-center items-center ">
        <img src="/H2A.png" className="w-[80%]" />
      </div>
    </motion.div>
  );
}
