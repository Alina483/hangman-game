import React from "react";
import { motion } from "framer-motion";

const NUM_DROPS = 120;
const drops = Array.from({ length: NUM_DROPS }).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 2,
  duration: 1.5 + Math.random() * 1.5,
  height: 15 + Math.random() * 25,
}));

const StormScene = () => {
  return (
    <div
      className="storm-overlay"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none", // allow clicks to pass through
        overflow: "hidden",
        zIndex: 9999, // ensure it’s on top
        background: "transparent",
      }}
    >
      {/* Rain */}
      {drops.map((drop) => (
        <motion.div
          key={drop.id}
          initial={{ y: -50 }}
          animate={{ y: "110vh" }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: drop.duration,
            delay: drop.delay,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: 0,
            left: `${drop.left}vw`,
            width: "2px",
            height: `${drop.height}px`,
            background: "rgba(147, 197, 253, 0.8)",
            boxShadow: "0 0 6px rgba(147, 197, 253, 0.7)",
            borderRadius: "999px",
          }}
        />
      ))}

      {/* Lightning flash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 0, 0, 0.8, 0] }}
        transition={{
          repeat: Infinity,
          repeatDelay: 3,
          duration: 1.2,
          times: [0, 0.05, 0.12, 0.2, 0.6, 0.7, 1],
        }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 20% 0%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 50%), rgba(255,255,255,0.05)",
          mixBlendMode: "screen",
        }}
      />

      {/* Optional lightning bolt */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0.6 }}
        animate={{ opacity: [0, 0, 1, 0], scaleY: [0.6, 1, 1.1, 0.8] }}
        transition={{
          repeat: Infinity,
          repeatDelay: 3,
          duration: 0.5,
          times: [0, 0.1, 0.2, 1],
        }}
        style={{
          position: "absolute",
          top: "5vh",
          left: "25vw",
          width: "6px",
          height: "35vh",
          background:
            "linear-gradient(to bottom, #ffffff, #e5f2ff, #93c5fd, transparent)",
          boxShadow: "0 0 24px rgba(255,255,255,0.9)",
          clipPath:
            "polygon(40% 0%, 60% 0%, 55% 35%, 70% 35%, 45% 100%, 40% 60%, 25% 60%)",
        }}
      />
    </div>
  );
};

export default StormScene;
