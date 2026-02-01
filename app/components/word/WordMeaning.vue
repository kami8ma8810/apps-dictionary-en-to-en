<script setup lang="ts">
import type { Meaning } from '~/types/dictionary'

defineProps<{
  meaning: Meaning
}>()

const partOfSpeechHints: Record<string, string> = {
  noun: 'a word for a person, place, or thing (e.g. "dog", "school", "happiness")',
  verb: 'a word that shows action or being (e.g. "run", "think", "is")',
  adjective: 'a word that describes a noun (e.g. "big", "happy", "blue")',
  adverb: 'a word that describes a verb (e.g. "quickly", "very", "always")',
  pronoun: 'a word used in place of a noun (e.g. "he", "she", "they")',
  preposition: 'a word that shows relation between words (e.g. "in", "on", "at")',
  conjunction: 'a word that connects words or sentences (e.g. "and", "but", "or")',
  interjection: 'a word that expresses a feeling (e.g. "oh!", "wow!", "ouch!")',
  exclamation: 'a word that expresses a feeling (e.g. "oh!", "wow!", "ouch!")',
}
</script>

<template>
  <section class="space-y-3">
    <div class="flex items-center gap-1.5">
      <UBadge
        :label="meaning.partOfSpeech"
        variant="subtle"
        color="neutral"
        size="md"
      />
      <span
        v-if="partOfSpeechHints[meaning.partOfSpeech]"
        class="text-xs text-(--ui-text-dimmed)"
      >
        — {{ partOfSpeechHints[meaning.partOfSpeech] }}
      </span>
    </div>
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
