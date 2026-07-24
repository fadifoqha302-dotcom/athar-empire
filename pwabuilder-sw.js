// PWA Service Worker
const CACHE_NAME = 'athar-empire-v24';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&family=Changa:wght@500;700;800&display=swap'
];

// تثبيت Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// تنظيف الـ Caches القديمة
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// استراتيجية Network First مع Cache Fallback
self.addEventListener('fetch', (event) => {
  // تجاهل الطلبات غير-GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME)
          .then((cache) => cache.put(event.request, responseToCache));
        return response;
      })
      .catch(() => {
        return caches.match(event.request)
          .then((response) => response || new Response('Offline'));
      })
  );
});
