<script setup lang="ts">
const route = useRoute()

const navItems = [
  { label: 'Search', icon: 'i-lucide-search', to: '/' },
  { label: 'Bookmarks', icon: 'i-lucide-bookmark', to: '/bookmarks' },
  { label: 'History', icon: 'i-lucide-clock', to: '/history' }
]

function isActive(to: string): boolean {
  if (to === '/') {
    return route.path === '/' || route.path.startsWith('/word/')
  }
  return route.path.startsWith(to)
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-(--ui-bg)">
    <!-- Header -->
    <header class="sticky top-0 z-50 border-b border-(--ui-border) bg-(--ui-bg)">
      <div class="mx-auto flex h-12 max-w-3xl items-center justify-between px-4">
        <NuxtLink
          to="/"
          class="text-lg font-bold text-(--ui-text-highlighted)"
        >
          EN Dictionary
        </NuxtLink>
        <UColorModeButton />
      </div>
    </header>

    <!-- Desktop sidebar + content -->
    <div class="mx-auto flex w-full max-w-5xl flex-1">
      <!-- Sidebar (desktop only) -->
      <nav
        class="hidden w-48 shrink-0 border-r border-(--ui-border) p-4 md:block"
        aria-label="Main navigation"
      >
        <ul class="space-y-1">
          <li
            v-for="item in navItems"
            :key="item.to"
          >
            <UButton
              :to="item.to"
              :icon="item.icon"
              :label="item.label"
              variant="ghost"
              color="neutral"
              block
              class="justify-start"
              :class="isActive(item.to) ? 'font-bold bg-(--ui-bg-elevated)' : ''"
            />
          </li>
        </ul>
      </nav>

      <!-- Main content -->
      <main
        id="main-content"
        class="min-h-0 flex-1 px-4 py-6 pb-20 md:pb-6"
      >
        <div class="mx-auto max-w-2xl">
          <slot />
        </div>
      </main>
    </div>

    <!-- Bottom navigation (mobile only) -->
    <nav
      class="fixed inset-x-0 bottom-0 z-50 border-t border-(--ui-border) bg-(--ui-bg) md:hidden"
      aria-label="Main navigation"
    >
      <ul class="flex h-14 items-center justify-around">
        <li
          v-for="item in navItems"
          :key="item.to"
        >
          <NuxtLink
            :to="item.to"
            class="flex flex-col items-center gap-0.5 px-4 py-1"
            :class="isActive(item.to) ? 'text-(--ui-text-highlighted) font-bold' : 'text-(--ui-text-muted)'"
          >
            <UIcon
              :name="item.icon"
              class="size-5"
            />
            <span class="text-xs">{{ item.label }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>
