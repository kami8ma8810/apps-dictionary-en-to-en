/** Free Dictionary API - phonetic entry */
interface Phonetic {
  text?: string
  audio: string
  sourceUrl?: string
  license?: License
}

/** Free Dictionary API - single definition within a meaning */
interface Definition {
  definition: string
  synonyms: string[]
  antonyms: string[]
  example?: string
}

/** Free Dictionary API - meaning grouped by part of speech */
interface Meaning {
  partOfSpeech: string
  definitions: Definition[]
  synonyms: string[]
  antonyms: string[]
}

/** Free Dictionary API - license information */
interface License {
  name: string
  url: string
}

/** Free Dictionary API - single word entry */
interface DictionaryEntry {
  word: string
  phonetics: Phonetic[]
  meanings: Meaning[]
  license: License
  sourceUrls: string[]
}

/** Wrapper for API results */
interface DictionaryResult {
  entries: DictionaryEntry[]
  word: string
}

/** Free Dictionary API - error response */
interface DictionaryApiError {
  title: string
  message: string
  resolution: string
}

export type {
  Phonetic,
  Definition,
  Meaning,
  License,
  DictionaryEntry,
  DictionaryResult,
  DictionaryApiError
}
