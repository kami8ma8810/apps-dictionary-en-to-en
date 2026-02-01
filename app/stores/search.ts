import { ref } from 'vue'
import { defineStore } from 'pinia'
import { FreeDictionaryApi } from '~/services/freeDictionaryApi'
import { fetchSpellingSuggestions } from '~/services/datamuseApi'
import { fetchWordExamples } from '~/services/wordnikApi'
import type { DictionaryResult } from '~/types/dictionary'
import type { SearchStatus } from '~/types/ui'
import type { DictionaryService } from '~/types/service'

const useSearchStore = defineStore('search', () => {
  const query = ref('')
  const result = ref<DictionaryResult | null>(null)
  const status = ref<SearchStatus>('idle')
  const errorMessage = ref('')
  const suggestions = ref<string[]>([])
  const wordExamples = ref<string[]>([])

  async function search(word: string, service: DictionaryService = new FreeDictionaryApi()) {
    if (!word.trim()) return

    query.value = word.trim()
    status.value = 'loading'
    result.value = null
    errorMessage.value = ''
    suggestions.value = []
    wordExamples.value = []

    try {
      result.value = await service.search(word)
      status.value = 'success'
      // 定義の表示をブロックしないよう非同期で例文を取得
      const apiKey = useRuntimeConfig().public.wordnikApiKey as string
      const searchedWord = query.value
      void fetchWordExamples(searchedWord, apiKey).then((examples) => {
        // 検索中にクエリが変わっていたら古い結果を無視
        if (query.value === searchedWord) {
          wordExamples.value = examples
        }
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'

      if (message === 'No Definitions Found') {
        status.value = 'not-found'
        // not-found の描画をブロックしないよう非同期で候補を取得
        void fetchSpellingSuggestions(query.value).then((result) => {
          suggestions.value = result
        })
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
    suggestions.value = []
    wordExamples.value = []
  }

  return {
    query,
    result,
    status,
    errorMessage,
    suggestions,
    wordExamples,
    search,
    reset
  }
})

export { useSearchStore }
