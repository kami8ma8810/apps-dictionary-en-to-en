<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'

const model = defineModel<string>({ default: '' })

const emit = defineEmits<{
  search: [word: string]
}>()

const debouncedSearch = useDebounceFn((value: string) => {
  if (value.trim()) {
    emit('search', value.trim())
  }
}, 300)

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  model.value = target.value
  debouncedSearch(target.value)
}

function handleSubmit() {
  if (model.value.trim()) {
    emit('search', model.value.trim())
  }
}

function handleClear() {
  model.value = ''
}
</script>

<template>
  <form
    role="search"
    @submit.prevent="handleSubmit"
  >
    <UInput
      :model-value="model"
      placeholder="Search a word..."
      icon="i-lucide-search"
      size="xl"
      autofocus
      aria-label="Search for an English word"
      @input="handleInput"
    >
      <template
        v-if="model"
        #trailing
      >
        <UButton
          icon="i-lucide-x"
          variant="link"
          color="neutral"
          size="sm"
          aria-label="Clear search"
          @click="handleClear"
        />
      </template>
    </UInput>
  </form>
</template>
