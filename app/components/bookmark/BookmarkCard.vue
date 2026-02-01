<script setup lang="ts">
import type { BookmarkedWord } from '~/types/bookmark'

defineProps<{
  bookmark: BookmarkedWord
}>()

const emit = defineEmits<{
  remove: [word: string]
}>()
</script>

<template>
  <div class="flex items-center justify-between rounded-lg border border-(--ui-border) p-3">
    <NuxtLink
      :to="`/word/${encodeURIComponent(bookmark.word)}`"
      class="flex-1"
    >
      <p class="font-medium text-(--ui-text-highlighted)">
        {{ bookmark.word }}
      </p>
    </NuxtLink>
    <UButton
      icon="i-lucide-bookmark-minus"
      variant="ghost"
      color="neutral"
      size="sm"
      :aria-label="`Remove ${bookmark.word} from bookmarks`"
      @click="emit('remove', bookmark.word)"
    />
  </div>
</template>
