import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useBookmarkStore } from '~/stores/bookmark'
import { db } from '~/database/db'

describe('useBookmarkStore', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    await db.bookmarks.clear()
    await db.folders.clear()
  })

  it('should start with empty bookmarks', async () => {
    const store = useBookmarkStore()
    await store.loadAll()
    expect(store.bookmarks).toEqual([])
  })

  it('should add and load a bookmark', async () => {
    const store = useBookmarkStore()
    await store.add('hello')
    await store.loadAll()

    expect(store.bookmarks).toHaveLength(1)
    expect(store.bookmarks[0].word).toBe('hello')
  })

  it('should remove a bookmark', async () => {
    const store = useBookmarkStore()
    await store.add('hello')
    await store.remove('hello')
    await store.loadAll()

    expect(store.bookmarks).toHaveLength(0)
  })

  it('should check if a word is bookmarked', async () => {
    const store = useBookmarkStore()
    await store.add('hello')

    const isBookmarked = await store.isBookmarked('hello')
    expect(isBookmarked).toBe(true)

    const notBookmarked = await store.isBookmarked('world')
    expect(notBookmarked).toBe(false)
  })

  it('should toggle bookmark on/off', async () => {
    const store = useBookmarkStore()

    await store.toggle('hello')
    expect(await store.isBookmarked('hello')).toBe(true)

    await store.toggle('hello')
    expect(await store.isBookmarked('hello')).toBe(false)
  })
})
