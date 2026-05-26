"use client";

import { useState, useEffect } from "react";
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
    size: Math.random() * 2 + 1,
    delay: Math.random() * 3,
    duration: Math.random() * 4 + 6,
    opacity: Math.random() * 0.5 + 0.2,
  }));
}

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"enter" | "verse" | "exit" | "done">("enter");
  const [particles] = useState(() => generateParticles(40));

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("verse"), 1800);
    const t2 = setTimeout(() => setPhase("exit"), 4500);
    const t3 = setTimeout(() => setPhase("done"), 5800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    if (phase === "done") onComplete();
  }, [phase, onComplete]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
        style={{ background: "#0D0A14" }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
          {/* Radial glow behind everything */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 600px 500px at 50% 50%, rgba(93, 63, 160, 0.25), transparent 70%)",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
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
                boxShadow: `0 0 ${p.size * 3}px rgba(160, 127, 214, 0.4)`,
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: [0, p.opacity, 0],
                y: [10, -10, 10],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Central orb */}
          <motion.div
            className="relative flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {/* Pulsing rings */}
            <motion.div
              className="absolute rounded-full border border-purple-400/20"
              style={{ width: 180, height: 180 }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute rounded-full border border-purple-400/15"
              style={{ width: 240, height: 240 }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.05, 0.2],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Core glow */}
            <motion.div
              className="w-32 h-32 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(160, 127, 214, 0.6) 0%, rgba(93, 63, 160, 0.2) 50%, transparent 70%)",
                boxShadow: "0 0 80px rgba(124, 92, 191, 0.4), inset 0 0 40px rgba(196, 168, 236, 0.2)",
              }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* App name */}
            <motion.h1
              className="absolute font-cormorant text-2xl sm:text-3xl font-light text-purple-100 whitespace-nowrap tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
            >
              Annes Bible Space
            </motion.h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="mt-20 font-cormorant-sc text-xs uppercase tracking-[0.3em] text-purple-300/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 1 }}
          >
            A place of peace
          </motion.p>

          {/* Verse reveal */}
          <AnimatePresence>
            {phase === "verse" && (
              <motion.div
                className="absolute bottom-24 sm:bottom-32 left-0 right-0 px-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <p className="font-cormorant text-lg sm:text-xl text-purple-200/70 italic leading-relaxed max-w-md mx-auto">
                  &ldquo;Be still, and know that I am God.&rdquo;
                </p>
                <p className="font-cormorant-sc text-xs text-purple-300/40 mt-3 uppercase tracking-widest">
                  Psalm 46:10
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Light burst on exit */}
          <AnimatePresence>
            {phase === "exit" && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(196, 168, 236, 0.3), transparent 60%)",
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 3 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>
        </motion.div>
    </AnimatePresence>
  );
}
