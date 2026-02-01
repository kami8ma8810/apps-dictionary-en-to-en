const DATAMUSE_API_URL = 'https://api.datamuse.com/sug'

interface DatamuseSuggestion {
  word: string
  score: number
}

/**
 * Datamuse API からスペル候補を取得する。
 * スペースを含まない単語のみフィルタし、最大3件を返す。
 */
async function fetchSpellingSuggestions(query: string): Promise<string[]> {
  try {
    const response = await fetch(`${DATAMUSE_API_URL}?s=${encodeURIComponent(query)}`)

    if (!response.ok) {
      return []
    }

    const data = await response.json() as DatamuseSuggestion[]

    return data
      .map(item => item.word)
      .filter(word => !word.includes(' '))
      .slice(0, 3)
  } catch {
    return []
  }
}

export { fetchSpellingSuggestions }
