import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import ErrorDisplay from '~/components/common/ErrorDisplay.vue'
import { UButton, UIcon } from './stubs'

const globalStubs = {
  global: {
    components: { UButton, UIcon }
  }
}

describe('ErrorDisplay a11y', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(ErrorDisplay, {
      ...globalStubs,
      props: { message: 'Something went wrong' }
    })
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should have role="alert"', () => {
    const { container } = render(ErrorDisplay, {
      ...globalStubs,
      props: { message: 'Network error' }
    })
    const alert = container.querySelector('[role="alert"]')
    expect(alert).toBeTruthy()
  })

  it('should display error message', () => {
    const { getByText } = render(ErrorDisplay, {
      ...globalStubs,
      props: { message: 'Failed to fetch' }
    })
    expect(getByText('Failed to fetch')).toBeTruthy()
  })

  it('should show retry button when retryable', () => {
    const { container } = render(ErrorDisplay, {
      ...globalStubs,
      props: { message: 'Error', retryable: true }
    })
    const retryButton = container.querySelector('button')
    expect(retryButton).toBeTruthy()
    expect(retryButton?.textContent).toContain('Try again')
  })
})
