<script setup lang="ts">
defineProps<{
  word: string
  bookmarked: boolean
}>()

const emit = defineEmits<{
  toggle: []
}>()
</script>

<template>
  <UButton
    :icon="bookmarked ? 'i-lucide-bookmark-check' : 'i-lucide-bookmark'"
    :variant="bookmarked ? 'soft' : 'ghost'"
    :color="bookmarked ? 'primary' : 'neutral'"
    :aria-label="bookmarked ? `Remove ${word} from bookmarks` : `Add ${word} to bookmarks`"
    :aria-pressed="bookmarked"
    @click="emit('toggle')"
  />
</template>
