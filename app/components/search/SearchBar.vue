<script setup lang="ts">
const model = defineModel<string>({ default: '' })

const emit = defineEmits<{
  search: [word: string]
}>()

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  model.value = target.value
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
    <div class="flex gap-2">
      <UInput
        :model-value="model"
        placeholder="Search a word..."
        icon="i-lucide-search"
        size="xl"
        autofocus
        class="flex-1"
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
      <UButton
        type="submit"
        icon="i-lucide-arrow-right"
        size="xl"
        color="neutral"
        variant="solid"
        aria-label="Search"
      />
    </div>
  </form>
</template>
