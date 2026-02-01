import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import BookmarkToggle from '~/components/bookmark/BookmarkToggle.vue'
import { UButton } from './stubs'

const globalStubs = {
  global: {
    components: { UButton }
  }
}

describe('BookmarkToggle a11y', () => {
  it('should have no accessibility violations when not bookmarked', async () => {
    const { container } = render(BookmarkToggle, {
      ...globalStubs,
      props: { word: 'hello', bookmarked: false }
    })
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should have no accessibility violations when bookmarked', async () => {
    const { container } = render(BookmarkToggle, {
      ...globalStubs,
      props: { word: 'hello', bookmarked: true }
    })
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should have aria-pressed when bookmarked', () => {
    const { container } = render(BookmarkToggle, {
      ...globalStubs,
      props: { word: 'hello', bookmarked: true }
    })
    const button = container.querySelector('button')
    expect(button?.getAttribute('aria-pressed')).toBe('true')
  })

  it('should have descriptive aria-label when not bookmarked', () => {
    const { container } = render(BookmarkToggle, {
      ...globalStubs,
      props: { word: 'hello', bookmarked: false }
    })
    const button = container.querySelector('button')
    expect(button?.getAttribute('aria-label')).toBe('Add hello to bookmarks')
  })

  it('should update aria-label when bookmarked', () => {
    const { container } = render(BookmarkToggle, {
      ...globalStubs,
      props: { word: 'hello', bookmarked: true }
    })
    const button = container.querySelector('button')
    expect(button?.getAttribute('aria-label')).toBe('Remove hello from bookmarks')
  })
})
