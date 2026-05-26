"use client";

import { useState, useRef } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedContainer, AnimatedItem } from "@/components/ui/AnimatedContainer";
import { CloudRain, Piano, Trees, Volume2 } from "lucide-react";

const AMBIENT_TRACKS = [
  { key: "rain", label: "Rain", emoji: "🌧", icon: CloudRain },
  { key: "piano", label: "Piano", emoji: "🎹", icon: Piano },
  { key: "nature", label: "Nature", emoji: "🌿", icon: Trees },
];

const PLAYLISTS = [
  {
    title: "Peaceful Worship",
    embed: "https://open.spotify.com/embed/playlist/37i9dQZF1DX3pip0etl8nP",
  },
  {
    title: "Hillsong Acoustic",
    embed: "https://open.spotify.com/embed/playlist/37i9dQZF1DX0yEZ9NE9",
  },
];

export default function WorshipPage() {
  const [activeSounds, setActiveSounds] = useState<Record<string, boolean>>({});
  const [volumes, setVolumes] = useState<Record<string, number>>({ rain: 0.5, piano: 0.5, nature: 0.5 });
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});

  const toggleSound = (key: string) => {
    const isActive = !activeSounds[key];
    setActiveSounds((prev) => ({ ...prev, [key]: isActive }));

    let audio = audioRefs.current[key];
    if (!audio) {
      audio = new Audio(`/sounds/${key}.mp3`);
      audio.loop = true;
      audio.volume = volumes[key] || 0.5;
      audioRefs.current[key] = audio;
    }

    if (isActive) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  const setVolume = (key: string, vol: number) => {
    setVolumes((prev) => ({ ...prev, [key]: vol }));
    const audio = audioRefs.current[key];
    if (audio) audio.volume = vol;
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-10">
      <header className="space-y-2">
        <h1 className="font-cormorant text-3xl md:text-4xl font-light text-purple-100">Worship Space</h1>
        <p className="text-purple-200/40 text-sm">Ambient sounds and worship playlists</p>
      </header>

      {/* Ambient Sounds */}
      <section className="space-y-4">
        <h2 className="font-cormorant-sc text-xs uppercase tracking-[0.2em] text-purple-300/50">
          Ambient Sounds
        </h2>
        <AnimatedContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4" stagger={0.08}>
          {AMBIENT_TRACKS.map((track) => {
            const isActive = activeSounds[track.key];
            const Icon = track.icon;
            return (
              <AnimatedItem key={track.key}>
              <GlassCard
                className={`p-6 text-center transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                  isActive ? "border-purple-400/40 shadow-[0_0_30px_rgba(124,92,191,0.15)]" : ""
                }`}
                onClick={() => toggleSound(track.key)}
              >
                <div
                  className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "bg-purple-600/30 ring-2 ring-purple-400/50 shadow-[0_0_20px_rgba(124,92,191,0.3)]"
                      : "bg-purple-800/20"
                  }`}
                >
                  <Icon className={`w-7 h-7 ${isActive ? "text-purple-300" : "text-purple-300/40"}`} />
                </div>
                <p className="font-cormorant-sc text-lg text-purple-100">{track.label}</p>
                {isActive && (
                  <div className="mt-4 flex items-center gap-3">
                    <Volume2 className="w-4 h-4 text-purple-300/40" />
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={volumes[track.key] || 0.5}
                      onChange={(e) => setVolume(track.key, parseFloat(e.target.value))}
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 h-1 rounded-full appearance-none bg-purple-800/40 accent-purple-400 cursor-pointer"
                    />
                  </div>
                )}
              </GlassCard>
              </AnimatedItem>
            );
          })}
        </AnimatedContainer>
      </section>

      {/* Playlists */}
      <section className="space-y-4">
        <h2 className="font-cormorant-sc text-xs uppercase tracking-[0.2em] text-purple-300/50">
          Worship Playlists
        </h2>
        <div className="grid gap-4">
          {PLAYLISTS.map((pl) => (
            <GlassCard key={pl.title} className="p-4 overflow-hidden">
              <p className="font-cormorant text-lg text-purple-100 mb-3">{pl.title}</p>
              <iframe
                src={pl.embed}
                width="100%"
                height="152"
                allow="encrypted-media"
                className="rounded-xl"
                style={{ border: "none" }}
              />
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
