<script setup lang="ts">
const bookmarkStore = useBookmarkStore()
const folderStore = useFolderStore()

const activeFolderId = ref<number | null>(null)
const showCreateFolder = ref(false)

onMounted(async () => {
  await bookmarkStore.loadAll()
  await folderStore.loadAll()
})

async function handleRemove(word: string) {
  await bookmarkStore.remove(word)
  await bookmarkStore.loadAll()
}

async function handleCreateFolder(name: string) {
  await folderStore.add(name)
  await folderStore.loadAll()
}

function handleSelectFolder(folderId: number | null) {
  activeFolderId.value = folderId
}
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-xl font-bold text-(--ui-text-highlighted)">
      Bookmarks
    </h1>

    <BookmarkFolderList
      :folders="folderStore.folders"
      :active-folder-id="activeFolderId"
      @select="handleSelectFolder"
      @create="showCreateFolder = true"
    />

    <div class="space-y-2">
      <BookmarkCard
        v-for="bookmark in bookmarkStore.bookmarks"
        :key="bookmark.id"
        :bookmark="bookmark"
        @remove="handleRemove"
      />
    </div>

    <CommonEmptyState
      v-if="bookmarkStore.bookmarks.length === 0"
      icon="i-lucide-bookmark"
      title="No bookmarks yet"
      description="Search for a word and tap the bookmark icon to save it."
    />

    <BookmarkFolderCreateDialog
      v-model:open="showCreateFolder"
      @create="handleCreateFolder"
    />
  </div>
</template>
