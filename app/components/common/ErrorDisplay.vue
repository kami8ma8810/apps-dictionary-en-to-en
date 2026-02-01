<script setup lang="ts">
defineProps<{
  message: string
  retryable?: boolean
}>()

const emit = defineEmits<{
  retry: []
}>()
</script>

<template>
  <div
    role="alert"
    class="rounded-lg border border-(--ui-border) bg-(--ui-bg-elevated) p-4"
  >
    <div class="flex items-start gap-3">
      <UIcon
        name="i-lucide-alert-circle"
        class="mt-0.5 size-5 shrink-0 text-(--ui-error)"
      />
      <div>
        <p class="text-sm text-(--ui-text)">
          {{ message }}
        </p>
        <UButton
          v-if="retryable"
          label="Try again"
          variant="link"
          size="sm"
          class="mt-2"
          @click="emit('retry')"
        />
      </div>
    </div>
  </div>
</template>
