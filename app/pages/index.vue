<script setup lang="ts">
const router = useRouter()
const searchStore = useSearchStore()
const historyStore = useHistoryStore()
const bookmarkStore = useBookmarkStore()

const searchQuery = ref('')

onMounted(async () => {
  await bookmarkStore.loadAll()
})

async function handleSearch(word: string) {
  await historyStore.add(word)
  router.push(`/word/${encodeURIComponent(word)}`)
}

async function handleRemoveBookmark(word: string) {
  await bookmarkStore.remove(word)
  await bookmarkStore.loadAll()
}
</script>

<template>
  <div class="space-y-8">
    <div class="pt-8 text-center md:pt-16">
      <h1 class="mb-6 text-2xl font-bold text-(--ui-text-highlighted)">
        English-to-English Dictionary
      </h1>
      <SearchBar
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

    <div v-if="bookmarkStore.bookmarks.length > 0">
      <p class="mb-2 text-sm font-medium text-(--ui-text-muted)">
        Bookmarks
      </p>
      <div class="space-y-2">
        <BookmarkCard
          v-for="bookmark in bookmarkStore.bookmarks"
          :key="bookmark.id"
          :bookmark="bookmark"
          @remove="handleRemoveBookmark"
        />
      </div>
    </div>
  </div>
</template>
