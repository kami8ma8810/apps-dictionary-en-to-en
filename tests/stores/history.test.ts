import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useHistoryStore } from '~/stores/history'
import { db } from '~/database/db'

describe('useHistoryStore', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    await db.searchHistory.clear()
  })

  it('should start with empty history', async () => {
    const store = useHistoryStore()
    await store.loadRecent()
    expect(store.entries).toEqual([])
  })

  it('should add and load history entries', async () => {
    const store = useHistoryStore()
    await store.add('hello')
    await store.add('world')
    await store.loadRecent()

    expect(store.entries).toHaveLength(2)
    expect(store.entries[0].word).toBe('world')
    expect(store.entries[1].word).toBe('hello')
  })

  it('should remove a history entry', async () => {
    const store = useHistoryStore()
    await store.add('hello')
    await store.loadRecent()

    const entryId = store.entries[0].id!
    await store.remove(entryId)
    await store.loadRecent()

    expect(store.entries).toHaveLength(0)
  })

  it('should clear all history', async () => {
    const store = useHistoryStore()
    await store.add('hello')
    await store.add('world')
    await store.clearAll()
    await store.loadRecent()

    expect(store.entries).toHaveLength(0)
  })

  it('should search history entries by prefix', async () => {
    const store = useHistoryStore()
    await store.add('apple')
    await store.add('application')
    await store.add('banana')

    const results = await store.search('app')
    expect(results).toHaveLength(2)
  })
})
