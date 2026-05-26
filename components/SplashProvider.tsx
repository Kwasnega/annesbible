"use client";

import { useState, useEffect } from "react";
import { SplashScreen } from "./SplashScreen";

export function SplashProvider({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);
  const [ready, setReady] = useState(false);

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
  };

  if (!ready) {
    return (
      <div className="fixed inset-0" style={{ background: "#0D0A14" }} />
    );
  }

  return (
    <>
      {children}
      {showSplash && <SplashScreen onComplete={handleComplete} />}
    </>
  );
}
