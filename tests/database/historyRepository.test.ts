import { describe, it, expect, beforeEach } from 'vitest'
import { historyRepository } from '~/database/historyRepository'
import { db } from '~/database/db'

describe('historyRepository', () => {
  beforeEach(async () => {
    await db.searchHistory.clear()
  })

  describe('add', () => {
    it('should add a search history entry', async () => {
      const id = await historyRepository.add('hello')
      expect(id).toBeDefined()

      const entry = await db.searchHistory.get(id)
      expect(entry).toBeDefined()
      expect(entry!.word).toBe('hello')
      expect(entry!.searchedAt).toBeInstanceOf(Date)
    })

    it('should update searchedAt if word already exists', async () => {
      const id1 = await historyRepository.add('hello')
      const entry1 = await db.searchHistory.get(id1)

      // Small delay to ensure different timestamps
      await new Promise(resolve => setTimeout(resolve, 10))

      await historyRepository.add('hello')

      const entries = await db.searchHistory.where('word').equals('hello').toArray()
      expect(entries).toHaveLength(1)
      expect(entries[0].searchedAt.getTime()).toBeGreaterThanOrEqual(entry1!.searchedAt.getTime())
    })
  })

  describe('getRecent', () => {
    it('should return recent entries ordered by searchedAt descending', async () => {
      await historyRepository.add('apple')
      await historyRepository.add('banana')
      await historyRepository.add('cherry')

      const recent = await historyRepository.getRecent(10)
      expect(recent).toHaveLength(3)
      expect(recent[0].word).toBe('cherry')
      expect(recent[2].word).toBe('apple')
    })

    it('should limit the number of results', async () => {
      await historyRepository.add('apple')
      await historyRepository.add('banana')
      await historyRepository.add('cherry')

      const recent = await historyRepository.getRecent(2)
      expect(recent).toHaveLength(2)
    })
  })

  describe('remove', () => {
    it('should remove a history entry by id', async () => {
      const id = await historyRepository.add('hello')
      await historyRepository.remove(id)

      const entry = await db.searchHistory.get(id)
      expect(entry).toBeUndefined()
    })
  })

  describe('clear', () => {
    it('should clear all history entries', async () => {
      await historyRepository.add('apple')
      await historyRepository.add('banana')
      await historyRepository.clear()

      const count = await db.searchHistory.count()
      expect(count).toBe(0)
    })
  })

  describe('search', () => {
    it('should find entries matching a prefix', async () => {
      await historyRepository.add('apple')
      await historyRepository.add('application')
      await historyRepository.add('banana')

      const results = await historyRepository.search('app')
      expect(results).toHaveLength(2)
      expect(results.map(r => r.word)).toContain('apple')
      expect(results.map(r => r.word)).toContain('application')
    })
  })
})
