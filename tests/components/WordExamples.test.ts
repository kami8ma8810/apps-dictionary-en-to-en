import { describe, it, expect, vi } from 'vitest'
import { computed, ref } from 'vue'
import { render, fireEvent } from '@testing-library/vue'
import { axe } from 'vitest-axe'
import WordExamples from '~/components/word/WordExamples.vue'

vi.stubGlobal('computed', computed)
vi.stubGlobal('ref', ref)
vi.stubGlobal('useId', () => 'test-examples-id')

describe('WordExamples', () => {
  it('should not render when examples array is empty', () => {
    const { container } = render(WordExamples, {
      props: { examples: [] }
    })
    expect(container.textContent).toBe('')
  })

  it('should render a toggle button when examples exist', () => {
    const { getByRole } = render(WordExamples, {
      props: { examples: ['This is an example sentence.'] }
    })
    const button = getByRole('button', { name: /example sentences/i })
    expect(button).toBeTruthy()
    expect(button.getAttribute('aria-expanded')).toBe('false')
  })

  it('should show examples when toggle button is clicked', async () => {
    const { getByRole, getByText } = render(WordExamples, {
      props: { examples: ['The cat sat on the mat.', 'Hello world.'] }
    })

    const button = getByRole('button', { name: /example sentences/i })
    await fireEvent.click(button)

    expect(button.getAttribute('aria-expanded')).toBe('true')
    expect(getByText('The cat sat on the mat.')).toBeTruthy()
    expect(getByText('Hello world.')).toBeTruthy()
  })

  it('should hide examples when toggle button is clicked again', async () => {
    const { getByRole, container } = render(WordExamples, {
      props: { examples: ['The cat sat on the mat.'] }
    })

    const button = getByRole('button', { name: /example sentences/i })
    await fireEvent.click(button)
    expect(button.getAttribute('aria-expanded')).toBe('true')

    await fireEvent.click(button)
    expect(button.getAttribute('aria-expanded')).toBe('false')
    // v-show hides via display:none style
    const list = container.querySelector('ul')
    expect(list?.style.display).toBe('none')
  })

  it('should have aria-controls pointing to the examples list', () => {
    const { getByRole, container } = render(WordExamples, {
      props: { examples: ['Example sentence.'] }
    })

    const button = getByRole('button', { name: /example sentences/i })
    const controlsId = button.getAttribute('aria-controls')
    expect(controlsId).toBeTruthy()

    const region = container.querySelector(`#${controlsId}`)
    expect(region).toBeTruthy()
  })

  it('should display the correct number of examples', async () => {
    const examples = ['First.', 'Second.', 'Third.']
    const { getByRole, container } = render(WordExamples, {
      props: { examples }
    })

    const button = getByRole('button', { name: /example sentences/i })
    await fireEvent.click(button)

    const items = container.querySelectorAll('li')
    expect(items.length).toBe(3)
  })

  it('should have no accessibility violations', async () => {
    const { container } = render(WordExamples, {
      props: { examples: ['Example sentence.'] }
    })
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should have no accessibility violations when expanded', async () => {
    const { container, getByRole } = render(WordExamples, {
      props: { examples: ['Example sentence.'] }
    })

    const button = getByRole('button', { name: /example sentences/i })
    await fireEvent.click(button)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
