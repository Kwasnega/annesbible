"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { SplashScreen } from "./SplashScreen";

export function SplashProvider({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const seen = localStorage.getItem("annes-splash-seen");
    if (seen) {
      setShowSplash(false);
    }
    setReady(true);
  }, []);

  const handleComplete = () => {
    localStorage.setItem("annes-splash-seen", "true");
    setShowSplash(false);
    // After first-time splash, ensure user lands on home page
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      router.replace("/");
    }
  };

  if (!ready) {
    return (
      <div className="fixed inset-0 z-[200]" style={{ background: "#0D0A14" }} />
    );
  }

  return (
    <>
      {children}
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen onComplete={handleComplete} />}
      </AnimatePresence>
    </>
  );
}
