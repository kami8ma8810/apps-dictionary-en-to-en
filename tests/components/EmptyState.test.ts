import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import EmptyState from '~/components/common/EmptyState.vue'
import { UIcon } from './stubs'

const globalStubs = {
  global: {
    components: { UIcon }
  }
}

describe('EmptyState a11y', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(EmptyState, {
      ...globalStubs,
      props: { title: 'No items found' }
    })
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should have no violations with description', async () => {
    const { container } = render(EmptyState, {
      ...globalStubs,
      props: {
        title: 'No bookmarks yet',
        description: 'Search for a word and tap the bookmark icon to save it.',
        icon: 'i-lucide-bookmark'
      }
    })
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should display title text', () => {
    const { getByText } = render(EmptyState, {
      ...globalStubs,
      props: { title: 'No search history' }
    })
    expect(getByText('No search history')).toBeTruthy()
  })
})
