"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    delay: Math.random() * 2,
    duration: Math.random() * 5 + 7,
    opacity: Math.random() * 0.4 + 0.15,
  }));
}

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"enter" | "verse" | "exit">("enter");
  const particles = useMemo(() => generateParticles(50), []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("verse"), 1600);
    const t2 = setTimeout(() => setPhase("exit"), 3800);
    const t3 = setTimeout(() => onComplete(), 5800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  const isExiting = phase === "exit";

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#0D0A14" }}
      initial={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.2, filter: "blur(12px)" }}
      transition={{ duration: 1.4, ease: "easeOut" }}
    >
      {/* Deep radial glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 700px 600px at 50% 45%, rgba(93, 63, 160, 0.35), transparent 70%)",
        }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `rgba(196, 168, 236, ${p.opacity})`,
            boxShadow: `0 0 ${p.size * 4}px rgba(160, 127, 214, 0.5)`,
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{
            opacity: isExiting ? 0 : [0, p.opacity, 0],
            y: isExiting ? -30 : [15, -15, 15],
            scale: isExiting ? 1.5 : 1,
          }}
          transition={{
            duration: isExiting ? 1.2 : p.duration,
            delay: p.delay,
            repeat: isExiting ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Central orb group */}
      <motion.div
        className="relative flex flex-col items-center justify-center"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{
          opacity: isExiting ? 0 : 1,
          scale: isExiting ? 1.4 : 1,
        }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Outer pulsing ring */}
        <motion.div
          className="absolute rounded-full border border-purple-400/20"
          style={{ width: 220, height: 220 }}
          animate={{
            scale: isExiting ? [1, 2] : [1, 1.35, 1],
            opacity: isExiting ? [0.25, 0] : [0.25, 0.08, 0.25],
          }}
          transition={{ duration: isExiting ? 1.2 : 3.5, repeat: isExiting ? 0 : Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full border border-purple-400/12"
          style={{ width: 300, height: 300 }}
          animate={{
            scale: isExiting ? [1, 1.8] : [1, 1.2, 1],
            opacity: isExiting ? [0.15, 0] : [0.15, 0.04, 0.15],
          }}
          transition={{ duration: isExiting ? 1.2 : 5, repeat: isExiting ? 0 : Infinity, ease: "easeInOut", delay: isExiting ? 0 : 0.5 }}
        />

        {/* Core glow */}
        <motion.div
          className="w-36 h-36 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(180, 150, 230, 0.7) 0%, rgba(120, 90, 190, 0.25) 45%, transparent 70%)",
            boxShadow:
              "0 0 100px rgba(140, 110, 210, 0.5), inset 0 0 50px rgba(210, 190, 245, 0.25)",
          }}
          animate={{
            scale: isExiting ? 1.5 : [1, 1.06, 1],
            opacity: isExiting ? 0 : [0.85, 1, 0.85],
          }}
          transition={{ duration: isExiting ? 1 : 3.5, repeat: isExiting ? 0 : Infinity, ease: "easeInOut" }}
        />

        {/* App name */}
        <motion.h1
          className="absolute font-cormorant text-2xl sm:text-3xl font-light text-purple-50 whitespace-nowrap tracking-wide drop-shadow-[0_0_20px_rgba(196,168,236,0.4)]"
          initial={{ opacity: 0, y: 25 }}
          animate={{
            opacity: isExiting ? 0 : 1,
            y: isExiting ? -20 : 0,
            filter: isExiting ? "blur(6px)" : "blur(0px)",
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Annes Bible Space
        </motion.h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        className="mt-24 font-cormorant-sc text-xs uppercase tracking-[0.35em] text-purple-300/50"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isExiting ? 0 : 1,
          y: isExiting ? -10 : 0,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        A place of peace
      </motion.p>

      {/* Verse reveal */}
      <AnimatePresence>
        {phase === "verse" && (
          <motion.div
            className="absolute bottom-20 sm:bottom-28 left-0 right-0 px-8 text-center"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <p className="font-cormorant text-lg sm:text-xl text-purple-200/80 italic leading-relaxed max-w-md mx-auto">
              &ldquo;Be still, and know that I am God.&rdquo;
            </p>
            <p className="font-cormorant-sc text-xs text-purple-300/50 mt-3 uppercase tracking-widest">
              Psalm 46:10
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Portal reveal light burst — fills screen then dissolves */}
      <AnimatePresence>
        {isExiting && (
          <>
            {/* Bright center bloom */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(235, 220, 255, 0.65) 0%, rgba(200, 175, 245, 0.35) 25%, rgba(140, 110, 210, 0.15) 50%, transparent 75%)",
              }}
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: [0, 1, 0.7, 0], scale: [0.2, 2.5, 4, 6] }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
            {/* Warm gold secondary bloom */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(240, 210, 140, 0.2) 0%, rgba(232, 201, 122, 0.1) 30%, transparent 60%)",
              }}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: [0, 0.9, 0.4, 0], scale: [0.3, 3, 5, 7] }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.15 }}
            />
            {/* Soft white flash at peak */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)",
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 0.6, 0], scale: [0.5, 3, 6] }}
              transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
            />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
