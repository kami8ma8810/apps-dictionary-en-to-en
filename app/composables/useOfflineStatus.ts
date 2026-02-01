import { ref, onMounted, onUnmounted } from 'vue'

function useOfflineStatus() {
  const isOffline = ref(false)

  function handleOnline() {
    isOffline.value = false
  }

  function handleOffline() {
    isOffline.value = true
  }

  onMounted(() => {
    isOffline.value = !navigator.onLine
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
  })

  onUnmounted(() => {
    window.removeEventListener('online', handleOnline)
    window.removeEventListener('offline', handleOffline)
  })

  return { isOffline }
}

export { useOfflineStatus }
