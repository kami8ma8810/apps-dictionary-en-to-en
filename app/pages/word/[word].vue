<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const searchStore = useSearchStore()
const bookmarkStore = useBookmarkStore()
const historyStore = useHistoryStore()

const word = computed(() => decodeURIComponent(route.params.word as string))
const isBookmarked = ref(false)

onMounted(async () => {
  await searchStore.search(word.value)
  isBookmarked.value = await bookmarkStore.isBookmarked(word.value)
})

watch(word, async (newWord) => {
  await searchStore.search(newWord)
  isBookmarked.value = await bookmarkStore.isBookmarked(newWord)
})

async function handleToggleBookmark() {
  await bookmarkStore.toggle(word.value)
  isBookmarked.value = await bookmarkStore.isBookmarked(word.value)
}

function handlePlayAudio(url: string) {
  const audio = new Audio(url)
  audio.play()
}

async function handleSelectRelatedWord(relatedWord: string) {
  await historyStore.add(relatedWord)
  router.push(`/word/${encodeURIComponent(relatedWord)}`)
}

const firstEntry = computed(() => searchStore.result?.entries[0])

const allSynonyms = computed(() => {
  if (!firstEntry.value) return []
  return [...new Set(firstEntry.value.meanings.flatMap(m => m.synonyms))]
})

const allAntonyms = computed(() => {
  if (!firstEntry.value) return []
  return [...new Set(firstEntry.value.meanings.flatMap(m => m.antonyms))]
})

function getHostname(url: string): string {
  try {
    return new URL(url).hostname
  }
  catch {
    return url
  }
}
</script>

<template>
  <div>
    <!-- Loading state -->
    <div
      v-if="searchStore.status === 'loading'"
      class="flex justify-center py-12"
    >
      <UIcon
        name="i-lucide-loader-2"
        class="size-8 animate-spin text-(--ui-text-muted)"
      />
    </div>

    <!-- Status announcement for screen readers -->
    <div
      aria-live="polite"
      class="sr-only"
    >
      <span v-if="searchStore.status === 'loading'">Loading definition...</span>
      <span v-if="searchStore.status === 'success' && firstEntry">
        Definition found for {{ word }}. {{ firstEntry.meanings.length }} meaning groups.
      </span>
      <span v-if="searchStore.status === 'not-found'">No definition found for {{ word }}.</span>
    </div>

    <!-- Not found -->
    <CommonEmptyState
      v-if="searchStore.status === 'not-found'"
      icon="i-lucide-search-x"
      title="No definitions found"
      :description="`We couldn't find a definition for '${word}'.`"
    />

    <!-- Error -->
    <CommonErrorDisplay
      v-if="searchStore.status === 'error'"
      :message="searchStore.errorMessage"
      retryable
      @retry="searchStore.search(word)"
    />

    <!-- Word detail -->
    <div
      v-if="searchStore.status === 'success' && firstEntry"
      class="space-y-6"
    >
      <WordHeader
        :word="firstEntry.word"
        :phonetics="firstEntry.phonetics"
        :bookmarked="isBookmarked"
        @toggle-bookmark="handleToggleBookmark"
        @play-audio="handlePlayAudio"
      />

      <USeparator />

      <div class="space-y-6">
        <WordMeaning
          v-for="(meaning, index) in firstEntry.meanings"
          :key="index"
          :meaning="meaning"
        />
      </div>

      <USeparator v-if="allSynonyms.length > 0 || allAntonyms.length > 0" />

      <WordRelated
        :synonyms="allSynonyms"
        :antonyms="allAntonyms"
        @select-word="handleSelectRelatedWord"
      />

      <div
        v-if="firstEntry.sourceUrls.length > 0"
        class="pt-2"
      >
        <p class="text-xs text-(--ui-text-dimmed)">
          Source:
          <a
            v-for="(url, index) in firstEntry.sourceUrls"
            :key="index"
            :href="url"
            target="_blank"
            rel="noopener noreferrer"
            class="underline"
          >
            {{ getHostname(url) }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
