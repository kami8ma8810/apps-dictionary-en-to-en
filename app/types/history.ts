/** A single search history entry */
interface SearchHistoryEntry {
  id?: number
  word: string
  searchedAt: Date
}

export type { SearchHistoryEntry }
