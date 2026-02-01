import { db } from './db'
import type { Folder } from '~/types/bookmark'

const folderRepository = {
  async add(name: string): Promise<number> {
    const count = await db.folders.count()
    return db.folders.add({
      name,
      order: count
    })
  },

  async remove(id: number): Promise<void> {
    await db.folders.delete(id)
  },

  async rename(id: number, name: string): Promise<void> {
    await db.folders.update(id, { name })
  },

  async getAll(): Promise<Folder[]> {
    return db.folders.orderBy('order').toArray()
  },

  async reorder(id: number, newOrder: number): Promise<void> {
    await db.folders.update(id, { order: newOrder })
  }
}

export { folderRepository }
