import { ref } from 'vue'
import { defineStore } from 'pinia'
import { FreeDictionaryApi } from '~/services/freeDictionaryApi'
import type { DictionaryResult } from '~/types/dictionary'
import type { SearchStatus } from '~/types/ui'
import type { DictionaryService } from '~/types/service'

const useSearchStore = defineStore('search', () => {
  const query = ref('')
  const result = ref<DictionaryResult | null>(null)
  const status = ref<SearchStatus>('idle')
  const errorMessage = ref('')

  async function search(word: string, service: DictionaryService = new FreeDictionaryApi()) {
    if (!word.trim()) return

    query.value = word.trim()
    status.value = 'loading'
    result.value = null
    errorMessage.value = ''

    try {
      result.value = await service.search(word)
      status.value = 'success'
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'

      if (message === 'No Definitions Found') {
        status.value = 'not-found'
      } else {
        status.value = 'error'
      }
      errorMessage.value = message
    }
  }

  function reset() {
    query.value = ''
    result.value = null
    status.value = 'idle'
    errorMessage.value = ''
  }

  return {
    query,
    result,
    status,
    errorMessage,
    search,
    reset
  }
})

export { useSearchStore }
