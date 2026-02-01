import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFolderStore } from '~/stores/folder'
import { db } from '~/database/db'

describe('useFolderStore', () => {
  beforeEach(async () => {
    setActivePinia(createPinia())
    await db.folders.clear()
  })

  it('should start with empty folders', async () => {
    const store = useFolderStore()
    await store.loadAll()
    expect(store.folders).toEqual([])
  })

  it('should add and load a folder', async () => {
    const store = useFolderStore()
    await store.add('Vocabulary')
    await store.loadAll()

    expect(store.folders).toHaveLength(1)
    expect(store.folders[0].name).toBe('Vocabulary')
  })

  it('should remove a folder', async () => {
    const store = useFolderStore()
    await store.add('Vocabulary')
    await store.loadAll()

    const folderId = store.folders[0].id!
    await store.remove(folderId)
    await store.loadAll()

    expect(store.folders).toHaveLength(0)
  })

  it('should rename a folder', async () => {
    const store = useFolderStore()
    await store.add('Old Name')
    await store.loadAll()

    const folderId = store.folders[0].id!
    await store.rename(folderId, 'New Name')
    await store.loadAll()

    expect(store.folders[0].name).toBe('New Name')
  })
})
