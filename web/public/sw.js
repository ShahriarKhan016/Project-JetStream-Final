/**
 * Service Worker for JetStream PWA
 * Enables offline functionality and caching
 */

const CACHE_NAME = 'jetstream-v3' // Updated to clear old cache
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...')
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => self.skipWaiting())
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...')
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cache)
            return caches.delete(cache)
          }
        })
      )
    }).then(() => self.clients.claim())
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return

  // Skip API requests - always fetch fresh
  if (event.request.url.includes('deezer.com') || 
      event.request.url.includes('lyrics.ovh') ||
      event.request.url.includes('corsproxy.io') ||
      event.request.url.includes('allorigins.win')) {
    return event.respondWith(fetch(event.request))
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request)
          .then((fetchResponse) => {
            // Cache successful responses
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, fetchResponse.clone())
              return fetchResponse
            })
          })
      })
      .catch(() => {
        // Return offline page if available
        if (event.request.mode === 'navigate') {
          return caches.match('/')
        }
      })
  )
})
