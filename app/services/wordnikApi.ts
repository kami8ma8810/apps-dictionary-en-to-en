const WORDNIK_API_URL = 'https://api.wordnik.com/v4/word.json'

interface WordnikExample {
  text: string
}

interface WordnikExamplesResponse {
  examples: WordnikExample[]
}

/**
 * Wordnik API から例文を取得する。
 * API キーが空の場合やエラー時は空配列を返す。最大5件。
 */
async function fetchWordExamples(word: string, apiKey: string): Promise<string[]> {
  if (!apiKey) {
    return []
  }

  try {
    const encodedWord = encodeURIComponent(word)
    const response = await fetch(
      `${WORDNIK_API_URL}/${encodedWord}/examples?limit=5&api_key=${apiKey}`
    )

    if (!response.ok) {
      return []
    }

    const data = await response.json() as WordnikExamplesResponse

    return (data.examples ?? []).map(item => item.text).slice(0, 5)
  } catch {
    return []
  }
}

export { fetchWordExamples }
