export interface MoodVerse {
  ref: string;
  text: string;
}

export const MOOD_VERSES: Record<string, MoodVerse[]> = {
  sad: [
    { ref: "Psalm 34:18", text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit." },
    { ref: "Matthew 5:4", text: "Blessed are those who mourn, for they will be comforted." },
    { ref: "Psalm 30:5", text: "Weeping may stay for the night, but rejoicing comes in the morning." },
    { ref: "Psalm 147:3", text: "He heals the brokenhearted and binds up their wounds." },
    { ref: "Revelation 21:4", text: "He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain." },
    { ref: "Isaiah 41:10", text: "Do not fear, for I am with you; do not be dismayed, for I am your God." },
  ],
  anxious: [
    { ref: "Philippians 4:6-7", text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God." },
    { ref: "Matthew 6:34", text: "Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own." },
    { ref: "1 Peter 5:7", text: "Cast all your anxiety on him because he cares for you." },
    { ref: "Isaiah 26:3", text: "You will keep in perfect peace those whose minds are steadfast, because they trust in you." },
    { ref: "John 14:27", text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled." },
    { ref: "Psalm 55:22", text: "Cast your cares on the Lord and he will sustain you; he will never let the righteous be shaken." },
  ],
  tired: [
    { ref: "Matthew 11:28", text: "Come to me, all you who are weary and burdened, and I will give you rest." },
    { ref: "Isaiah 40:31", text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles." },
    { ref: "Psalm 62:1", text: "Truly my soul finds rest in God; my salvation comes from him." },
    { ref: "Exodus 33:14", text: "The Lord replied, My presence will go with you, and I will give you rest." },
    { ref: "Psalm 23:2-3", text: "He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul." },
  ],
  confused: [
    { ref: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight." },
    { ref: "James 1:5", text: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault." },
    { ref: "Isaiah 42:16", text: "I will lead the blind by ways they have not known, along unfamiliar paths I will guide them." },
    { ref: "Psalm 32:8", text: "I will instruct you and teach you in the way you should go; I will counsel you with my loving eye on you." },
    { ref: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him." },
  ],
  grateful: [
    { ref: "Psalm 100:4-5", text: "Enter his gates with thanksgiving and his courts with praise; give thanks to him and praise his name." },
    { ref: "1 Thessalonians 5:18", text: "Give thanks in all circumstances; for this is God's will for you in Christ Jesus." },
    { ref: "Psalm 107:1", text: "Give thanks to the Lord, for he is good; his love endures forever." },
    { ref: "Colossians 3:17", text: "And whatever you do, whether in word or deed, do it all in the name of the Lord Jesus, giving thanks to God the Father through him." },
    { ref: "Psalm 136:1", text: "Give thanks to the Lord, for he is good. His love endures forever." },
  ],
  peaceful: [
    { ref: "John 14:27", text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled." },
    { ref: "Philippians 4:7", text: "And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus." },
    { ref: "Psalm 29:11", text: "The Lord gives strength to his people; the Lord blesses his people with peace." },
    { ref: "Colossians 3:15", text: "Let the peace of Christ rule in your hearts." },
    { ref: "Romans 15:13", text: "May the God of hope fill you with all joy and peace as you trust in him." },
  ],
};

export const MOODS = [
  { key: "sad", label: "Sad", emoji: "😔", color: "#C47A8A" },
  { key: "anxious", label: "Anxious", emoji: "😰", color: "#7B8EC7" },
  { key: "tired", label: "Tired", emoji: "😴", color: "#B8924A" },
  { key: "confused", label: "Confused", emoji: "🌀", color: "#B8A4D8" },
  { key: "grateful", label: "Grateful", emoji: "🙏", color: "#5A9E9A" },
  { key: "peaceful", label: "Peaceful", emoji: "✨", color: "#A07FD6" },
] as const;
