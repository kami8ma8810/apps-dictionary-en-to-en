<script setup lang="ts">
defineProps<{
  synonyms: string[]
  antonyms: string[]
}>()

const emit = defineEmits<{
  selectWord: [word: string]
}>()
</script>

<template>
  <div
    v-if="synonyms.length > 0 || antonyms.length > 0"
    class="space-y-3"
  >
    <div v-if="synonyms.length > 0">
      <p class="mb-1.5 text-sm font-medium text-(--ui-text-muted)">
        Synonyms
      </p>
      <div class="flex flex-wrap gap-1.5">
        <UButton
          v-for="word in synonyms"
          :key="word"
          :label="word"
          variant="outline"
          color="neutral"
          size="xs"
          @click="emit('selectWord', word)"
        />
      </div>
    </div>
    <div v-if="antonyms.length > 0">
      <p class="mb-1.5 text-sm font-medium text-(--ui-text-muted)">
        Antonyms
      </p>
      <div class="flex flex-wrap gap-1.5">
        <UButton
          v-for="word in antonyms"
          :key="word"
          :label="word"
          variant="outline"
          color="neutral"
          size="xs"
          @click="emit('selectWord', word)"
        />
      </div>
    </div>
  </div>
</template>
