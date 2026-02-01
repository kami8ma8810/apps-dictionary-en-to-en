import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchSpellingSuggestions } from '~/services/datamuseApi'

describe('fetchSpellingSuggestions', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('should return up to 3 single-word suggestions', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify([
        { word: 'apple', score: 100 },
        { word: 'apply', score: 90 },
        { word: 'ample', score: 80 },
        { word: 'appeal', score: 70 }
      ]), { status: 200 })
    )

    const result = await fetchSpellingSuggestions('aple')
    expect(result).toEqual(['apple', 'apply', 'ample'])
  })

  it('should filter out multi-word suggestions', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify([
        { word: 'ice cream', score: 100 },
        { word: 'ice', score: 90 },
        { word: 'icy', score: 80 }
      ]), { status: 200 })
    )

    const result = await fetchSpellingSuggestions('ise')
    expect(result).toEqual(['ice', 'icy'])
  })

  it('should return an empty array on network error', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network error'))

    const result = await fetchSpellingSuggestions('aple')
    expect(result).toEqual([])
  })

  it('should return an empty array on non-ok response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response('Server error', { status: 500 })
    )

    const result = await fetchSpellingSuggestions('aple')
    expect(result).toEqual([])
  })

  it('should call the correct Datamuse API URL', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify([]), { status: 200 })
    )

    await fetchSpellingSuggestions('hello')
    expect(fetchSpy).toHaveBeenCalledWith('https://api.datamuse.com/sug?s=hello')
  })

  it('should encode the query parameter', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify([]), { status: 200 })
    )

    await fetchSpellingSuggestions('test&foo')
    expect(fetchSpy).toHaveBeenCalledWith('https://api.datamuse.com/sug?s=test%26foo')
  })

  it('should return an empty array when API returns empty results', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify([]), { status: 200 })
    )

    const result = await fetchSpellingSuggestions('xyzxyzxyz')
    expect(result).toEqual([])
  })
})
