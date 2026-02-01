import { ref } from 'vue'
import { defineStore } from 'pinia'
import { bookmarkRepository } from '~/database/bookmarkRepository'
import type { BookmarkedWord } from '~/types/bookmark'

const useBookmarkStore = defineStore('bookmark', () => {
  const bookmarks = ref<BookmarkedWord[]>([])

  async function loadAll() {
    bookmarks.value = await bookmarkRepository.getAll()
  }

  async function add(word: string) {
    await bookmarkRepository.add(word)
  }

  async function remove(word: string) {
    await bookmarkRepository.remove(word)
  }

  async function isBookmarked(word: string): Promise<boolean> {
    return bookmarkRepository.isBookmarked(word)
  }

  async function toggle(word: string) {
    const bookmarked = await isBookmarked(word)
    if (bookmarked) {
      await remove(word)
    } else {
      await add(word)
    }
  }

  async function assignFolder(bookmarkId: number, folderId: number) {
    await bookmarkRepository.assignFolder(bookmarkId, folderId)
  }

  async function removeFolder(bookmarkId: number, folderId: number) {
    await bookmarkRepository.removeFolder(bookmarkId, folderId)
  }

  return {
    bookmarks,
    loadAll,
    add,
    remove,
    isBookmarked,
    toggle,
    assignFolder,
    removeFolder
  }
})

export { useBookmarkStore }
