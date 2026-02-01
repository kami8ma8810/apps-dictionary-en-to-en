<script setup lang="ts">
import type { Definition } from '~/types/dictionary'

defineProps<{
  definition: Definition
  index: number
}>()
</script>

<template>
  <li class="text-sm leading-relaxed text-(--ui-text)">
    <span class="mr-1 font-medium text-(--ui-text-muted)">{{ index + 1 }}.</span>
    {{ definition.definition }}
    <p
      v-if="definition.example"
      class="mt-1 italic text-(--ui-text-muted)"
    >
      "{{ definition.example }}"
    </p>
  </li>
</template>
