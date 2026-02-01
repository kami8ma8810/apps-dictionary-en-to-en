<script setup lang="ts">
import type { Meaning } from '~/types/dictionary'

defineProps<{
  meaning: Meaning
}>()
</script>

<template>
  <section class="space-y-3">
    <UBadge
      :label="meaning.partOfSpeech"
      variant="subtle"
      color="neutral"
      size="md"
    />
    <ol class="space-y-3 pl-1">
      <WordDefinition
        v-for="(def, index) in meaning.definitions"
        :key="index"
        :definition="def"
        :index="index"
      />
    </ol>
  </section>
</template>
