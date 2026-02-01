import { db } from './db'
import type { BookmarkedWord } from '~/types/bookmark'

const bookmarkRepository = {
  async add(word: string): Promise<number> {
    return db.bookmarks.add({
      word,
      folderIds: [],
      createdAt: new Date()
    })
  },

  async remove(word: string): Promise<void> {
    await db.bookmarks.where('word').equals(word).delete()
  },

  async isBookmarked(word: string): Promise<boolean> {
    const count = await db.bookmarks.where('word').equals(word).count()
    return count > 0
  },

  async getAll(): Promise<BookmarkedWord[]> {
    return db.bookmarks.orderBy('createdAt').reverse().toArray()
  },

  async getByFolder(folderId: number): Promise<BookmarkedWord[]> {
    return db.bookmarks
      .where('folderIds')
      .equals(folderId)
      .toArray()
  },

  async assignFolder(bookmarkId: number, folderId: number): Promise<void> {
    const bookmark = await db.bookmarks.get(bookmarkId)
    if (!bookmark) return

    if (!bookmark.folderIds.includes(folderId)) {
      await db.bookmarks.update(bookmarkId, {
        folderIds: [...bookmark.folderIds, folderId]
      })
    }
  },

  async removeFolder(bookmarkId: number, folderId: number): Promise<void> {
    const bookmark = await db.bookmarks.get(bookmarkId)
    if (!bookmark) return

    await db.bookmarks.update(bookmarkId, {
      folderIds: bookmark.folderIds.filter(id => id !== folderId)
    })
  }
}

export { bookmarkRepository }
