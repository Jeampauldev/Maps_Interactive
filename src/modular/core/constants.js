/**
 * ===== CONSTANTES CENTRALIZADAS =====
 * Archivo: src/modular/core/constants.js
 * 
 * Propósito: Centralizar todas las constantes del proyecto
 * Estado: ✅ COPIADO desde script.js líneas 1-44 (ORIGINAL INTACTO)
 * 
 * FUENTE: src/components/script.js líneas 1-44
 * Copiado el: 20 Septiembre 2025
 */

// ===== CONFIGURACIÓN GLOBAL COPIADA =====
export const CONFIG = {
    // Coordenadas de Barranquilla, Atlántico, Colombia
    BARRANQUILLA_COORDS: [10.9639, -74.7964],
    DEFAULT_ZOOM: 12,
    MAX_ZOOM: 18,
    MIN_ZOOM: 10,
    
    // Colores por tipo de institución (Paleta personalizada)
    INSTITUTION_COLORS: {
        universidad: '#03588C',  // azul fuerte
        colegio: '#03A63C',     // Verde resal
        tecnico: '#F2CE16'      // Amarillo el
    },
    
    // Configuración de mapas
    MAP_STYLES: {
        default: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        terrain: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
    }
};

// ===== CONFIGURACIÓN DE CAPAS COPIADA =====
export const MAP_LAYERS = {
    detailed: {
        name: 'Detallado',
        url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        errorTileUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='
    },
    minimal: {
        name: 'Minimalista',
        url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        errorTileUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='
    },
    dark: {
        name: 'Oscuro',
        url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        errorTileUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='
    }
};

// ===== MENSAJES Y TEXTOS =====
export const MESSAGES = {
    loading: 'Cargando mapa de Barranquilla...',
    loadingData: 'Cargando puntos críticos...',
    error: 'Ha ocurrido un error',
    errorLoadingMap: 'Error al cargar el mapa',
    errorLoadingData: 'Error cargando datos del mapa',
    locationFound: 'Ubicación encontrada',
    locationError: 'No se pudo obtener la ubicación',
    mapReady: 'Mapa cargado exitosamente',
    fullscreenError: 'No se pudo activar pantalla completa',
    viewReset: 'Vista restablecida',
    shareError: 'Error al compartir',
    clipboardSuccess: 'Información copiada al portapapeles'
};

// ===== CONFIGURACIÓN DE API/DATOS =====
export const DATA_CONFIG = {
    urls: {
        puntosData: './src/data/puntos_criticos.json',
        barriosData: './src/data/barrios_ultra_optimizado.geojson'
    },
    timeouts: {
        fetch: 15000,
        search: 300
    },
    cache: {
        maxAge: 5 * 60 * 1000 // 5 minutos
    }
};

// ===== CONFIGURACIÓN DE COLORES EXTENDIDA =====
export const COLORS = {
    // Colores primarios del proyecto
    primary: {
        blue: '#03588C',
        green: '#03A63C', 
        yellow: '#F2CE16',
        darkBlue: '#0F1B26',
        mediumBlue: '#2E5984'
    },
    
    // Estados de puntos críticos
    status: {
        recuperado: '#16a34a',
        proceso: '#f59e0b',
        pendiente: '#dc2626',
        activo: '#dc2626'
    },
    
    // Grises y neutros
    neutral: {
        lightGray: '#F8F9FA',
        mediumGray: '#6b7280',
        darkGray: '#374151'
    }
};

/**
 * NOTAS DE IMPLEMENTACIÓN:
 * 
 * ✅ COMPLETADO:
 * - CONFIG copiado completamente desde original
 * - MAP_LAYERS copiado con todas las configuraciones
 * - MESSAGES centralizados
 * - DATA_CONFIG creado para URLs y timeouts
 * - COLORS extendido con paleta completa
 * 
 * 🔄 PRÓXIMOS PASOS:
 * 1. Testear imports desde consola: import { CONFIG } from './src/modular/core/constants.js'
 * 2. Usar en otros módulos cuando estén listos
 * 3. MANTENER original intacto hasta validar módulos
 * 
 * ⚠️ IMPORTANTE:
 * - El archivo original (script.js) NO se ha modificado
 * - Esta es una COPIA independiente
 * - Ambos sistemas pueden coexistir
 */
