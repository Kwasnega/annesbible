"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIStore {
  sidebarOpen: boolean;
  fontSize: "sm" | "md" | "lg" | "xl";
  isLocked: boolean;
  pinEnabled: boolean;
  setSidebarOpen: (open: boolean) => void;
  setFontSize: (size: "sm" | "md" | "lg" | "xl") => void;
  setLocked: (val: boolean) => void;
  setPinEnabled: (val: boolean) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      sidebarOpen: false,
      fontSize: "md",
      isLocked: true,
      pinEnabled: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setFontSize: (size) => set({ fontSize: size }),
      setLocked: (val) => set({ isLocked: val }),
      setPinEnabled: (val) => set({ pinEnabled: val, isLocked: val }),
    }),
    { name: "anne-ui-store" }
  )
);
