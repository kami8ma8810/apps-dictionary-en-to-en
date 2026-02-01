<script setup lang="ts">
const props = defineProps<{
  src: string
  word: string
}>()

const isPlaying = ref(false)

function play() {
  if (!props.src) return
  const audio = new Audio(props.src)
  isPlaying.value = true
  audio.play()
  audio.addEventListener('ended', () => {
    isPlaying.value = false
  })
  audio.addEventListener('error', () => {
    isPlaying.value = false
  })
}
</script>

<template>
  <UButton
    v-if="src"
    :icon="isPlaying ? 'i-lucide-volume-2' : 'i-lucide-volume-1'"
    variant="ghost"
    color="neutral"
    size="sm"
    :aria-label="`Play pronunciation of ${word}`"
    @click="play"
  />
</template>
