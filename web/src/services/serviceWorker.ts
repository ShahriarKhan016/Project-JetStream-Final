/**
 * Service Worker Registration
 * Registers the SW for PWA functionality
 */

export function registerServiceWorker() {
  // Temporarily disabled service worker due to CORS issues with lyrics API
  console.log('⚠️ Service Worker disabled temporarily for lyrics API compatibility')
  
  // Unregister any existing service workers
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister()
        console.log('🗑️ Unregistered existing service worker')
      })
    })
  }
}

export function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister()
        console.log('🗑️ Service Worker unregistered')
      })
      .catch((error) => {
        console.error('Error unregistering service worker:', error)
      })
  }
}
