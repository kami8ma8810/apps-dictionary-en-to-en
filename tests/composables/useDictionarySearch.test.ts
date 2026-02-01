import { describe, it, expect, vi } from 'vitest'
import { useDictionarySearch } from '~/composables/useDictionarySearch'
import type { DictionaryService } from '~/types/service'
import type { DictionaryResult } from '~/types/dictionary'

function createMockService(overrides?: Partial<DictionaryService>): DictionaryService {
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
        license: { name: 'CC BY-SA 3.0', url: '' },
        sourceUrls: []
      }]
    } satisfies DictionaryResult),
    ...overrides
  }
}

describe('useDictionarySearch', () => {
  it('should start with idle status', () => {
    const service = createMockService()
    const { status, result } = useDictionarySearch(service)

    expect(status.value).toBe('idle')
    expect(result.value).toBeNull()
  })

  it('should set loading status during search', async () => {
    let resolveSearch!: (value: DictionaryResult) => void
    const service = createMockService({
      search: vi.fn().mockImplementation(() => new Promise(resolve => {
        resolveSearch = resolve
      }))
    })

    const { status, search } = useDictionarySearch(service)
    const searchPromise = search('hello')

    expect(status.value).toBe('loading')

    resolveSearch({
      word: 'hello',
      entries: []
    })
    await searchPromise
  })

  it('should set success status and result on successful search', async () => {
    const service = createMockService()
    const { status, result, search } = useDictionarySearch(service)

    await search('hello')

    expect(status.value).toBe('success')
    expect(result.value).toBeDefined()
    expect(result.value!.word).toBe('hello')
  })

  it('should set not-found status when word is not found', async () => {
    const service = createMockService({
      search: vi.fn().mockRejectedValue(new Error('No Definitions Found'))
    })

    const { status, errorMessage, search } = useDictionarySearch(service)

    await search('xyznotaword')

    expect(status.value).toBe('not-found')
    expect(errorMessage.value).toBe('No Definitions Found')
  })

  it('should set error status on network failure', async () => {
    const service = createMockService({
      search: vi.fn().mockRejectedValue(new Error('Network error'))
    })

    const { status, errorMessage, search } = useDictionarySearch(service)

    await search('hello')

    expect(status.value).toBe('error')
    expect(errorMessage.value).toBe('Network error')
  })

  it('should not search for empty strings', async () => {
    const service = createMockService()
    const { status, search } = useDictionarySearch(service)

    await search('')
    await search('   ')

    expect(status.value).toBe('idle')
    expect(service.search).not.toHaveBeenCalled()
  })

  it('should reset state', async () => {
    const service = createMockService()
    const { status, result, errorMessage, search, reset } = useDictionarySearch(service)

    await search('hello')
    expect(status.value).toBe('success')

    reset()
    expect(status.value).toBe('idle')
    expect(result.value).toBeNull()
    expect(errorMessage.value).toBe('')
  })
})
