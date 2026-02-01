import type { DictionaryService } from '~/types/service'
import type { DictionaryEntry, DictionaryResult, DictionaryApiError } from '~/types/dictionary'

const API_BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en'

class FreeDictionaryApi implements DictionaryService {
  async search(word: string): Promise<DictionaryResult> {
    const normalizedWord = word.trim().toLowerCase()
    const response = await fetch(`${API_BASE_URL}/${normalizedWord}`)

    if (!response.ok) {
      const errorData = await response.json() as DictionaryApiError
      throw new Error(errorData.title)
    }

    const entries = await response.json() as DictionaryEntry[]

    return {
      word: normalizedWord,
      entries
    }
  }
}

export { FreeDictionaryApi }
