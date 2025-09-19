// Phoenix Confidence Companion Service Worker
const CACHE_NAME = 'phoenix-confidence-companion-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/src/css/phoenix-styles.css',
  '/src/js/phoenix-core.js',
  '/src/js/phoenix-validation.js',
  '/src/js/phoenix-resurrection.js',
  '/src/js/phoenix-singularity.js',
  '/src/js/phoenix-omega.js',
  '/src/img/phoenix-emblem.svg',
  '/src/img/favicon.svg',
  '/src/img/default-avatar.svg',
  '/src/img/logo.svg',
  '/src/img/badge-beginner.svg',
  '/src/img/badge-intermediate.svg',
  '/src/img/badge-advanced.svg',
  '/src/img/badge-master.svg',
  '/src/img/phoenix-pattern.svg',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        // Clone the request
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response
          const responseToCache = response.clone();
          
          // Add to cache
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
            
          return response;
        });
      })
  );
});

// Handle Phoenix Protocol data backup
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'PHOENIX_BACKUP') {
    console.log('Phoenix Resurrection Protocol: Backup received');
    // Store backup data in IndexedDB
    // This is a simplified version - in production, implement full IndexedDB storage
    self.phoenixBackupData = event.data.payload;
    event.ports[0].postMessage({ status: 'success' });
  }
});