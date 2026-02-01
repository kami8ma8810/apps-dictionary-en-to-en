<script setup lang="ts">
import type { Folder } from '~/types/bookmark'

defineProps<{
  folders: Folder[]
  activeFolderId: number | null
}>()

const emit = defineEmits<{
  select: [folderId: number | null]
  create: []
}>()
</script>

<template>
  <div class="flex items-center gap-2 overflow-x-auto pb-2">
    <UButton
      label="All"
      :variant="activeFolderId === null ? 'solid' : 'outline'"
      :color="activeFolderId === null ? 'neutral' : 'neutral'"
      size="sm"
      @click="emit('select', null)"
    />
    <UButton
      v-for="folder in folders"
      :key="folder.id"
      :label="folder.name"
      :variant="activeFolderId === folder.id ? 'solid' : 'outline'"
      :color="'neutral'"
      size="sm"
      @click="emit('select', folder.id!)"
    />
    <UButton
      icon="i-lucide-plus"
      variant="outline"
      color="neutral"
      size="sm"
      aria-label="Create new folder"
      @click="emit('create')"
    />
  </div>
</template>
