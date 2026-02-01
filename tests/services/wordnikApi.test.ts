import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchWordExamples } from '~/services/wordnikApi'

describe('fetchWordExamples', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('should return up to 5 example sentences', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({
        examples: [
          { text: 'Hello world' },
          { text: 'Hello there' },
          { text: 'Say hello' },
          { text: 'Hello again' },
          { text: 'Hello everyone' },
          { text: 'Hello extra' }
        ]
      }), { status: 200 })
    )

    const result = await fetchWordExamples('hello', 'test-api-key')
    expect(result).toEqual([
      'Hello world',
      'Hello there',
      'Say hello',
      'Hello again',
      'Hello everyone'
    ])
  })

  it('should return an empty array when API key is empty', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')

    const result = await fetchWordExamples('hello', '')
    expect(result).toEqual([])
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('should return an empty array on network error', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network error'))

    const result = await fetchWordExamples('hello', 'test-api-key')
    expect(result).toEqual([])
  })

  it('should return an empty array on non-ok response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response('Server error', { status: 500 })
    )

    const result = await fetchWordExamples('hello', 'test-api-key')
    expect(result).toEqual([])
  })

  it('should call the correct Wordnik API URL with api_key', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ examples: [] }), { status: 200 })
    )

    await fetchWordExamples('hello', 'my-key')
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://api.wordnik.com/v4/word.json/hello/examples?limit=5&api_key=my-key'
    )
  })

  it('should encode the word parameter', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ examples: [] }), { status: 200 })
    )

    await fetchWordExamples('test&foo', 'my-key')
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://api.wordnik.com/v4/word.json/test%26foo/examples?limit=5&api_key=my-key'
    )
  })

  it('should return an empty array when API returns empty examples', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ examples: [] }), { status: 200 })
    )

    const result = await fetchWordExamples('xyzxyz', 'test-api-key')
    expect(result).toEqual([])
  })

  it('should handle missing examples field gracefully', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({}), { status: 200 })
    )

    const result = await fetchWordExamples('hello', 'test-api-key')
    expect(result).toEqual([])
  })
})
