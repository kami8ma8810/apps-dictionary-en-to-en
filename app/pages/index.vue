<script setup lang="ts">
const router = useRouter()
const searchStore = useSearchStore()
const historyStore = useHistoryStore()

const searchQuery = ref('')

onMounted(async () => {
  await historyStore.loadRecent(10)
})

async function handleSearch(word: string) {
  await historyStore.add(word)
  await historyStore.loadRecent(10)
  router.push(`/word/${encodeURIComponent(word)}`)
}

async function handleRemoveHistory(id: number) {
  await historyStore.remove(id)
  await historyStore.loadRecent(10)
}
</script>

<template>
  <div class="space-y-8">
    <div class="pt-8 text-center md:pt-16">
      <h1 class="mb-6 text-2xl font-bold text-(--ui-text-highlighted)">
        English-to-English Dictionary
      </h1>
      <SearchSearchBar
        v-model="searchQuery"
        @search="handleSearch"
      />
    </div>

    <!-- Status announcement for screen readers -->
    <div
      aria-live="polite"
      class="sr-only"
    >
      <span v-if="searchStore.status === 'loading'">Searching...</span>
    </div>

    <SearchSearchSuggestions
      :entries="historyStore.entries"
      @select="handleSearch"
      @remove="handleRemoveHistory"
    />
  </div>
</template>
