// src/components/mapa/mapa.js

import { CONFIG } from '../config.js';

let map;
let puntosLayer;
let barriosLayer;

/**
 * Inicializa el mapa de Leaflet.
 * @returns {Promise<L.Map>} Una promesa que se resuelve con la instancia del mapa.
 */
export async function initializeMap() {
    console.log('🗺️ Iniciando inicialización del mapa...');

    // Verificar que Leaflet esté disponible
    if (typeof L === 'undefined') {
        console.error('❌ Leaflet no está disponible. Verifica que se haya cargado correctamente.');
        throw new Error('Leaflet no está disponible');
    }
    console.log('✅ Leaflet está disponible');

    // Verificar que el contenedor del mapa exista
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
        console.error('❌ No se encontró el contenedor del mapa con id="map"');
        throw new Error('Contenedor del mapa no encontrado');
    }
    console.log('✅ Contenedor del mapa encontrado:', mapContainer);

    // Crear el mapa
    map = L.map('map', {
        center: CONFIG.BARRANQUILLA_COORDS,
        zoom: CONFIG.DEFAULT_ZOOM,
        minZoom: CONFIG.MIN_ZOOM,
        maxZoom: CONFIG.MAX_ZOOM,
        zoomControl: false,
        preferCanvas: true,
    });
    console.log('✅ Mapa creado exitosamente:', map);

    // Crear capas de mapa
    const mapLayers = {};
    Object.keys(CONFIG.MAP_LAYERS).forEach(key => {
        const layer = CONFIG.MAP_LAYERS[key];
        mapLayers[key] = L.tileLayer(layer.url, {
            attribution: layer.attribution,
        });
    });

    // Agregar capa base por defecto
    mapLayers.minimal.addTo(map);

    // Cargar capa de barrios
    barriosLayer = await createCustomBarriosLayer();
    barriosLayer.addTo(map);

    // Crear capa para los puntos
    puntosLayer = L.layerGroup().addTo(map);

    // Agregar control de zoom
    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);

    return map;
}

/**
 * Crea una capa de barrios personalizada.
 * @returns {Promise<L.Layer>} Una promesa que se resuelve con la capa de barrios.
 */
async function createCustomBarriosLayer() {
    try {
        const response = await fetch('./src/data/barrios_ultra_optimizado.geojson');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const geojsonData = await response.json();

        const barriosLayer = L.geoJSON(geojsonData, {
            style: (feature) => {
                return {
                    color: '#03588C',
                    fillColor: 'transparent',
                    fillOpacity: 0,
                    weight: 0.8,
                    opacity: 0.8
                };
            },
        });

        return barriosLayer;
    } catch (error) {
        console.error('Error cargando los barrios de Barranquilla:', error);
        return L.layerGroup(); // Devuelve una capa vacía en caso de error
    }
}

/**
 * Crea un marcador de punto crítico en el mapa.
 * @param {object} punto - Los datos del punto.
 * @param {string} cachedIconSvg - El SVG del icono cacheado.
 * @returns {L.Marker} El marcador creado.
 */
export function createPuntoCriticoMarker(punto, cachedIconSvg) {
    const coordinates = [punto.geometry.coordinates[1], punto.geometry.coordinates[0]];
    const properties = punto.properties;

    if (!cachedIconSvg) {
        console.error(`❌ Plantilla de ícono verde no disponible para ${properties.id}`);
        return null;
    }
    const iconHtml = cachedIconSvg.replace('{{ID}}', properties.id || 'N/A');

    const icon = L.divIcon({
        className: 'custom-point-marker',
        html: iconHtml,
        iconSize: [30, 30],
        iconAnchor: [15, 28],
        popupAnchor: [0, -30]
    });

    const marker = L.marker(coordinates, { icon })
        .bindPopup(createPuntoCriticoPopupContent(properties, coordinates), {
            maxWidth: 380,
            className: 'punto-critico-popup-wrapper'
        });

    puntosLayer.addLayer(marker);
    return marker;
}

/**
 * Crea un marcador de punto voluminoso en el mapa.
 * @param {object} punto - Los datos del punto.
 * @param {string} cachedOrangeIconSvg - El SVG del icono naranja cacheado.
 * @returns {L.Marker} El marcador creado.
 */
export function createPuntoVoluminosoMarker(punto, cachedOrangeIconSvg) {
    const coordinates = [punto.geometry.coordinates[1], punto.geometry.coordinates[0]];
    const properties = punto.properties;

    if (!cachedOrangeIconSvg) {
        console.error(`❌ Plantilla de ícono naranja no disponible para ${properties.id}`);
        return null;
    }
    const iconHtml = cachedOrangeIconSvg.replace('{{ID}}', properties.id || 'N/A');

    const icon = L.divIcon({
        className: 'custom-point-marker',
        html: iconHtml,
        iconSize: [30, 30],
        iconAnchor: [15, 28],
        popupAnchor: [0, -30]
    });

    const marker = L.marker(coordinates, { icon })
        .bindPopup(createPuntoCriticoPopupContent(properties, coordinates), {
            maxWidth: 300,
            className: 'punto-critico-popup-wrapper'
        });

    puntosLayer.addLayer(marker);
    return marker;
}

/**
 * Limpia todos los marcadores del mapa.
 */
export function clearMarkers() {
    puntosLayer.clearLayers();
}

/**
 * Crea el contenido HTML para el popup de un punto crítico.
 * @param {object} properties - Las propiedades del punto.
 * @param {Array} coordinates - Las coordenadas del punto.
 * @returns {string} El contenido HTML del popup.
 */
function createPuntoCriticoPopupContent(properties, coordinates) {
    const formatNumber = (num) => num ? parseFloat(num).toLocaleString('es-CO') : '0';
    const isVoluminoso = properties.id && properties.id.startsWith('VL');
    const pointTitle = isVoluminoso ? `Residuo Voluminoso ${properties.id || 'N/A'}` : `Punto Crítico ${properties.id || 'N/A'}`;

    return `
        <div class="popup-container" style="font-family: var(--font-family); max-width: 280px;">
            <div class="popup-header" style="background-color: #FFFFFF; color: #374151; padding: 4px 8px 0 8px;">
                <h4 style="margin: 0; font-size: 14px; font-weight: 700; line-height: 1.2;">${pointTitle}</h4>
                <p style="margin: 1px 0 0; font-size: 11px; opacity: 0.9; line-height: 1.2;">Barrio: ${properties.barrio || 'No especificado'}</p>
            </div>

            <div style="padding: 0 8px;">
                <div style="display: flex; justify-content: space-around; align-items: flex-start; padding-top: 4px; margin-bottom: 4px; text-align: center;">
                    <div title="Población Impactada">
                        <i class="fas fa-users" style="color: #16a34a; font-size: 12px; margin-bottom: 2px;"></i>
                        <p style="margin: 0; font-weight: 600; color: #374151; font-size: 12px; line-height: 1.1;">${formatNumber(properties.poblacion_impactada)}</p>
                        <p style="margin: 0; font-size: 8px; color: #6b7280; line-height: 1.1;">Población Impactada</p>
                    </div>
                    <div title="Toneladas de CO₂ Equivalente">
                        <i class="fas fa-smog" style="color: #16a34a; font-size: 12px; margin-bottom: 2px;"></i>
                        <p style="margin: 0; font-weight: 600; color: #374151; font-size: 12px; line-height: 1.1;">${formatNumber(properties.toneladas_co2_equivalente)}</p>
                        <p style="margin: 0; font-size: 8px; color: #6b7280; line-height: 1.1;">Ton CO₂ Equiv.</p>
                    </div>
                    ${!isVoluminoso ? `
                    <div title="Área Recuperada">
                        <i class="fas fa-leaf" style="color: #16a34a; font-size: 12px; margin-bottom: 2px;"></i>
                        <p style="margin: 0; font-weight: 600; color: #374151; font-size: 12px; line-height: 1.1;">${formatNumber(properties.area_recuperada_m2)}</p>
                        <p style="margin: 0; font-size: 8px; color: #6b7280; line-height: 1.1;">m² Recuperados</p>
                    </div>` : ''}
                </div>
            </div>
        </div>
    `;
}
