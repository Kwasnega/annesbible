"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SplashScreen } from "./SplashScreen";

export function SplashProvider({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);
  const [appVisible, setAppVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("annes-splash-seen");
    if (seen) {
      setShowSplash(false);
      setAppVisible(true);
    }
    setReady(true);
  }, []);

  const handleComplete = () => {
    localStorage.setItem("annes-splash-seen", "true");
    setShowSplash(false);
  };

  useEffect(() => {
    if (!showSplash && !appVisible) {
      // Small delay so app fades in as splash light burst expands
      const t = setTimeout(() => setAppVisible(true), 200);
      return () => clearTimeout(t);
    }
  }, [showSplash, appVisible]);

  if (!ready) {
    return <div className="fixed inset-0" style={{ background: "#0D0A14" }} />;
  }

  return (
    <>
      <motion.div
        initial={false}
        animate={{
          opacity: appVisible ? 1 : 0,
          scale: appVisible ? 1 : 0.97,
        }}
        transition={{ duration: 1, ease: "easeOut", delay: appVisible ? 0.3 : 0 }}
        className="contents"
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {showSplash && (
          <SplashScreen
            onComplete={handleComplete}
          />
        )}
      </AnimatePresence>
    </>
  );
}
