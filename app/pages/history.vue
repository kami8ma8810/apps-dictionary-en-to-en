<script setup lang="ts">
const router = useRouter()
const historyStore = useHistoryStore()

onMounted(async () => {
  await historyStore.loadRecent()
})

async function handleSelect(word: string) {
  await historyStore.add(word)
  router.push(`/word/${encodeURIComponent(word)}`)
}

async function handleRemove(id: number) {
  await historyStore.remove(id)
  await historyStore.loadRecent()
}

async function handleClearAll() {
  await historyStore.clearAll()
  await historyStore.loadRecent()
}
</script>

<template>
  <div>
    <HistoryHistoryList
      :entries="historyStore.entries"
      @select="handleSelect"
      @remove="handleRemove"
      @clear-all="handleClearAll"
    />
  </div>
</template>
