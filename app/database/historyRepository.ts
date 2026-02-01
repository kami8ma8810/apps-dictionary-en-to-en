import { db } from './db'
import type { SearchHistoryEntry } from '~/types/history'

const historyRepository = {
  async add(word: string): Promise<number> {
    const existing = await db.searchHistory.where('word').equals(word).first()

    if (existing) {
      await db.searchHistory.update(existing.id!, {
        searchedAt: new Date()
      })
      return existing.id!
    }

    return db.searchHistory.add({
      word,
      searchedAt: new Date()
    })
  },

  async getRecent(limit: number): Promise<SearchHistoryEntry[]> {
    return db.searchHistory
      .orderBy('searchedAt')
      .reverse()
      .limit(limit)
      .toArray()
  },

  async remove(id: number): Promise<void> {
    await db.searchHistory.delete(id)
  },

  async clear(): Promise<void> {
    await db.searchHistory.clear()
  },

  async search(prefix: string): Promise<SearchHistoryEntry[]> {
    const lowerPrefix = prefix.toLowerCase()
    return db.searchHistory
      .filter(entry => entry.word.toLowerCase().startsWith(lowerPrefix))
      .toArray()
  }
}

export { historyRepository }
