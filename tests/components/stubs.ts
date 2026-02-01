import { defineComponent, h } from 'vue'

/**
 * Stubs for Nuxt UI components used in unit tests.
 * These render minimal accessible HTML so vitest-axe can validate.
 */

export const UButton = defineComponent({
  name: 'UButton',
  props: {
    label: String,
    icon: String,
    variant: String,
    color: String,
    size: String,
    type: { type: String, default: 'button' },
    block: Boolean
  },
  inheritAttrs: false,
  setup(props, { attrs }) {
    return () => {
      const buttonAttrs: Record<string, unknown> = {
        type: props.type
      }
      // Forward aria-* attributes from attrs
      for (const [key, value] of Object.entries(attrs)) {
        if (key.startsWith('aria-')) {
          buttonAttrs[key] = String(value)
        }
      }
      // Use aria-label or fall back to label prop
      if (!buttonAttrs['aria-label'] && props.label) {
        buttonAttrs['aria-label'] = props.label
      }
      return h('button', buttonAttrs, props.label || '')
    }
  }
})

export const UInput = defineComponent({
  name: 'UInput',
  props: {
    modelValue: [String, Number],
    placeholder: String,
    icon: String,
    size: String,
    autofocus: Boolean,
    type: { type: String, default: 'text' }
  },
  inheritAttrs: true,
  setup(props, { attrs }) {
    return () =>
      h('input', {
        type: props.type,
        placeholder: props.placeholder,
        value: props.modelValue,
        'aria-label': attrs['aria-label'] as string
      })
  }
})

export const UIcon = defineComponent({
  name: 'UIcon',
  props: { name: String },
  setup(props) {
    return () => h('span', { 'aria-hidden': 'true', class: props.name })
  }
})

export const UBadge = defineComponent({
  name: 'UBadge',
  props: { label: String, variant: String, color: String, size: String },
  setup(props) {
    return () => h('span', {}, props.label)
  }
})

export const USeparator = defineComponent({
  name: 'USeparator',
  setup() {
    return () => h('hr')
  }
})
