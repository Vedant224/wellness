import React from "react";
import { motion } from "motion/react";

export const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.1,
      }}
      viewport={{ once: true }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
      className="relative group rounded-xl overflow-hidden"
    >
      {/* Animated gradient border */}
      <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30 group-hover:opacity-100 blur-[2px] group-hover:blur-[3px] transition-all duration-500"></div>
      
      {/* Card content */}
      <div className="relative bg-black bg-opacity-85 backdrop-blur-sm rounded-xl p-6 h-full border border-white/10">
        <div className="mb-4 text-indigo-400">{icon}</div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
      
      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-tr from-transparent via-white to-transparent translate-y-full group-hover:translate-y-0 transition-all duration-700"></div>
    </motion.div>
  );
};