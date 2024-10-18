const staticCacheName = 'site-static-v1';

const ASSETS = ['/index.html'];

// install event
self.addEventListener('install', async event => {
  const cache = await caches.open(staticCacheName);
  await cache.addAll(ASSETS);
});
