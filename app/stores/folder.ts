import { ref } from 'vue'
import { defineStore } from 'pinia'
import { folderRepository } from '~/database/folderRepository'
import type { Folder } from '~/types/bookmark'

const useFolderStore = defineStore('folder', () => {
  const folders = ref<Folder[]>([])

  async function loadAll() {
    folders.value = await folderRepository.getAll()
  }

  async function add(name: string) {
    await folderRepository.add(name)
  }

  async function remove(id: number) {
    await folderRepository.remove(id)
  }

  async function rename(id: number, name: string) {
    await folderRepository.rename(id, name)
  }

  async function reorder(id: number, newOrder: number) {
    await folderRepository.reorder(id, newOrder)
  }

  return {
    folders,
    loadAll,
    add,
    remove,
    rename,
    reorder
  }
})

export { useFolderStore }
