import type { DictionaryResult } from './dictionary'

/** Abstract interface for dictionary data sources */
interface DictionaryService {
  /** Search for a word and return its dictionary entries */
  search(word: string): Promise<DictionaryResult>
}

export type { DictionaryService }
