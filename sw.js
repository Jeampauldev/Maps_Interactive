// Service Worker para EduMap Barranquilla
// Versión del cache
const CACHE_NAME = 'edumap-barranquilla-v1.0.0';
const STATIC_CACHE = 'edumap-static-v1.0.0';
const DYNAMIC_CACHE = 'edumap-dynamic-v1.0.0';

// Recursos para cachear
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/styles/styles.css',
  '/src/components/script.js',
  '/src/assets/icons/icons.js',
  '/manifest.json',
  '/src/assets/logos/Logo_Simbolo.png',
  '/src/assets/fonts/SoftMaker - VolkswagenSerial.otf',
  '/src/assets/fonts/SoftMaker - Volkswagen Serial Bold.ttf',
  '/src/assets/fonts/SoftMaker - VolkswagenSerial-Heavy.otf',
  '/src/assets/fonts/SoftMaker - VolkswagenSerial-LightItalic.otf',
  // Leaflet assets
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  // FontAwesome
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Recursos dinámicos (imágenes, tiles del mapa)
const DYNAMIC_ASSETS_PATTERNS = [
  /\/src\/assets\/images\//,
  /tile\.openstreetmap\.org/,
  /cdnjs\.cloudflare\.com/
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalando...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Cacheando recursos estáticos');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Instalación completada');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Error durante la instalación:', error);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activando...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Eliminando cache obsoleto:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activación completada');
        return self.clients.claim();
      })
  );
});

// Interceptar peticiones de red
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Solo manejar peticiones GET
  if (request.method !== 'GET') {
    return;
  }
  
  // Estrategia Cache First para recursos estáticos
  if (STATIC_ASSETS.includes(request.url) || STATIC_ASSETS.includes(url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }
  
  // Estrategia Stale While Revalidate para recursos dinámicos
  if (DYNAMIC_ASSETS_PATTERNS.some(pattern => pattern.test(request.url))) {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }
  
  // Estrategia Network First para el resto
  event.respondWith(networkFirst(request));
});

// Estrategia Cache First
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Cache First error:', error);
    return new Response('Recurso no disponible offline', { status: 503 });
  }
}

// Estrategia Network First
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('Contenido no disponible', { status: 503 });
  }
}

// Estrategia Stale While Revalidate
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => cachedResponse);
  
  return cachedResponse || fetchPromise;
}

// Limpiar cache periódicamente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAN_CACHE') {
    cleanOldCache();
  }
});

async function cleanOldCache() {
  const cache = await caches.open(DYNAMIC_CACHE);
  const requests = await cache.keys();
  
  // Mantener solo los últimos 50 recursos dinámicos
  if (requests.length > 50) {
    const toDelete = requests.slice(0, requests.length - 50);
    await Promise.all(toDelete.map(request => cache.delete(request)));
    console.log(`Service Worker: Limpiados ${toDelete.length} recursos del cache`);
  }
}

// Notificaciones push (para futuras implementaciones)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/src/assets/logos/Logo_Simbolo.png',
        badge: '/src/assets/logos/Logo_Simbolo.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey
      },
      actions: [
        {
          action: 'explore',
          title: 'Explorar',
          icon: '/src/assets/logos/Logo_Simbolo.png'
        },
        {
          action: 'close',
          title: 'Cerrar'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Manejar clicks en notificaciones
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});