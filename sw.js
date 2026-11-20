// Offline cache. Same-origin files: serve cached, refresh in background (new version shows on next launch).
// Pinned CDN files (three@0.160.0, fonts): cache-first.
const CACHE = 'tank3d-v1';
const ICONS = ['ap','coax','dozer','engine','he','loader','plate','rearmg','repair','roofmortar','skirts','turret'].map(n => `icons/${n}.webp`);
const PRECACHE = [
  './', 'index.html', 'models.js', 'manifest.webmanifest', 'pwa/icon-192.png', 'pwa/icon-512.png', ...ICONS,
  'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js',
  'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js',
  'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/utils/BufferGeometryUtils.js',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === location.origin;
  const key = req.mode === 'navigate' ? 'index.html' : req;

  if (sameOrigin) {
    e.respondWith(caches.open(CACHE).then(async c => {
      const hit = await c.match(key, {ignoreSearch: true});
      const net = fetch(req).then(r => { if (r.ok) c.put(key, r.clone()); return r; });
      if (hit) { e.waitUntil(net.catch(() => {})); return hit; }
      return net;
    }));
  } else if (/cdn\.jsdelivr\.net|fonts\.(googleapis|gstatic)\.com/.test(url.host)) {
    e.respondWith(caches.open(CACHE).then(async c => {
      const hit = await c.match(req);
      if (hit) return hit;
      const r = await fetch(req);
      if (r.ok || r.type === 'opaque') c.put(req, r.clone());
      return r;
    }));
  }
});
