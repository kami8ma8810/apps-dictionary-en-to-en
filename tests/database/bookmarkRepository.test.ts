import { describe, it, expect, beforeEach } from 'vitest'
import { bookmarkRepository } from '~/database/bookmarkRepository'
import { db } from '~/database/db'

describe('bookmarkRepository', () => {
  beforeEach(async () => {
    await db.bookmarks.clear()
  })

  describe('add', () => {
    it('should add a bookmarked word', async () => {
      const id = await bookmarkRepository.add('hello')
      expect(id).toBeDefined()

      const bookmark = await db.bookmarks.get(id)
      expect(bookmark).toBeDefined()
      expect(bookmark!.word).toBe('hello')
      expect(bookmark!.folderIds).toEqual([])
      expect(bookmark!.createdAt).toBeInstanceOf(Date)
    })

    it('should not add duplicate words', async () => {
      await bookmarkRepository.add('hello')
      await expect(bookmarkRepository.add('hello')).rejects.toThrow()
    })
  })

  describe('remove', () => {
    it('should remove a bookmarked word by word string', async () => {
      await bookmarkRepository.add('hello')
      await bookmarkRepository.remove('hello')

      const result = await db.bookmarks.where('word').equals('hello').first()
      expect(result).toBeUndefined()
    })
  })

  describe('isBookmarked', () => {
    it('should return true if word is bookmarked', async () => {
      await bookmarkRepository.add('hello')
      const result = await bookmarkRepository.isBookmarked('hello')
      expect(result).toBe(true)
    })

    it('should return false if word is not bookmarked', async () => {
      const result = await bookmarkRepository.isBookmarked('hello')
      expect(result).toBe(false)
    })
  })

  describe('getAll', () => {
    it('should return all bookmarks ordered by createdAt descending', async () => {
      await bookmarkRepository.add('apple')
      await bookmarkRepository.add('banana')
      await bookmarkRepository.add('cherry')

      const all = await bookmarkRepository.getAll()
      expect(all).toHaveLength(3)
      // Most recent first
      expect(all[0].word).toBe('cherry')
      expect(all[2].word).toBe('apple')
    })
  })

  describe('getByFolder', () => {
    it('should return bookmarks in a specific folder', async () => {
      const id1 = await bookmarkRepository.add('apple')
      await bookmarkRepository.add('banana')
      await bookmarkRepository.assignFolder(id1, 1)

      const result = await bookmarkRepository.getByFolder(1)
      expect(result).toHaveLength(1)
      expect(result[0].word).toBe('apple')
    })
  })

  describe('assignFolder', () => {
    it('should assign a folder to a bookmark', async () => {
      const id = await bookmarkRepository.add('hello')
      await bookmarkRepository.assignFolder(id, 1)

      const bookmark = await db.bookmarks.get(id)
      expect(bookmark!.folderIds).toContain(1)
    })

    it('should not duplicate folder assignment', async () => {
      const id = await bookmarkRepository.add('hello')
      await bookmarkRepository.assignFolder(id, 1)
      await bookmarkRepository.assignFolder(id, 1)

      const bookmark = await db.bookmarks.get(id)
      expect(bookmark!.folderIds).toEqual([1])
    })
  })

  describe('removeFolder', () => {
    it('should remove a folder from a bookmark', async () => {
      const id = await bookmarkRepository.add('hello')
      await bookmarkRepository.assignFolder(id, 1)
      await bookmarkRepository.assignFolder(id, 2)
      await bookmarkRepository.removeFolder(id, 1)

      const bookmark = await db.bookmarks.get(id)
      expect(bookmark!.folderIds).toEqual([2])
    })
  })
})
