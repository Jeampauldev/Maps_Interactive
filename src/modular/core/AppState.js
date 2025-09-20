/**
 * ===== ESTADO GLOBAL DE LA APLICACIÓN =====
 * Archivo: src/modular/core/AppState.js
 * 
 * Propósito: Gestionar estado global de forma centralizada
 * Estado: VACÍO - Listo para migración gradual
 * 
 * MIGRACIÓN PLANEADA DESDE:
 * - script.js líneas 230-240: Variables globales
 * - Estados dispersos en funciones
 */

/**
 * Clase para gestionar el estado global de la aplicación
 * Implementa patrón Singleton para estado único
 */
class AppState {
    constructor() {
        if (AppState.instance) {
            return AppState.instance;
        }

        // ✅ COPIADO desde script.js líneas 224-233 (ORIGINAL INTACTO)
        this.state = {
            // Instancia del mapa de Leaflet (copiado: let map;)
            map: null,
            
            // Capas y marcadores (copiado: let markersLayer, puntosLayer;)
            markersLayer: null,
            puntosLayer: null,
            currentLayers: {},
            
            // Marcadores actuales (copiado: let currentMarkers = [];)
            currentMarkers: [],
            
            // Puntos críticos actuales (copiado: let currentPuntosCriticos = [];)
            currentPuntosCriticos: [],
            
            // Datos cargados (copiado: let puntosData = [];)
            puntosData: [],
            barriosData: null,
            
            // Estados originales copiados
            filteredInstitutions: [], // Copiado pero adaptado para puntos críticos
            selectedInstitution: null, // Copiado: let selectedInstitution = null;
            
            // Barrios con puntos (copiado: let barriosWithPoints = new Set();)
            barriosWithPoints: new Set(),
            
            // Estado de UI extendido
            selectedPoint: null,
            searchQuery: '',
            activeFilters: {
                critico: true,
                voluminoso: true
            },
            
            // Estado de carga
            isLoading: false,
            loadingMessage: '',
            
            // Configuración actual del mapa
            currentMapStyle: 'minimal',
            showLabels: true,
            showBorders: true,
            
            // Timeouts y referencias
            searchTimeout: null,
            
            // Instancia de la clase principal
            mapAppInstance: null
        };

        // Observadores para cambios de estado
        this.observers = [];

        AppState.instance = this;
    }

    /**
     * Obtener valor del estado con validación
     */
    get(key) {
        if (key in this.state) {
            return this.state[key];
        }
        console.warn(`⚠️ AppState: Clave '${key}' no encontrada en estado`);
        return undefined;
    }

    /**
     * Actualizar valor del estado con notificaciones
     */
    set(key, value) {
        const oldValue = this.state[key];
        this.state[key] = value;
        
        // Debug logging condicional
        if (localStorage.getItem('debug-map') === 'true') {
            console.log(`🔄 AppState: ${key} cambiado:`, { old: oldValue, new: value });
        }
        
        this.notifyObservers(key, value, oldValue);
    }

    /**
     * Obtener todo el estado (solo lectura)
     */
    getAll() {
        // Retornar copia para evitar mutaciones externas
        return { ...this.state };
    }

    /**
     * Actualizar múltiples valores a la vez
     */
    setMultiple(updates) {
        Object.keys(updates).forEach(key => {
            this.set(key, updates[key]);
        });
    }

    /**
     * Suscribirse a cambios de estado
     */
    subscribe(observer) {
        if (typeof observer === 'function') {
            this.observers.push(observer);
            return () => {
                // Retornar función de desuscripción
                const index = this.observers.indexOf(observer);
                if (index > -1) {
                    this.observers.splice(index, 1);
                }
            };
        }
        console.warn('⚠️ AppState: Observer debe ser una función');
    }

    /**
     * Notificar cambios a observadores
     */
    notifyObservers(key, newValue, oldValue) {
        this.observers.forEach(observer => {
            try {
                observer(key, newValue, oldValue, this.state);
            } catch (error) {
                console.error('❌ AppState: Error en observer:', error);
            }
        });
    }

    /**
     * Resetear estado a valores iniciales
     */
    reset() {
        const initialState = {
            map: null,
            markersLayer: null,
            puntosLayer: null,
            currentLayers: {},
            currentMarkers: [],
            currentPuntosCriticos: [],
            puntosData: [],
            barriosData: null,
            filteredInstitutions: [],
            selectedInstitution: null,
            barriosWithPoints: new Set(),
            selectedPoint: null,
            searchQuery: '',
            activeFilters: {
                critico: true,
                voluminoso: true
            },
            isLoading: false,
            loadingMessage: '',
            currentMapStyle: 'minimal',
            showLabels: true,
            showBorders: true,
            searchTimeout: null,
            mapAppInstance: null
        };
        
        this.state = initialState;
        this.notifyObservers('reset', null, null);
        console.log('🔄 AppState: Estado reseteado a valores iniciales');
    }
}

// Exportar instancia singleton
export default new AppState();

/**
 * NOTAS PARA LA MIGRACIÓN:
 * 
 * 1. Reemplazar variables globales gradualmente
 * 2. Usar AppState.get('map') en lugar de variable global 'map'
 * 3. Implementar observadores para componentes que necesiten reaccionar
 * 4. Mantener retrocompatibilidad durante transición
 */