# Annes Bible Space

A deeply personal, peaceful spiritual web app for Bible reading, journaling, mood reflection, and worship — built for Anne.

## Features

- **Bible Reader** — Browse all 66 books, pick any chapter, read the full KJV text with elegant typography
- **Verse Highlighting** — Tap any verse to highlight in Gold, Lavender, or Rose
- **Saved Verses** — Collect and manage your favorite passages
- **Search** — Find verses by keyword or reference (e.g., "John 3:16")
- **Mood System** — Select how you're feeling (sad, anxious, tired, confused, grateful, peaceful) and receive curated comforting verses
- **Journal** — Write rich-text spiritual reflections with mood tags
- **Worship Space** — Ambient sounds (rain, piano, nature) + Spotify worship playlists
- **PIN Lock** — Protect your journal and saved verses
- **Daily Verse** — A fresh verse every day on the home screen
- **Reading Position Memory** — Picks up right where you left off

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** TailwindCSS v4 + custom CSS variables
- **Animation:** Framer Motion
- **State:** Zustand (persisted to localStorage)
- **Fonts:** Cormorant Garamond, Cormorant SC, DM Sans (Google Fonts)
- **Bible Data:** Local KJV JSON (~31k verses), fully offline

## Mobile Optimized

Built mobile-first with:
- Minimum 44px touch targets everywhere
- Bottom navigation bar for one-handed use
- iOS safe-area support (notch-aware)
- No zoom on input focus
- Smooth scroll and pull-to-refresh prevention
- Active states for all touch interactions

## Database

The app works **fully offline** with local KJV data and Zustand state persisted to localStorage.

If you want to add Supabase for cloud sync later:
1. Create a `.env.local` from `.env.example`
2. Add your Supabase URL and anon key
3. The schema and queries are ready in `lib/supabase/`

## Deploy to Vercel

1. Push this repo to GitHub
2. Import into [Vercel](https://vercel.com/new)
3. Add environment variables if using Supabase
4. Deploy — zero config needed

## Local Development

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Build

```bash
npm run build
```
