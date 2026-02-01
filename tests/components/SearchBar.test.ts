import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import SearchBar from '~/components/search/SearchBar.vue'
import { UButton, UInput } from './stubs'

const globalStubs = {
  global: {
    components: { UButton, UInput }
  }
}

describe('SearchBar a11y', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(SearchBar, globalStubs)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should have role="search" on the form', () => {
    const { container } = render(SearchBar, globalStubs)
    const form = container.querySelector('form')
    expect(form).toBeTruthy()
    expect(form?.getAttribute('role')).toBe('search')
  })

  it('should have an accessible label on the input', () => {
    const { container } = render(SearchBar, globalStubs)
    const input = container.querySelector('input')
    expect(input).toBeTruthy()
    expect(input?.getAttribute('aria-label')).toBe('Search for an English word')
  })

  it('should have a submit button', () => {
    const { container } = render(SearchBar, globalStubs)
    const submitButton = container.querySelector('button[type="submit"]')
    expect(submitButton).toBeTruthy()
  })
})
