import { describe, it, expect, vi, beforeEach } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { useSearchStore } from '~/stores/search'
import type { DictionaryService } from '~/types/service'

vi.mock('~/services/datamuseApi', () => ({
  fetchSpellingSuggestions: vi.fn().mockResolvedValue([])
}))

import { fetchSpellingSuggestions } from '~/services/datamuseApi'
const mockFetchSuggestions = vi.mocked(fetchSpellingSuggestions)

function createMockService(): DictionaryService {
  return {
    search: vi.fn().mockResolvedValue({
      word: 'hello',
      entries: [{
        word: 'hello',
        phonetics: [],
        meanings: [{
          partOfSpeech: 'exclamation',
          definitions: [{ definition: 'greeting', synonyms: [], antonyms: [] }],
          synonyms: [],
          antonyms: []
        }],
        license: { name: '', url: '' },
        sourceUrls: []
      }]
    })
  }
}

describe('useSearchStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    mockFetchSuggestions.mockClear()
  })

  it('should start with idle status and empty query', () => {
    const store = useSearchStore()
    expect(store.status).toBe('idle')
    expect(store.query).toBe('')
    expect(store.result).toBeNull()
  })

  it('should search and update result', async () => {
    const service = createMockService()
    const store = useSearchStore()

    await store.search('hello', service)

    expect(store.status).toBe('success')
    expect(store.result).toBeDefined()
    expect(store.result!.word).toBe('hello')
    expect(store.query).toBe('hello')
  })

  it('should handle not-found errors', async () => {
    const service: DictionaryService = {
      search: vi.fn().mockRejectedValue(new Error('No Definitions Found'))
    }
    const store = useSearchStore()

    await store.search('xyznotaword', service)

    expect(store.status).toBe('not-found')
    expect(store.errorMessage).toBe('No Definitions Found')
  })

  it('should handle network errors', async () => {
    const service: DictionaryService = {
      search: vi.fn().mockRejectedValue(new Error('Network error'))
    }
    const store = useSearchStore()

    await store.search('hello', service)

    expect(store.status).toBe('error')
    expect(store.errorMessage).toBe('Network error')
  })

  it('should reset state', async () => {
    const service = createMockService()
    const store = useSearchStore()

    await store.search('hello', service)
    store.reset()

    expect(store.status).toBe('idle')
    expect(store.result).toBeNull()
    expect(store.query).toBe('')
    expect(store.errorMessage).toBe('')
  })

  describe('suggestions', () => {
    it('should start with empty suggestions', () => {
      const store = useSearchStore()
      expect(store.suggestions).toEqual([])
    })

    it('should fetch suggestions when status is not-found', async () => {
      mockFetchSuggestions.mockResolvedValueOnce(['apple', 'apply', 'ample'])
      const service: DictionaryService = {
        search: vi.fn().mockRejectedValue(new Error('No Definitions Found'))
      }
      const store = useSearchStore()

      await store.search('aple', service)
      await flushPromises()

      expect(store.status).toBe('not-found')
      expect(mockFetchSuggestions).toHaveBeenCalledWith('aple')
      expect(store.suggestions).toEqual(['apple', 'apply', 'ample'])
    })

    it('should not fetch suggestions on success', async () => {
      const service = createMockService()
      const store = useSearchStore()

      await store.search('hello', service)

      expect(store.status).toBe('success')
      expect(mockFetchSuggestions).not.toHaveBeenCalled()
    })

    it('should not fetch suggestions on generic error', async () => {
      const service: DictionaryService = {
        search: vi.fn().mockRejectedValue(new Error('Network error'))
      }
      const store = useSearchStore()

      await store.search('hello', service)

      expect(store.status).toBe('error')
      expect(mockFetchSuggestions).not.toHaveBeenCalled()
    })

    it('should clear suggestions on reset', async () => {
      mockFetchSuggestions.mockResolvedValueOnce(['apple'])
      const service: DictionaryService = {
        search: vi.fn().mockRejectedValue(new Error('No Definitions Found'))
      }
      const store = useSearchStore()

      await store.search('aple', service)
      await flushPromises()
      expect(store.suggestions).toEqual(['apple'])

      store.reset()
      expect(store.suggestions).toEqual([])
    })

    it('should clear suggestions before a new search', async () => {
      mockFetchSuggestions.mockResolvedValueOnce(['apple'])
      const notFoundService: DictionaryService = {
        search: vi.fn().mockRejectedValue(new Error('No Definitions Found'))
      }
      const store = useSearchStore()

      await store.search('aple', notFoundService)
      await flushPromises()
      expect(store.suggestions).toEqual(['apple'])

      const successService = createMockService()
      await store.search('hello', successService)
      expect(store.suggestions).toEqual([])
    })
  })
})
