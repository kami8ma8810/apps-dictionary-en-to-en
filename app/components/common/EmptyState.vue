<script setup lang="ts">
defineProps<{
  icon?: string
  title: string
  description?: string
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 text-center">
    <UIcon
      v-if="icon"
      :name="icon"
      class="mb-3 size-12 text-(--ui-text-dimmed)"
    />
    <p class="text-base font-medium text-(--ui-text-muted)">
      {{ title }}
    </p>
    <p
      v-if="description"
      class="mt-1 text-sm text-(--ui-text-dimmed)"
    >
      {{ description }}
    </p>
  </div>
</template>
