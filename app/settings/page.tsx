"use client";

import { useState } from "react";
import { useUIStore } from "@/lib/store/useUIStore";
import { GlassCard } from "@/components/ui/GlassCard";
import { Lock, Unlock, Moon, Sun, Type } from "lucide-react";

export default function SettingsPage() {
  const { pinEnabled, setPinEnabled, fontSize, setFontSize } = useUIStore();
  const [pinInput, setPinInput] = useState("");
  const [showPinInput, setShowPinInput] = useState(false);

  const handleTogglePin = () => {
    if (!pinEnabled) {
      setShowPinInput(true);
    } else {
      setPinEnabled(false);
    }
  };

  const handleSetPin = () => {
    if (pinInput.length === 4) {
      setPinEnabled(true);
      setShowPinInput(false);
      setPinInput("");
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto space-y-8">
      <header>
        <h1 className="font-cormorant text-3xl md:text-4xl font-light text-purple-100">Settings</h1>
      </header>

      <GlassCard className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {pinEnabled ? <Lock className="w-5 h-5 text-purple-300/50" /> : <Unlock className="w-5 h-5 text-purple-300/50" />}
            <div>
              <p className="text-purple-100 font-medium text-sm">Lock Journal & Saved Verses</p>
              <p className="text-purple-200/30 text-xs">Require PIN to access private content</p>
            </div>
          </div>
          <button
            onClick={handleTogglePin}
            className={`relative w-14 h-8 rounded-full transition-all duration-300 shrink-0 ${
              pinEnabled ? "bg-purple-600" : "bg-purple-800/30"
            }`}
          >
            <div
              className={`absolute top-1 w-6 h-6 rounded-full bg-purple-100 transition-all duration-300 ${
                pinEnabled ? "left-7" : "left-1"
              }`}
            />
          </button>
        </div>

        {showPinInput && (
          <div className="space-y-3 pt-4 border-t border-glass-border">
            <p className="text-sm text-purple-200/50">Enter a 4-digit PIN</p>
            <div className="flex gap-2">
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  type="password"
                  maxLength={1}
                  value={pinInput[i] || ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/\d/.test(val)) {
                      const next = pinInput.substring(0, i) + val + pinInput.substring(i + 1);
                      setPinInput(next.substring(0, 4));
                      if (i < 3 && val) {
                        const nextInput = e.target.parentElement?.querySelectorAll("input")[i + 1] as HTMLInputElement;
                        nextInput?.focus();
                      }
                    }
                  }}
                  className="w-14 h-16 text-center text-2xl bg-bg-surface/60 border border-purple-700/30 rounded-xl text-purple-100 focus:outline-none focus:border-purple-500/50"
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { setShowPinInput(false); setPinInput(""); }}
                className="flex-1 py-3 rounded-xl text-sm text-purple-300/60 hover:text-purple-200 transition-colors min-h-[48px]"
              >
                Cancel
              </button>
              <button
                onClick={handleSetPin}
                disabled={pinInput.length !== 4}
                className="flex-1 py-3 rounded-xl bg-purple-600 text-purple-100 hover:bg-purple-500 transition-all text-sm disabled:opacity-50 min-h-[48px]"
              >
                Set PIN
              </button>
            </div>
          </div>
        )}
      </GlassCard>

      <GlassCard className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Type className="w-5 h-5 text-purple-300/50" />
          <div>
            <p className="text-purple-100 font-medium text-sm">Reading Font Size</p>
            <p className="text-purple-200/30 text-xs">Adjust text size in the Bible reader</p>
          </div>
        </div>
        <div className="flex gap-2">
          {(["sm", "md", "lg", "xl"] as const).map((size) => (
            <button
              key={size}
              onClick={() => setFontSize(size)}
              className={`flex-1 py-2 rounded-xl text-sm transition-all ${
                fontSize === size
                  ? "bg-purple-600 text-purple-100"
                  : "bg-purple-800/20 text-purple-300/60 hover:text-purple-200"
              }`}
            >
              {size.toUpperCase()}
            </button>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
