<script setup lang="ts">
import type { SearchHistoryEntry } from '~/types/history'

defineProps<{
  entries: SearchHistoryEntry[]
}>()

const emit = defineEmits<{
  select: [word: string]
  remove: [id: number]
  clearAll: []
}>()
</script>

<template>
  <div>
    <div
      v-if="entries.length > 0"
      class="mb-4 flex items-center justify-between"
    >
      <h2 class="text-lg font-semibold text-(--ui-text-highlighted)">
        Search History
      </h2>
      <UButton
        label="Clear all"
        variant="ghost"
        color="neutral"
        size="sm"
        @click="emit('clearAll')"
      />
    </div>
    <div class="space-y-0.5">
      <HistoryItem
        v-for="entry in entries"
        :key="entry.id"
        :entry="entry"
        @select="emit('select', $event)"
        @remove="emit('remove', $event)"
      />
    </div>
    <CommonEmptyState
      v-if="entries.length === 0"
      icon="i-lucide-clock"
      title="No search history"
      description="Words you search for will appear here."
    />
  </div>
</template>
