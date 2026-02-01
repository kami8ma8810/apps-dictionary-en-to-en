import { describe, it, expect, vi } from 'vitest'
import { computed, ref } from 'vue'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import WordHeader from '~/components/word/WordHeader.vue'
import { UButton } from './stubs'

// Provide Vue auto-imports that Nuxt normally handles
vi.stubGlobal('computed', computed)
vi.stubGlobal('ref', ref)

const globalStubs = {
  global: {
    components: { UButton }
  }
}

const defaultProps = {
  word: 'hello',
  phonetics: [{ text: '/həˈloʊ/', audio: 'https://example.com/hello.mp3' }],
  bookmarked: false
}

describe('WordHeader a11y', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(WordHeader, {
      ...globalStubs,
      props: defaultProps
    })
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should display word in h1', () => {
    const { container } = render(WordHeader, {
      ...globalStubs,
      props: defaultProps
    })
    const h1 = container.querySelector('h1')
    expect(h1).toBeTruthy()
    expect(h1?.textContent?.trim()).toBe('hello')
  })

  it('should have bookmark button with aria-pressed', () => {
    const { container } = render(WordHeader, {
      ...globalStubs,
      props: { ...defaultProps, bookmarked: true }
    })
    const buttons = container.querySelectorAll('button')
    const bookmarkBtn = Array.from(buttons).find(b => b.getAttribute('aria-pressed'))
    expect(bookmarkBtn).toBeTruthy()
    expect(bookmarkBtn?.getAttribute('aria-pressed')).toBe('true')
  })

  it('should have accessible audio play button', () => {
    const { container } = render(WordHeader, {
      ...globalStubs,
      props: defaultProps
    })
    const buttons = container.querySelectorAll('button')
    const audioBtn = Array.from(buttons).find(b =>
      b.getAttribute('aria-label')?.includes('Play pronunciation')
    )
    expect(audioBtn).toBeTruthy()
  })
})
