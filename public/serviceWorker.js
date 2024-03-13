/* eslint-disable no-undef */
const CACHE_NAME = "version-1";
const urlsToCache = [ 'index.html', 'offline.html' ];

const self = this;

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    )
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request) 
                    .catch(() => caches.match('offline.html'))
            })
    )
});

// Activate the SW
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
            
    )
});

// Push Notification

self.addEventListener("push", (e) => {
    let payload = e.data.json();
    const options = {
        data: {
            url: payload?.["url"]
        },
        icon: "images/logo.png",
        body: `${payload?.["card"]}`
    }
    e.waitUntil(self.registration.showNotification(payload?.["title"], options));
})

// Notificatin Click

self.addEventListener('notificationclick', (e) => {
    let payload = e.notification.data;
    e.notification.close();
    e.waitUntil(
        clients.matchAll({ type: "window" }).then((clientsArr) => {
          const hadWindowToFocus = clientsArr.some((windowClient) =>
            windowClient.url === payload?.["url"]
              ? (windowClient.focus(), true)
              : false,
          );

          if (!hadWindowToFocus)
            clients
              .openWindow(e.notification.data.url)
              .then((windowClient) => (windowClient ? windowClient.focus() : null));
        }),
      );
})