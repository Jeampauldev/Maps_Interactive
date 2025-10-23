// Versión del Service Worker
const CACHE_NAME = 'mapa-barranquilla-v2';

// Recursos esenciales para precachear
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/src/styles/styles.css',
  '/src/components/script.js',
  '/src/libs/leaflet.css',
  '/src/libs/leaflet.js',
  '/src/libs/font-awesome.css',
  '/src/assets/logos/Logos_Juntos.png',
  '/src/assets/icons/icono_ubicacion.xml',
  '/src/assets/icons/icono_ubicacion_naranja.xml',
  '/src/data/puntos_criticos.json',
  '/src/data/puntos_voluminosos.json',
  '/src/data/barrios_ultra_optimizado.geojson',
  '/src/webfonts/fa-solid-900.woff2'
];

/**
 * Evento de instalación:
 * Se dispara cuando el Service Worker se instala.
 * Abre el cache y guarda los recursos estáticos.
 */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Cache abierto. Cacheando recursos estáticos para uso offline.');

        // Cachear recursos de forma individual para ser más resiliente a fallos
        const cachePromises = ASSETS_TO_CACHE.map(asset => {
            return cache.add(asset).catch(err => {
                console.warn(`[SW] No se pudo cachear el recurso: ${asset}`, err);
            });
        });

        return Promise.all(cachePromises);
      })
      .then(() => self.skipWaiting()) // Forzar la activación del nuevo SW
      .catch(err => console.error('[SW] Falló la instalación del cache:', err))
  );
});

/**
 * Evento de activación:
 * Se dispara cuando el Service Worker se activa.
 * Limpia los caches antiguos para liberar espacio.
 */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Tomar control inmediato de las páginas
  );
});

/**
 * Evento de fetch:
 * Intercepta todas las peticiones de red.
 * Implementa una estrategia de "Cache First" para los recursos de la aplicación
 * y "Stale-While-Revalidate" para recursos de terceros como los tiles del mapa.
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Ignorar peticiones que no sean GET
  if (request.method !== 'GET') {
    return;
  }

  // Estrategia: Cache First para recursos propios
  if (request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        // Si el recurso está en el cache, devolverlo
        if (cachedResponse) {
          return cachedResponse;
        }

        // Si no, buscarlo en la red
        return fetch(request);
      })
    );
    return;
  }

  // Estrategia: Stale-While-Revalidate para recursos de terceros (tiles del mapa, etc.)
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(request).then((cachedResponse) => {
        // Realizar la petición a la red en segundo plano
        const fetchPromise = fetch(request).then((networkResponse) => {
          // Si la petición es exitosa, actualizar el cache
          if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        });

        // Devolver la respuesta del cache si existe, si no, esperar la respuesta de la red
        return cachedResponse || fetchPromise;
      });
    })
  );
});