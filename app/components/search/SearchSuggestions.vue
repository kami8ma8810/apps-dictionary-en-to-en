<script setup lang="ts">
import type { SearchHistoryEntry } from '~/types/history'

defineProps<{
  entries: SearchHistoryEntry[]
}>()

const emit = defineEmits<{
  select: [word: string]
  remove: [id: number]
}>()
</script>

<template>
  <div v-if="entries.length > 0">
    <p class="mb-2 text-sm font-medium text-(--ui-text-muted)">
      Recent searches
    </p>
    <ul class="space-y-1">
      <li
        v-for="entry in entries"
        :key="entry.id"
      >
        <div class="flex items-center justify-between rounded-md px-3 py-2 hover:bg-(--ui-bg-elevated)">
          <button
            class="flex flex-1 items-center gap-2 text-left text-sm text-(--ui-text)"
            @click="emit('select', entry.word)"
          >
            <UIcon
              name="i-lucide-clock"
              class="size-4 text-(--ui-text-dimmed)"
            />
            {{ entry.word }}
          </button>
          <UButton
            icon="i-lucide-x"
            variant="ghost"
            color="neutral"
            size="xs"
            :aria-label="`Remove ${entry.word} from history`"
            @click="emit('remove', entry.id!)"
          />
        </div>
      </li>
    </ul>
  </div>
</template>
