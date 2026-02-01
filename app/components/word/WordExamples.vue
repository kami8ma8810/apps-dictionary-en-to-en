<script setup lang="ts">
interface WordExamplesProps {
  examples: string[]
}

const props = defineProps<WordExamplesProps>()

const isOpen = ref(false)
const panelId = useId()

function toggle() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div v-if="props.examples.length > 0">
    <button
      type="button"
      :aria-expanded="isOpen"
      :aria-controls="panelId"
      class="flex items-center gap-1.5 text-sm font-medium text-(--ui-text-muted) hover:text-(--ui-text) transition-colors cursor-pointer"
      @click="toggle"
    >
      <UIcon
        :name="isOpen ? 'i-lucide-chevron-down' : 'i-lucide-chevron-right'"
        class="size-4"
      />
      Example sentences ({{ props.examples.length }})
    </button>
    <ul
      v-show="isOpen"
      :id="panelId"
      role="list"
      class="mt-2 space-y-1.5 pl-6"
    >
      <li
        v-for="(example, index) in props.examples"
        :key="index"
        class="text-sm text-(--ui-text-toned) italic"
      >
        {{ example }}
      </li>
    </ul>
  </div>
</template>
