<script setup lang="ts">
import { useOfflineStatus } from '~/composables/useOfflineStatus'

const { isOffline } = useOfflineStatus()
</script>

<template>
  <div
    v-if="isOffline"
    role="alert"
    class="bg-(--ui-color-warning-50) text-(--ui-color-warning-700) border-b border-(--ui-color-warning-200) px-4 py-2 text-center text-sm"
  >
    You are offline. Some features may be unavailable.
  </div>
</template>
