import { ref } from 'vue'
import { FreeDictionaryApi } from '~/services/freeDictionaryApi'
import type { DictionaryResult } from '~/types/dictionary'
import type { SearchStatus } from '~/types/ui'
import type { DictionaryService } from '~/types/service'

function useDictionarySearch(service: DictionaryService = new FreeDictionaryApi()) {
  const result = ref<DictionaryResult | null>(null)
  const status = ref<SearchStatus>('idle')
  const errorMessage = ref('')

  async function search(word: string) {
    if (!word.trim()) return

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
        errorMessage.value = message
      } else {
        status.value = 'error'
        errorMessage.value = message
      }
    }
  }

  function reset() {
    result.value = null
    status.value = 'idle'
    errorMessage.value = ''
  }

  return {
    result,
    status,
    errorMessage,
    search,
    reset
  }
}

export { useDictionarySearch }
