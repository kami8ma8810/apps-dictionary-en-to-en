<script setup lang="ts">
import type { SearchHistoryEntry } from '~/types/history'
import { useTimeAgo } from '@vueuse/core'

const props = defineProps<{
  entry: SearchHistoryEntry
}>()

const emit = defineEmits<{
  select: [word: string]
  remove: [id: number]
}>()

const timeAgo = useTimeAgo(() => props.entry.searchedAt)
</script>

<template>
  <div class="flex items-center justify-between rounded-md px-3 py-2.5 hover:bg-(--ui-bg-elevated)">
    <button
      class="flex flex-1 items-center justify-between text-left"
      @click="emit('select', entry.word)"
    >
      <span class="text-sm font-medium text-(--ui-text)">{{ entry.word }}</span>
      <span class="text-xs text-(--ui-text-dimmed)">{{ timeAgo }}</span>
    </button>
    <UButton
      icon="i-lucide-x"
      variant="ghost"
      color="neutral"
      size="xs"
      class="ml-2"
      :aria-label="`Remove ${entry.word} from history`"
      @click="emit('remove', entry.id!)"
    />
  </div>
</template>
