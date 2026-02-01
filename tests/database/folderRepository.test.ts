import { describe, it, expect, beforeEach } from 'vitest'
import { folderRepository } from '~/database/folderRepository'
import { db } from '~/database/db'

describe('folderRepository', () => {
  beforeEach(async () => {
    await db.folders.clear()
  })

  describe('add', () => {
    it('should add a folder', async () => {
      const id = await folderRepository.add('Vocabulary')
      expect(id).toBeDefined()

      const folder = await db.folders.get(id)
      expect(folder).toBeDefined()
      expect(folder!.name).toBe('Vocabulary')
      expect(folder!.order).toBe(0)
    })

    it('should auto-increment order', async () => {
      await folderRepository.add('First')
      await folderRepository.add('Second')

      const folders = await folderRepository.getAll()
      expect(folders[0].order).toBe(0)
      expect(folders[1].order).toBe(1)
    })

    it('should not allow duplicate names', async () => {
      await folderRepository.add('Vocabulary')
      await expect(folderRepository.add('Vocabulary')).rejects.toThrow()
    })
  })

  describe('remove', () => {
    it('should remove a folder by id', async () => {
      const id = await folderRepository.add('Vocabulary')
      await folderRepository.remove(id)

      const folder = await db.folders.get(id)
      expect(folder).toBeUndefined()
    })
  })

  describe('rename', () => {
    it('should rename a folder', async () => {
      const id = await folderRepository.add('Old Name')
      await folderRepository.rename(id, 'New Name')

      const folder = await db.folders.get(id)
      expect(folder!.name).toBe('New Name')
    })
  })

  describe('getAll', () => {
    it('should return all folders ordered by order', async () => {
      await folderRepository.add('B Folder')
      await folderRepository.add('A Folder')

      const all = await folderRepository.getAll()
      expect(all).toHaveLength(2)
      expect(all[0].name).toBe('B Folder')
      expect(all[1].name).toBe('A Folder')
    })
  })

  describe('reorder', () => {
    it('should update the order of a folder', async () => {
      const id1 = await folderRepository.add('First')
      const id2 = await folderRepository.add('Second')

      await folderRepository.reorder(id2, 0)
      await folderRepository.reorder(id1, 1)

      const all = await folderRepository.getAll()
      expect(all[0].name).toBe('Second')
      expect(all[1].name).toBe('First')
    })
  })
})
