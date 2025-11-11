self.addEventListener('install', e=>{self.skipWaiting();e.waitUntil(caches.open('bio1m-oa7').then(c=>c.addAll(['./','./index.html','./styles.css','./script.js','./manifest.json'])))});
self.addEventListener('activate', e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));