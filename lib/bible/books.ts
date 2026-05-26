export interface Book {
  id: number;
  name: string;
  shortName: string;
  abbrev: string;
  testament: "OT" | "NT";
  chapters: number;
}

export const BOOKS: Book[] = [
  { id: 1, name: "Genesis", shortName: "Gen", abbrev: "gn", testament: "OT", chapters: 50 },
  { id: 2, name: "Exodus", shortName: "Exo", abbrev: "ex", testament: "OT", chapters: 40 },
  { id: 3, name: "Leviticus", shortName: "Lev", abbrev: "lv", testament: "OT", chapters: 27 },
  { id: 4, name: "Numbers", shortName: "Num", abbrev: "nm", testament: "OT", chapters: 36 },
  { id: 5, name: "Deuteronomy", shortName: "Deu", abbrev: "dt", testament: "OT", chapters: 34 },
  { id: 6, name: "Joshua", shortName: "Jos", abbrev: "js", testament: "OT", chapters: 24 },
  { id: 7, name: "Judges", shortName: "Jdg", abbrev: "jud", testament: "OT", chapters: 21 },
  { id: 8, name: "Ruth", shortName: "Rth", abbrev: "rt", testament: "OT", chapters: 4 },
  { id: 9, name: "1 Samuel", shortName: "1Sa", abbrev: "1s", testament: "OT", chapters: 31 },
  { id: 10, name: "2 Samuel", shortName: "2Sa", abbrev: "2s", testament: "OT", chapters: 24 },
  { id: 11, name: "1 Kings", shortName: "1Ki", abbrev: "1k", testament: "OT", chapters: 22 },
  { id: 12, name: "2 Kings", shortName: "2Ki", abbrev: "2k", testament: "OT", chapters: 25 },
  { id: 13, name: "1 Chronicles", shortName: "1Ch", abbrev: "1ch", testament: "OT", chapters: 29 },
  { id: 14, name: "2 Chronicles", shortName: "2Ch", abbrev: "2ch", testament: "OT", chapters: 36 },
  { id: 15, name: "Ezra", shortName: "Ezr", abbrev: "ezr", testament: "OT", chapters: 10 },
  { id: 16, name: "Nehemiah", shortName: "Neh", abbrev: "ne", testament: "OT", chapters: 13 },
  { id: 17, name: "Esther", shortName: "Est", abbrev: "et", testament: "OT", chapters: 10 },
  { id: 18, name: "Job", shortName: "Job", abbrev: "job", testament: "OT", chapters: 42 },
  { id: 19, name: "Psalms", shortName: "Psa", abbrev: "ps", testament: "OT", chapters: 150 },
  { id: 20, name: "Proverbs", shortName: "Pro", abbrev: "pr", testament: "OT", chapters: 31 },
  { id: 21, name: "Ecclesiastes", shortName: "Ecc", abbrev: "ec", testament: "OT", chapters: 12 },
  { id: 22, name: "Song of Solomon", shortName: "Sos", abbrev: "so", testament: "OT", chapters: 8 },
  { id: 23, name: "Isaiah", shortName: "Isa", abbrev: "is", testament: "OT", chapters: 66 },
  { id: 24, name: "Jeremiah", shortName: "Jer", abbrev: "jr", testament: "OT", chapters: 52 },
  { id: 25, name: "Lamentations", shortName: "Lam", abbrev: "lm", testament: "OT", chapters: 5 },
  { id: 26, name: "Ezekiel", shortName: "Eze", abbrev: "ez", testament: "OT", chapters: 48 },
  { id: 27, name: "Daniel", shortName: "Dan", abbrev: "dn", testament: "OT", chapters: 12 },
  { id: 28, name: "Hosea", shortName: "Hos", abbrev: "hs", testament: "OT", chapters: 14 },
  { id: 29, name: "Joel", shortName: "Joe", abbrev: "jl", testament: "OT", chapters: 3 },
  { id: 30, name: "Amos", shortName: "Amo", abbrev: "am", testament: "OT", chapters: 9 },
  { id: 31, name: "Obadiah", shortName: "Oba", abbrev: "ob", testament: "OT", chapters: 1 },
  { id: 32, name: "Jonah", shortName: "Jon", abbrev: "jn", testament: "OT", chapters: 4 },
  { id: 33, name: "Micah", shortName: "Mic", abbrev: "mc", testament: "OT", chapters: 7 },
  { id: 34, name: "Nahum", shortName: "Nah", abbrev: "na", testament: "OT", chapters: 3 },
  { id: 35, name: "Habakkuk", shortName: "Hab", abbrev: "hk", testament: "OT", chapters: 3 },
  { id: 36, name: "Zephaniah", shortName: "Zep", abbrev: "zp", testament: "OT", chapters: 3 },
  { id: 37, name: "Haggai", shortName: "Hag", abbrev: "hg", testament: "OT", chapters: 2 },
  { id: 38, name: "Zechariah", shortName: "Zec", abbrev: "zc", testament: "OT", chapters: 14 },
  { id: 39, name: "Malachi", shortName: "Mal", abbrev: "ml", testament: "OT", chapters: 4 },
  { id: 40, name: "Matthew", shortName: "Mat", abbrev: "mt", testament: "NT", chapters: 28 },
  { id: 41, name: "Mark", shortName: "Mar", abbrev: "mk", testament: "NT", chapters: 16 },
  { id: 42, name: "Luke", shortName: "Luk", abbrev: "lk", testament: "NT", chapters: 24 },
  { id: 43, name: "John", shortName: "Joh", abbrev: "jo", testament: "NT", chapters: 21 },
  { id: 44, name: "Acts", shortName: "Act", abbrev: "act", testament: "NT", chapters: 28 },
  { id: 45, name: "Romans", shortName: "Rom", abbrev: "rm", testament: "NT", chapters: 16 },
  { id: 46, name: "1 Corinthians", shortName: "1Co", abbrev: "1co", testament: "NT", chapters: 16 },
  { id: 47, name: "2 Corinthians", shortName: "2Co", abbrev: "2co", testament: "NT", chapters: 13 },
  { id: 48, name: "Galatians", shortName: "Gal", abbrev: "gl", testament: "NT", chapters: 6 },
  { id: 49, name: "Ephesians", shortName: "Eph", abbrev: "eph", testament: "NT", chapters: 6 },
  { id: 50, name: "Philippians", shortName: "Php", abbrev: "ph", testament: "NT", chapters: 4 },
  { id: 51, name: "Colossians", shortName: "Col", abbrev: "col", testament: "NT", chapters: 4 },
  { id: 52, name: "1 Thessalonians", shortName: "1Th", abbrev: "1th", testament: "NT", chapters: 5 },
  { id: 53, name: "2 Thessalonians", shortName: "2Th", abbrev: "2th", testament: "NT", chapters: 3 },
  { id: 54, name: "1 Timothy", shortName: "1Ti", abbrev: "1ti", testament: "NT", chapters: 6 },
  { id: 55, name: "2 Timothy", shortName: "2Ti", abbrev: "2ti", testament: "NT", chapters: 4 },
  { id: 56, name: "Titus", shortName: "Tit", abbrev: "tt", testament: "NT", chapters: 3 },
  { id: 57, name: "Philemon", shortName: "Phm", abbrev: "fm", testament: "NT", chapters: 1 },
  { id: 58, name: "Hebrews", shortName: "Heb", abbrev: "hb", testament: "NT", chapters: 13 },
  { id: 59, name: "James", shortName: "Jam", abbrev: "jm", testament: "NT", chapters: 5 },
  { id: 60, name: "1 Peter", shortName: "1Pe", abbrev: "1p", testament: "NT", chapters: 5 },
  { id: 61, name: "2 Peter", shortName: "2Pe", abbrev: "2p", testament: "NT", chapters: 3 },
  { id: 62, name: "1 John", shortName: "1Jo", abbrev: "1jo", testament: "NT", chapters: 5 },
  { id: 63, name: "2 John", shortName: "2Jo", abbrev: "2jo", testament: "NT", chapters: 1 },
  { id: 64, name: "3 John", shortName: "3Jo", abbrev: "3jo", testament: "NT", chapters: 1 },
  { id: 65, name: "Jude", shortName: "Jud", abbrev: "jd", testament: "NT", chapters: 1 },
  { id: 66, name: "Revelation", shortName: "Rev", abbrev: "rv", testament: "NT", chapters: 22 },
];

export const OT_BOOKS = BOOKS.filter((b) => b.testament === "OT");
export const NT_BOOKS = BOOKS.filter((b) => b.testament === "NT");

export function getBookById(id: number): Book | undefined {
  return BOOKS.find((b) => b.id === id);
}

export function getBookBySlug(slug: string): Book | undefined {
  return BOOKS.find(
    (b) =>
      b.name.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase() ||
      b.abbrev.toLowerCase() === slug.toLowerCase()
  );
}
