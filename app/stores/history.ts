import { ref } from 'vue'
import { defineStore } from 'pinia'
import { historyRepository } from '~/database/historyRepository'
import type { SearchHistoryEntry } from '~/types/history'

const useHistoryStore = defineStore('history', () => {
  const entries = ref<SearchHistoryEntry[]>([])

  async function loadRecent(limit = 50) {
    entries.value = await historyRepository.getRecent(limit)
  }

  async function add(word: string) {
    await historyRepository.add(word)
  }

  async function remove(id: number) {
    await historyRepository.remove(id)
  }

  async function clearAll() {
    await historyRepository.clear()
  }

  async function search(prefix: string): Promise<SearchHistoryEntry[]> {
    return historyRepository.search(prefix)
  }

  return {
    entries,
    loadRecent,
    add,
    remove,
    clearAll,
    search
  }
})

export { useHistoryStore }
