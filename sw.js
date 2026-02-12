/* eslint-env es6 */
const CACHE_NAME = 'member-list-cache-v1';
const urlsToCache = [
  './', // 今のHTMLファイル
  'https://res.cloudinary.com/...' // Cloudinaryの画像などもキャッシュ対象にできる
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // キャッシュがあればそれを返し、なければネットに取りに行く
      return response || fetch(event.request);
    })
  );
});