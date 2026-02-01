<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })

const emit = defineEmits<{
  create: [name: string]
}>()

const folderName = ref('')

function handleSubmit() {
  if (folderName.value.trim()) {
    emit('create', folderName.value.trim())
    folderName.value = ''
    open.value = false
  }
}

function handleCancel() {
  folderName.value = ''
  open.value = false
}
</script>

<template>
  <UModal
    v-model:open="open"
    title="Create Folder"
  >
    <template #body>
      <form
        class="space-y-4"
        @submit.prevent="handleSubmit"
      >
        <UInput
          v-model="folderName"
          placeholder="Folder name"
          aria-label="Folder name"
          autofocus
        />
        <div class="flex justify-end gap-2">
          <UButton
            label="Cancel"
            variant="outline"
            color="neutral"
            @click="handleCancel"
          />
          <UButton
            type="submit"
            label="Create"
            :disabled="!folderName.trim()"
          />
        </div>
      </form>
    </template>
  </UModal>
</template>
