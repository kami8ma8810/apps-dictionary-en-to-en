import Dexie from 'dexie'
import type { Table } from 'dexie'
import type { BookmarkedWord, Folder } from '~/types/bookmark'
import type { SearchHistoryEntry } from '~/types/history'

class DictionaryDatabase extends Dexie {
  bookmarks!: Table<BookmarkedWord, number>
  folders!: Table<Folder, number>
  searchHistory!: Table<SearchHistoryEntry, number>

  constructor() {
    super('DictionaryDB')

    this.version(1).stores({
      bookmarks: '++id, &word, *folderIds, createdAt',
      folders: '++id, &name, order',
      searchHistory: '++id, word, searchedAt'
    })
  }
}

const db = new DictionaryDatabase()

export { db, DictionaryDatabase }
