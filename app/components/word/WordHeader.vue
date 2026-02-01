<script setup lang="ts">
import type { Phonetic } from '~/types/dictionary'

const props = defineProps<{
  word: string
  phonetics: Phonetic[]
  bookmarked: boolean
}>()

const emit = defineEmits<{
  toggleBookmark: []
  playAudio: [url: string]
}>()

const phonetic = computed(() => {
  return props.phonetics.find(p => p.text) ?? props.phonetics[0]
})

const audioUrl = computed(() => {
  const withAudio = props.phonetics.find(p => p.audio)
  return withAudio?.audio ?? ''
})
</script>

<template>
  <div class="flex items-start justify-between gap-4">
    <div>
      <h1 class="text-3xl font-bold text-(--ui-text-highlighted)">
        {{ word }}
      </h1>
      <div
        v-if="phonetic"
        class="mt-1 flex items-center gap-2"
      >
        <span
          v-if="phonetic.text"
          class="text-base text-(--ui-text-muted)"
        >
          {{ phonetic.text }}
        </span>
        <UButton
          v-if="audioUrl"
          icon="i-lucide-volume-2"
          variant="ghost"
          color="neutral"
          size="sm"
          :aria-label="`Play pronunciation of ${word}`"
          @click="emit('playAudio', audioUrl)"
        />
      </div>
    </div>
    <UButton
      :icon="bookmarked ? 'i-lucide-bookmark-check' : 'i-lucide-bookmark'"
      :variant="bookmarked ? 'soft' : 'ghost'"
      :color="bookmarked ? 'primary' : 'neutral'"
      size="lg"
      :aria-label="bookmarked ? `Remove ${word} from bookmarks` : `Add ${word} to bookmarks`"
      :aria-pressed="bookmarked"
      @click="emit('toggleBookmark')"
    />
  </div>
</template>
