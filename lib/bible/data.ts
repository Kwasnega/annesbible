import kjvData from "@/data/kjv.json";
import { BOOKS, type Book } from "./books";

interface KjvBook {
  abbrev: string;
  chapters: string[][];
}

const data = kjvData as KjvBook[];

export interface Verse {
  id: number;
  bookId: number;
  bookName: string;
  chapter: number;
  verseNum: number;
  text: string;
}

let verseIdCounter = 1;
const verseMap = new Map<number, Verse>();
const versesByBookChapter = new Map<string, Verse[]>();

export function getAllVerses(): Verse[] {
  const verses: Verse[] = [];
  data.forEach((bookData, bookIndex) => {
    const book = BOOKS[bookIndex];
    if (!book) return;
    bookData.chapters.forEach((chapterVerses, chapterIndex) => {
      const chapter = chapterIndex + 1;
      chapterVerses.forEach((text, verseIndex) => {
        const verseNum = verseIndex + 1;
        const verse: Verse = {
          id: verseIdCounter++,
          bookId: book.id,
          bookName: book.name,
          chapter,
          verseNum,
          text: text.replace(/\{[^}]*\}/g, "").trim(),
        };
        verses.push(verse);
        verseMap.set(verse.id, verse);
        const key = `${book.id}-${chapter}`;
        if (!versesByBookChapter.has(key)) {
          versesByBookChapter.set(key, []);
        }
        versesByBookChapter.get(key)!.push(verse);
      });
    });
  });
  return verses;
}

export function getVersesForChapter(bookId: number, chapter: number): Verse[] {
  const key = `${bookId}-${chapter}`;
  if (!versesByBookChapter.has(key)) {
    const bookData = data[bookId - 1];
    const book = BOOKS[bookId - 1];
    if (!bookData || !book || !bookData.chapters[chapter - 1]) return [];
    const verses: Verse[] = [];
    bookData.chapters[chapter - 1].forEach((text, i) => {
      const verse: Verse = {
        id: verseIdCounter++,
        bookId,
        bookName: book.name,
        chapter,
        verseNum: i + 1,
        text: text.replace(/\{[^}]*\}/g, "").trim(),
      };
      verses.push(verse);
      verseMap.set(verse.id, verse);
    });
    versesByBookChapter.set(key, verses);
    return verses;
  }
  return versesByBookChapter.get(key)!;
}

export function searchVerses(query: string): Verse[] {
  const q = query.toLowerCase();
  const all: Verse[] = [];
  data.forEach((bookData, bookIndex) => {
    const book = BOOKS[bookIndex];
    if (!book) return;
    bookData.chapters.forEach((chapterVerses, chapterIndex) => {
      const chapter = chapterIndex + 1;
      chapterVerses.forEach((text, verseIndex) => {
        const cleanText = text.replace(/\{[^}]*\}/g, "").trim();
        if (cleanText.toLowerCase().includes(q)) {
          all.push({
            id: 0,
            bookId: book.id,
            bookName: book.name,
            chapter,
            verseNum: verseIndex + 1,
            text: cleanText,
          });
        }
      });
    });
  });
  return all.slice(0, 20);
}

export function parseReference(input: string): { book: Book; chapter: number; verse: number } | null {
  const normalized = input.trim().toLowerCase();
  for (const book of BOOKS) {
    const nameLower = book.name.toLowerCase();
    const shortLower = book.shortName.toLowerCase();
    const abbrevLower = book.abbrev.toLowerCase();
    if (
      normalized.startsWith(nameLower + " ") ||
      normalized.startsWith(shortLower + " ") ||
      normalized.startsWith(abbrevLower + " ") ||
      normalized.startsWith(book.name.toLowerCase().replace(/\s+/g, "") + " ")
    ) {
      const afterBook = normalized
        .substring(normalized.indexOf(" ") + 1)
        .trim();
      const parts = afterBook.split(/[:\s]+/);
      const chapter = parseInt(parts[0], 10);
      const verse = parts[1] ? parseInt(parts[1], 10) : 1;
      if (!isNaN(chapter) && chapter > 0 && chapter <= book.chapters) {
        return { book, chapter, verse: isNaN(verse) ? 1 : verse };
      }
    }
  }
  return null;
}
