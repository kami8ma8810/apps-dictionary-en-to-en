# EN-to-EN Dictionary

[![Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)

English-to-English dictionary PWA. Look up words using English definitions instead of translating to your native language.

## Tech Stack

| Category | Choice |
|----------|--------|
| Framework | Nuxt 4 (Vue 3) / SPA (`ssr: false`) |
| Language | TypeScript (strict) |
| State | Pinia (Setup Store) |
| IndexedDB | Dexie.js |
| UI | Nuxt UI v3 (Reka UI) |
| PWA | @vite-pwa/nuxt |
| Utility | VueUse |
| Dictionary API | Free Dictionary API |
| Examples API | Wordnik API |
| Spelling API | Datamuse API |
| Unit Test | Vitest + vitest-axe + @testing-library/vue |
| E2E Test | Playwright + @axe-core/playwright |

## Features

- Search English words and view English definitions
- Phonetic notation and audio pronunciation (normal / slow speed)
- Example sentences from Wordnik API (collapsible)
- Synonyms and antonyms display
- Spelling suggestions on not-found (Datamuse API)
- Bookmark and search history (IndexedDB)
- Folder-based bookmark organization
- PWA with offline caching (Workbox)
- WCAG 2.2 AA accessibility

## Setup

```bash
pnpm install
```

### Environment Variables

Copy `.env.example` and set your API keys:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `NUXT_PUBLIC_WORDNIK_API_KEY` | Wordnik API key for example sentences |

## Development

```bash
pnpm dev
```

## Test

```bash
pnpm test          # unit tests
pnpm test:watch    # watch mode
pnpm test:e2e      # Playwright E2E
pnpm test:a11y     # pa11y accessibility
pnpm typecheck     # TypeScript type check
```

## Build

```bash
pnpm build
pnpm preview       # preview production build
```

## Project Structure

```
app/
  components/    -- UI components
  composables/   -- Vue composables
  database/      -- Dexie schema + repositories
  layouts/       -- Nuxt layouts
  pages/         -- Page components
  plugins/       -- Nuxt plugins
  services/      -- API abstraction layer
  stores/        -- Pinia stores
public/          -- Static assets
tests/           -- Test files
types/           -- Type definitions
```
