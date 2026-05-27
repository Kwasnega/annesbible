"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedContainer, AnimatedItem } from "@/components/ui/AnimatedContainer";
import { CloudRain, Piano, Trees, Play, Pause, Music } from "lucide-react";
import { motion } from "framer-motion";

interface AmbientTrack {
  key: string;
  label: string;
  emoji: string;
  icon: React.ElementType;
  youtubeId: string;
}

const AMBIENT_TRACKS: AmbientTrack[] = [
  { key: "rain", label: "Rain", emoji: "🌧", icon: CloudRain, youtubeId: "jX6kn9_U8qk" },
  { key: "piano", label: "Piano", emoji: "🎹", icon: Piano, youtubeId: "EbnH3VHzhu8" },
  { key: "nature", label: "Nature", emoji: "🌿", icon: Trees, youtubeId: "Qm846KdZN_c" },
];

const PLAYLISTS = [
  {
    title: "Peaceful Worship",
    embed: "https://open.spotify.com/embed/playlist/37i9dQZF1DX9lAYMw7KoAO",
    url: "https://open.spotify.com/playlist/37i9dQZF1DX9lAYMw7KoAO",
  },
  {
    title: "Hillsong Acoustic",
    embed: "https://open.spotify.com/embed/playlist/17tw7L3cHFF9FcsFuiTcJA",
    url: "https://open.spotify.com/playlist/17tw7L3cHFF9FcsFuiTcJA",
  },
];

export default function WorshipPage() {
  const [activeSounds, setActiveSounds] = useState<Record<string, boolean>>({});

  const toggleSound = (key: string) => {
    setActiveSounds((prev) => ({ ...prev, [key]: !prev[key] }));
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
                <div className="space-y-3">
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
                      {isActive ? (
                        <Pause className="w-7 h-7 text-purple-300" />
                      ) : (
                        <Icon className="w-7 h-7 text-purple-300/40" />
                      )}
                    </div>
                    <p className="font-cormorant-sc text-lg text-purple-100">{track.label}</p>
                    <p className="text-xs text-purple-300/40 mt-1">{isActive ? "Playing" : "Tap to play"}</p>
                  </GlassCard>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden rounded-xl"
                    >
                      <iframe
                        width="100%"
                        height="200"
                        src={`https://www.youtube.com/embed/${track.youtubeId}?autoplay=1&loop=1&playlist=${track.youtubeId}&rel=0&modestbranding=1&playsinline=1`}
                        title={`${track.label} ambient sound`}
                        allow="autoplay; encrypted-media"
                        className="rounded-xl"
                        style={{ border: "none" }}
                      />
                    </motion.div>
                  )}
                </div>
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
              <a
                href={pl.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-xs text-purple-300/50 hover:text-purple-300 transition-colors active:opacity-60"
              >
                <Music className="w-3 h-3" />
                Open in Spotify
              </a>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
