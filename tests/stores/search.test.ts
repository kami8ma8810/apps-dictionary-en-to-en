import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useSearchStore } from '~/stores/search'
import type { DictionaryService } from '~/types/service'

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
})
