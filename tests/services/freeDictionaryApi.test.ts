import { describe, it, expect, vi, beforeEach } from 'vitest'
import { FreeDictionaryApi } from '~/services/freeDictionaryApi'
import type { DictionaryEntry } from '~/types/dictionary'

const mockEntry: DictionaryEntry = {
  word: 'hello',
  phonetics: [
    { text: '/həˈloʊ/', audio: 'https://example.com/hello.mp3' }
  ],
  meanings: [
    {
      partOfSpeech: 'exclamation',
      definitions: [
        {
          definition: 'used as a greeting or to begin a phone conversation.',
          synonyms: [],
          antonyms: [],
          example: 'hello there, Katie!'
        }
      ],
      synonyms: ['hi', 'greetings'],
      antonyms: ['goodbye']
    }
  ],
  license: { name: 'CC BY-SA 3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' },
  sourceUrls: ['https://en.wiktionary.org/wiki/hello']
}

describe('FreeDictionaryApi', () => {
  let api: FreeDictionaryApi

  beforeEach(() => {
    api = new FreeDictionaryApi()
    vi.restoreAllMocks()
  })

  describe('search', () => {
    it('should return dictionary entries for a valid word', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
        new Response(JSON.stringify([mockEntry]), { status: 200 })
      )

      const result = await api.search('hello')
      expect(result.word).toBe('hello')
      expect(result.entries).toHaveLength(1)
      expect(result.entries[0].meanings[0].partOfSpeech).toBe('exclamation')
    })

    it('should throw an error for a word not found (404)', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            title: 'No Definitions Found',
            message: "Sorry pal, we couldn't find definitions for the word you were looking for.",
            resolution: 'You can try the search again at later time or head to the web instead.'
          }),
          { status: 404 }
        )
      )

      await expect(api.search('xyznotaword')).rejects.toThrow('No Definitions Found')
    })

    it('should throw an error on network failure', async () => {
      vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network error'))

      await expect(api.search('hello')).rejects.toThrow('Network error')
    })

    it('should call the correct API URL', async () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
        new Response(JSON.stringify([mockEntry]), { status: 200 })
      )

      await api.search('hello')
      expect(fetchSpy).toHaveBeenCalledWith('https://api.dictionaryapi.dev/api/v2/entries/en/hello')
    })

    it('should trim and lowercase the search word', async () => {
      const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
        new Response(JSON.stringify([mockEntry]), { status: 200 })
      )

      await api.search('  Hello  ')
      expect(fetchSpy).toHaveBeenCalledWith('https://api.dictionaryapi.dev/api/v2/entries/en/hello')
    })
  })
})
