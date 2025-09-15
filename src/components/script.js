// ===== CONFIGURACIÓN GLOBAL =====
const CONFIG = {
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
    },
    
    // Configuración de capas de mapa con soporte para Vercel
    MAP_LAYERS: {
        barrios: {
            name: 'Barrios Barranquilla',
            url: 'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
            attribution: '© CARTO © OpenStreetMap contributors',
            style: 'custom-barrios',
            errorTileUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='
        },
        detailed: {
            name: 'Detallado',
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '© OpenStreetMap contributors',
            errorTileUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='
        },
        minimal: {
            name: 'Minimalista',
            url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
            attribution: '© CARTO © OpenStreetMap contributors',
            errorTileUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='
        },
        dark: {
            name: 'Oscuro',
            url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
            attribution: '© CARTO © OpenStreetMap contributors',
            errorTileUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='
        }
    }
};

// ===== DATOS DE INSTITUCIONES EDUCATIVAS =====
// Instituciones educativas reales de Barranquilla para demostración
const EDUCATIONAL_INSTITUTIONS = [
    // Universidades
    {
        id: 1,
        name: 'Universidad del Norte',
        type: 'universidad',
        coordinates: [11.0181, -74.8511],
        address: 'Km 5 Vía Puerto Colombia, Barranquilla',
        phone: '+57 5 350 9509',
        website: 'https://www.uninorte.edu.co',
        description: 'Universidad privada reconocida por su excelencia académica e investigación.',
        programs: ['Ingeniería', 'Medicina', 'Administración', 'Derecho'],
        students: 12000,
        founded: 1966,
        image: 'src/assets/images/images.jpeg'
    },
    {
        id: 2,
        name: 'Universidad Autónoma del Caribe',
        type: 'universidad',
        coordinates: [10.9889, -74.7923],
        address: 'Calle 90 No. 46-112, Barranquilla',
        phone: '+57 5 385 8555',
        website: 'https://www.uac.edu.co',
        description: 'Institución de educación superior con enfoque en formación integral.',
        programs: ['Psicología', 'Arquitectura', 'Comunicación Social'],
        students: 8500,
        founded: 1967,
        image: 'src/assets/images/residuos2.jpg'
    },
    {
        id: 3,
        name: 'Universidad Libre Seccional Barranquilla',
        type: 'universidad',
        coordinates: [10.9456, -74.7823],
        address: 'Bosque Popular Calle 37B No. 42E-17/27',
        phone: '+57 5 344 4333',
        website: 'https://www.unilibre.edu.co',
        description: 'Seccional de la Universidad Libre con tradición en formación jurídica.',
        programs: ['Derecho', 'Contaduría', 'Ingeniería Industrial'],
        students: 3200,
        founded: 1973,
        image: 'src/assets/images/residuos3.jpg'
    },
    {
        id: 4,
        name: 'Universidad Simón Bolívar',
        type: 'universidad',
        coordinates: [10.9234, -74.7656],
        address: 'Carrera 59 No. 59-65, Barranquilla',
        phone: '+57 5 344 4333',
        website: 'https://www.unisimonbolivar.edu.co',
        description: 'Universidad con enfoque en innovación y emprendimiento.',
        programs: ['Medicina', 'Odontología', 'Fisioterapia', 'Enfermería'],
        students: 15000,
        founded: 1972,
        image: 'src/assets/images/residuos 4.jpg'
    },
    
    // Colegios
    {
        id: 5,
        name: 'Colegio Karl C. Parrish',
        type: 'colegio',
        coordinates: [11.0061, -74.8456],
        address: 'Carrera 50B No. 87-293, Barranquilla',
        phone: '+57 5 385 9090',
        website: 'https://www.kcparrish.edu.co',
        description: 'Colegio bilingüe con bachillerato internacional.',
        levels: ['Preescolar', 'Primaria', 'Bachillerato'],
        students: 1200,
        founded: 1938,
        image: 'src/assets/images/residuos 5.jpg'
    },
    {
        id: 6,
        name: 'Colegio Marymount',
        type: 'colegio',
        coordinates: [10.9867, -74.7945],
        address: 'Calle 87 No. 52B-05, Barranquilla',
        phone: '+57 5 385 2525',
        website: 'https://www.marymount.edu.co',
        description: 'Institución educativa católica para señoritas.',
        levels: ['Preescolar', 'Primaria', 'Bachillerato'],
        students: 800,
        founded: 1954,
        image: 'src/assets/images/images.jpeg'
    },
    {
        id: 7,
        name: 'Colegio San José',
        type: 'colegio',
        coordinates: [10.9778, -74.7823],
        address: 'Carrera 43 No. 75-180, Barranquilla',
        phone: '+57 5 356 7890',
        website: 'https://www.colegiosanjose.edu.co',
        description: 'Colegio masculino con tradición lasallista.',
        levels: ['Primaria', 'Bachillerato'],
        students: 950,
        founded: 1941,
        image: 'src/assets/images/residuos2.jpg'
    },
    {
        id: 8,
        name: 'Colegio Británico Internacional',
        type: 'colegio',
        coordinates: [11.0245, -74.8012],
        address: 'Calle 128 No. 55-85, Barranquilla',
        phone: '+57 5 378 4567',
        website: 'https://www.britanico.edu.co',
        description: 'Educación bilingüe con currículo británico.',
        levels: ['Nursery', 'Primary', 'Secondary'],
        students: 650,
        founded: 1992,
        image: 'src/assets/images/residuos3.jpg'
    },
    
    // Instituciones técnicas
    {
        id: 9,
        name: 'SENA - Centro Industrial del Diseño',
        type: 'tecnico',
        coordinates: [10.9634, -74.7889],
        address: 'Calle 52 No. 46-83, Barranquilla',
        phone: '+57 5 330 7500',
        website: 'https://www.sena.edu.co',
        description: 'Formación técnica y tecnológica gratuita.',
        programs: ['Diseño Gráfico', 'Sistemas', 'Mecánica Industrial'],
        students: 2500,
        founded: 1957,
        image: 'src/assets/images/residuos 4.jpg'
    },
    {
        id: 10,
        name: 'Instituto Técnico Industrial',
        type: 'tecnico',
        coordinates: [10.9767, -74.7756],
        address: 'Carrera 38 No. 74-02, Barranquilla',
        phone: '+57 5 344 5678',
        website: 'https://www.iti.edu.co',
        description: 'Bachillerato técnico industrial.',
        programs: ['Electricidad', 'Mecánica', 'Electrónica'],
        students: 1100,
        founded: 1962,
        image: 'src/assets/images/residuos 5.jpg'
    },
    {
        id: 11,
        name: 'Fundación Tecnológica Antonio de Arévalo',
        type: 'tecnico',
        coordinates: [10.9645, -74.7834],
        address: 'Calle 70 No. 36-30, Barranquilla',
        phone: '+57 5 385 6789',
        website: 'https://www.tecnar.edu.co',
        description: 'Institución tecnológica con programas técnicos y tecnológicos.',
        programs: ['Sistemas', 'Administración', 'Contabilidad'],
        students: 3500,
        founded: 1950,
        image: 'src/assets/images/images.jpeg'
    },
    {
        id: 12,
        name: 'Instituto Nacional de Formación Técnica',
        type: 'tecnico',
        coordinates: [10.9523, -74.7867],
        address: 'Calle 45 No. 29-15, Barranquilla',
        phone: '+57 5 340 1234',
        website: 'https://www.infotep.edu.co',
        description: 'Formación técnica profesional especializada.',
        programs: ['Soldadura', 'Refrigeración', 'Automotriz'],
        students: 800,
        founded: 1975,
        image: 'src/assets/images/residuos2.jpg'
    }
];

// ===== VARIABLES GLOBALES =====
let map;
let markersLayer;
let puntosLayer;
let currentMarkers = [];
let currentPuntosCriticos = [];
let filteredInstitutions = [...EDUCATIONAL_INSTITUTIONS];
let selectedInstitution = null;
let puntosData = [];

// ===== CLASE PRINCIPAL DE LA APLICACIÓN =====
class BarranquillaEduMap {
    constructor() {
        console.log('🚀 Iniciando constructor de BarranquillaEduMap...');
        this.initializeApp();
    }
    
    /**
     * Inicializa la aplicación completa
     * Implementa el patrón Template Method para la secuencia de inicialización
     */
    async initializeApp() {
        try {
            this.showLoadingOverlay();
            await this.initializeMap();
            this.setupEventListeners();
            this.loadInstitutions();
            await this.loadPuntosCriticos();
            this.updateStatistics();
            this.hideLoadingOverlay();
            this.showToast('Mapa cargado exitosamente', 'success');
        } catch (error) {
            console.error('Error inicializando la aplicación:', error);
            this.showToast('Error al cargar el mapa', 'error');
            this.hideLoadingOverlay();
        }
    }
    
    /**
     * Inicializa el mapa de Leaflet con configuración personalizada
     * Aplica el patrón Builder para la construcción del mapa
     */
    async initializeMap() {
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
        
        // Crear el mapa centrado en Barranquilla con configuración para Vercel
        console.log('🎯 Creando mapa con coordenadas:', CONFIG.BARRANQUILLA_COORDS);
        map = L.map('map', {
            center: CONFIG.BARRANQUILLA_COORDS,
            zoom: CONFIG.DEFAULT_ZOOM,
            minZoom: CONFIG.MIN_ZOOM,
            maxZoom: CONFIG.MAX_ZOOM,
            zoomControl: false, // Removemos el control por defecto
            fadeAnimation: true,
            zoomAnimation: true,
            markerZoomAnimation: true,
            preferCanvas: true,
            renderer: L.canvas()
        });
        console.log('✅ Mapa creado exitosamente:', map);
        
        // Crear capas de mapa con manejo de errores para Vercel
        console.log('🗂️ Creando capas del mapa...');
        this.mapLayers = {};
        Object.keys(CONFIG.MAP_LAYERS).forEach(key => {
            const layer = CONFIG.MAP_LAYERS[key];
            console.log(`📍 Creando capa: ${key} - URL: ${layer.url}`);
            this.mapLayers[key] = L.tileLayer(layer.url, {
                attribution: layer.attribution,
                errorTileUrl: layer.errorTileUrl || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
                timeout: 10000,
                retryAttempts: 3,
                crossOrigin: true
            });
            
            // Manejo de errores de tiles
            this.mapLayers[key].on('tileerror', function(error) {
                console.warn(`Error loading tile for layer ${key}:`, error);
            });
        });
        console.log('✅ Capas creadas:', Object.keys(this.mapLayers));
        
        // Agregar capa base por defecto (minimalista) para evitar fondo azul
        console.log('🎨 Agregando capa base minimalista...');
        this.currentLayer = this.mapLayers.minimal;
        this.currentLayer.addTo(map);
        console.log('✅ Capa base agregada al mapa');
        
        // Forzar redibujado después de la carga para Vercel
        map.whenReady(() => {
            setTimeout(() => {
                map.invalidateSize();
                console.log('🔄 Mapa redibujado para Vercel');
            }, 100);
        });
        
        // Cargar capa de barrios de forma asíncrona
        await this.loadBarriosLayer();
        
        // Crear capa para los marcadores
        markersLayer = L.layerGroup().addTo(map);
        
        // Crear capa para los puntos críticos
        puntosLayer = L.layerGroup().addTo(map);
        
        // Agregar control de zoom personalizado
        L.control.zoom({
            position: 'bottomright'
        }).addTo(map);
        
        // Configurar control de capas después de cargar barrios
        this.setupLayerControl();
        
        // Agregar estilos CSS para popups de barrios
        this.addBarriosPopupStyles();
        
        // Configurar eventos del mapa
        map.on('click', () => {
            this.hideInstitutionInfo();
        });
        
        // Agregar control de zoom para etiquetas de barrios
        map.on('zoomend', () => {
            this.updateLabelsVisibility(map.getZoom());
        });
        
        return map;
    }
    
    /**
     * Configura todos los event listeners de la interfaz
     * Implementa el patrón Observer para la gestión de eventos
     */
    setupEventListeners() {
        // Búsqueda en tiempo real
        const searchInput = document.getElementById('search-input');
        const clearSearchBtn = document.getElementById('clear-search');
        
        searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
            this.toggleClearButton(e.target.value);
        });
        
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            this.handleSearch('');
            this.toggleClearButton('');
            searchInput.focus();
        });
        
        // Filtros por tipo de punto crítico
        ['critico', 'voluminoso'].forEach(type => {
            const checkbox = document.getElementById(`filter-${type}`);
            if (checkbox) {
                checkbox.addEventListener('change', () => {
                    this.handleFilterChange();
                });
            }
        });
        
        // Controles del mapa
        document.getElementById('locate-btn').addEventListener('click', () => {
            this.locateUser();
        });
        
        document.getElementById('fullscreen-btn').addEventListener('click', () => {
            this.toggleFullscreen();
        });
        
        document.getElementById('reset-view').addEventListener('click', () => {
            this.resetMapView();
        });
        
        // Panel de información
        document.getElementById('close-info').addEventListener('click', () => {
            this.hideInstitutionInfo();
        });
        
        // Botones de acción
        document.getElementById('get-directions').addEventListener('click', () => {
            this.getDirections();
        });
        
        document.getElementById('share-location').addEventListener('click', () => {
            this.shareLocation();
        });
    }
    
    /**
     * Método para cargar la capa de barrios de forma asíncrona
     */
    async loadBarriosLayer() {
        try {
            this.barriosLayer = await this.createCustomBarriosLayer();
            if (map && this.barriosLayer) {
                this.barriosLayer.addTo(map);
            }
        } catch (error) {
            console.error('Error cargando capa de barrios:', error);
            // Fallback: usar capa de barrios básica
            if (this.mapLayers && this.mapLayers.barrios && map) {
                this.currentLayer = this.mapLayers.barrios;
                this.currentLayer.addTo(map);
            }
        }
    }
    
    /**
     * Configura el control de capas del mapa (solo selector HTML integrado)
     */
    setupLayerControl() {
        const layerSelect = document.getElementById('layerSelect');
        if (layerSelect) {
            // Establecer valor por defecto en el selector
            layerSelect.value = 'minimal';
            
            layerSelect.addEventListener('change', (e) => {
                this.changeMapLayer(e.target.value);
            });
        }
        
        // No crear controles duplicados de Leaflet
        // Solo usar el selector HTML integrado en la interfaz
    }
    
    async createCustomBarriosLayer() {
        try {
            const response = await fetch('./src/data/barrios_ultra_optimizado.geojson');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const geojsonData = await response.json();
            
            // Crear grupo de capas para barrios y etiquetas
            const barriosGroup = L.layerGroup();
            
            const barriosLayer = L.geoJSON(geojsonData, {
                style: (feature) => {
                    return {
                        color: CONFIG.INSTITUTION_COLORS.universidad,
                        fillColor: 'transparent',
                        fillOpacity: 0,
                        weight: 0.5,
                        opacity: 0.8
                    };
                },
                onEachFeature: (feature, layer) => {
                    if (feature.properties && feature.properties.nombre) {
                        const popupContent = `
                            <div class="barrio-popup">
                                <h3>${feature.properties.nombre}</h3>
                                <p><strong>Localidad:</strong> ${feature.properties.localidad || 'No especificada'}</p>
                                <p><strong>Pieza Urbana:</strong> ${feature.properties.pieza_urba || 'No especificada'}</p>
                            </div>
                        `;
                        layer.bindPopup(popupContent);
                        
                        // Crear etiqueta permanente para el nombre del barrio
                        const bounds = layer.getBounds();
                        const center = bounds.getCenter();
                        
                        // Calcular tamaño dinámico basado en el área del barrio
                        const area = (bounds.getNorthEast().lat - bounds.getSouthWest().lat) * 
                                   (bounds.getNorthEast().lng - bounds.getSouthWest().lng);
                        const labelWidth = Math.min(Math.max(feature.properties.nombre.length * 8, 60), 150);
                        
                        const labelIcon = L.divIcon({
                            className: 'barrio-label-container',
                            html: `<div class="barrio-label" data-zoom-min="13">${feature.properties.nombre}</div>`,
                            iconSize: [labelWidth, 20],
                            iconAnchor: [labelWidth/2, 10]
                        });
                        
                        const labelMarker = L.marker(center, { 
                            icon: labelIcon,
                            interactive: false,
                            zIndexOffset: 500
                        });
                        
                        barriosGroup.addLayer(labelMarker);
                    }
                }
            });
            
            // Agregar la capa de polígonos al grupo
            barriosGroup.addLayer(barriosLayer);
            
            // No agregar controles de edición duplicados
            // La funcionalidad de edición se maneja desde la interfaz principal
            
            return barriosGroup;
        } catch (error) {
            console.error('Error cargando los barrios de Barranquilla:', error);
            // Fallback: crear capa de tile como respaldo
            const fallbackLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
                attribution: '© CARTO © OpenStreetMap contributors | Barrios Editables',
                maxZoom: CONFIG.MAX_ZOOM,
                minZoom: CONFIG.MIN_ZOOM,
                className: 'editable-barrios-layer'
            });
            
            // Fallback sin controles duplicados
            
            return fallbackLayer;
        }
    }
    
    // Método eliminado - funcionalidad de edición integrada en la interfaz principal
    
    // Método eliminado - funcionalidad de edición integrada en la interfaz principal
    
    updateMapFilter() {
        const hue = document.getElementById('hue-slider')?.value || 200;
        const saturation = document.getElementById('saturation-slider')?.value || 120;
        const brightness = document.getElementById('brightness-slider')?.value || 90;
        
        const filterValue = `hue-rotate(${hue}deg) saturate(${saturation/100}) brightness(${brightness/100})`;
        
        const layers = document.querySelectorAll('.editable-barrios-layer');
        layers.forEach(layer => {
            layer.style.filter = filterValue;
        });
    }
    
    highlightBarrios() {
        const barriosList = document.getElementById('barrios-list')?.value;
        if (barriosList) {
            const barrios = barriosList.split(',').map(b => b.trim());
            console.log('Destacando barrios:', barrios);
            // Aquí se puede implementar lógica para destacar barrios específicos
            this.showToast(`Destacando ${barrios.length} barrios: ${barrios.join(', ')}`, 'success');
        }
    }
    
    toggleLabels() {
        const showLabels = document.getElementById('show-labels')?.checked;
        console.log('Etiquetas:', showLabels ? 'Activadas' : 'Desactivadas');
        // Implementar lógica para mostrar/ocultar etiquetas
    }
    
    toggleBorders() {
        const showBorders = document.getElementById('show-borders')?.checked;
        console.log('Límites:', showBorders ? 'Activados' : 'Desactivados');
        // Implementar lógica para mostrar/ocultar límites
    }
    
    /**
     * Actualiza la visibilidad de las etiquetas de barrios según el nivel de zoom
     */
    updateLabelsVisibility(zoomLevel) {
        const labels = document.querySelectorAll('.barrio-label[data-zoom-min]');
        labels.forEach(label => {
            const minZoom = parseInt(label.getAttribute('data-zoom-min'));
            if (zoomLevel >= minZoom) {
                label.style.opacity = '1';
                label.style.transform = 'scale(1)';
                label.style.display = 'block';
            } else {
                label.style.opacity = '0';
                label.style.transform = 'scale(0.9)';
                label.style.display = 'none';
            }
        });
    }
    
    injectEditorStyles() {
        if (document.getElementById('barrios-editor-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'barrios-editor-styles';
        styles.textContent = `
            .barrios-editor-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            }
            .modal-content {
                background: white;
                border-radius: 8px;
                width: 90%;
                max-width: 500px;
                max-height: 80vh;
                overflow-y: auto;
            }
            .modal-header {
                background: #0F1B26;
                color: white;
                padding: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-radius: 8px 8px 0 0;
            }
            .modal-header button {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
            }
            .modal-body {
                padding: 20px;
            }
            .editor-section {
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 1px solid #eee;
            }
            .editor-section h4 {
                color: #0F1B26;
                margin-bottom: 10px;
            }
            .editor-section label {
                display: block;
                margin-bottom: 8px;
                color: #333;
            }
            .editor-section input[type="range"] {
                width: 100%;
                margin-left: 10px;
            }
            .editor-section textarea {
                width: 100%;
                height: 80px;
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: 4px;
                resize: vertical;
            }
            .editor-section button {
                background: #03588C;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
                cursor: pointer;
                margin-top: 8px;
            }
            .editor-section button:hover {
                background: #2E5984;
            }
        `;
        document.head.appendChild(styles);
    }
    
    /**
     * Agrega estilos CSS específicos para los popups de barrios
     */
    addBarriosPopupStyles() {
        if (document.getElementById('barrios-popup-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'barrios-popup-styles';
        styles.textContent = `
            .leaflet-popup-content-wrapper {
                background: transparent !important;
                box-shadow: none !important;
                border-radius: 0 !important;
                padding: 0 !important;
            }
            
            .leaflet-popup-tip {
                background: transparent !important;
                box-shadow: none !important;
            }
            
            .leaflet-popup-close-button {
                background: rgba(3, 88, 140, 0.9) !important;
                color: #FFFFFF !important;
                width: 24px !important;
                height: 24px !important;
                border-radius: 50% !important;
                border: 2px solid rgba(255, 255, 255, 0.3) !important;
                font-size: 16px !important;
                font-weight: bold !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                text-decoration: none !important;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
                transition: all 0.2s ease !important;
                top: -8px !important;
                right: -8px !important;
                z-index: 1000 !important;
            }
            
            .leaflet-popup-close-button:hover {
                background: rgba(242, 206, 22, 0.9) !important;
                color: #0F1B26 !important;
                transform: scale(1.1) !important;
                border-color: rgba(255, 255, 255, 0.6) !important;
            }
            
            .barrio-popup {
                font-family: 'Inter', sans-serif;
                padding: 16px;
                background: linear-gradient(135deg, rgba(15, 27, 38, 0.95) 0%, rgba(46, 89, 132, 0.95) 100%);
                color: #F2F2F2;
                border-radius: 12px;
                box-shadow: 0 8px 24px rgba(0,0,0,0.4);
                border: 2px solid rgba(3, 88, 140, 0.6);
                backdrop-filter: blur(10px);
                min-width: 200px;
                max-width: 280px;
            }
            
            .barrio-popup h3 {
                margin: 0 0 12px 0;
                color: #F2CE16;
                font-size: 18px;
                font-weight: 600;
                text-shadow: 0 2px 4px rgba(0,0,0,0.6);
                text-align: center;
                border-bottom: 2px solid rgba(242, 206, 22, 0.3);
                padding-bottom: 8px;
            }
            
            .barrio-popup p {
                margin: 6px 0;
                font-size: 14px;
                line-height: 1.5;
            }
            
            .barrio-popup strong {
                color: #03A63C;
                font-weight: 500;
            }
        `;
        document.head.appendChild(styles);
    }

    /**
     * Cambia la capa del mapa con validación y manejo de errores
     * Integrado con el selector HTML del DOM
     */
    changeMapLayer(layerKey) {
        try {
            // Validar que la capa existe
            if (!this.mapLayers[layerKey]) {
                console.warn(`Capa no encontrada: ${layerKey}`);
                this.showToast('Error: Capa de mapa no disponible', 'error');
                return;
            }
            
            // Remover capa actual si existe
            if (this.currentLayer) {
                map.removeLayer(this.currentLayer);
            }
            
            // Agregar nueva capa
            this.currentLayer = this.mapLayers[layerKey];
            this.currentLayer.addTo(map);
            
            // Actualizar selector HTML para mantener sincronización
            const layerSelector = document.getElementById('layerSelect');
            if (layerSelector && layerSelector.value !== layerKey) {
                layerSelector.value = layerKey;
            }
            
            // Mostrar notificación de éxito
            const layerName = CONFIG.MAP_LAYERS[layerKey]?.name || layerKey;
            this.showToast(`Mapa cambiado a: ${layerName}`, 'success');
            
        } catch (error) {
            console.error('Error al cambiar capa del mapa:', error);
            this.showToast('Error al cambiar la capa del mapa', 'error');
        }
    }
    
    /**
     * Carga y renderiza todos los puntos críticos en el mapa
     * Utiliza el patrón Factory para crear marcadores específicos por tipo
     */
    loadInstitutions() {
        // Limpiar marcadores existentes
        markersLayer.clearLayers();
        currentMarkers = [];
        
        // Cargar puntos críticos desde el archivo JSON
        this.loadPuntosCriticosAsInstitutions();
    }
    
    /**
     * Carga los puntos críticos como instituciones principales
     */
    async loadPuntosCriticosAsInstitutions() {
        try {
            const response = await fetch('src/data/puntos_criticos.json');
            const data = await response.json();
            
            if (data && data.features) {
                // Convertir features de GeoJSON a formato de instituciones
                const puntosAsInstitutions = data.features.map(feature => ({
                    id: feature.properties.id,
                    name: `Punto Crítico ${feature.properties.id}`,
                    type: 'punto_critico',
                    coordinates: [feature.geometry.coordinates[1], feature.geometry.coordinates[0]], // Invertir lat/lng
                    address: feature.properties.direccion,
                    barrio: feature.properties.barrio,
                    localidad: feature.properties.localidad,
                    estado: feature.properties.estado_actual,
                    acciones: feature.properties.acciones_realizadas,
                    area: feature.properties.area_recuperada_m2,
                    poblacion: feature.properties.poblacion_impactada,
                    co2: feature.properties.toneladas_co2_equivalente,
                    fecha_entrega: feature.properties.fecha_entrega
                }));
                
                // Crear marcadores para cada punto crítico
                this.createMarkersAsync(puntosAsInstitutions);
            }
        } catch (error) {
            console.error('Error al cargar puntos críticos:', error);
            this.showToast('Error al cargar los puntos críticos', 'error');
        }
    }
    
    /**
     * Crea marcadores de forma asíncrona para mejorar la performance
     */
    async createMarkersAsync(institutions) {
        const batchSize = 5; // Procesar en lotes de 5
        
        for (let i = 0; i < institutions.length; i += batchSize) {
            const batch = institutions.slice(i, i + batchSize);
            
            await new Promise(resolve => {
                requestAnimationFrame(() => {
                    batch.forEach(institution => {
                        const marker = this.createInstitutionMarker(institution);
                        currentMarkers.push({ marker, institution });
                    });
                    resolve();
                });
            });
        }
        
        // Aplicar filtros actuales
        this.applyFilters();
        
        // Actualizar lista lateral
        this.updateInstitutionsList();
        
        // Inicializar lazy loading para imágenes
        this.initializeLazyLoading();
    }
    
    /**
     * Carga y renderiza los puntos críticos en el mapa
     */
    async loadPuntosCriticos() {
        try {
            const response = await fetch('src/data/puntos_criticos.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            puntosData = data.features || [];
            
            // Limpiar marcadores existentes de puntos críticos
            puntosLayer.clearLayers();
            currentPuntosCriticos = [];
            
            // Crear marcadores para cada punto crítico
            puntosData.forEach(punto => {
                const marker = this.createPuntoCriticoMarker(punto);
                currentPuntosCriticos.push({ marker, punto });
            });
            
            console.log(`Cargados ${puntosData.length} puntos críticos`);
            
            // Actualizar estadísticas después de cargar los datos
            this.updateStatistics();
            
        } catch (error) {
            console.error('Error cargando puntos críticos:', error);
            this.showToast('Error al cargar puntos críticos', 'error');
        }
    }
    
    /**
     * Crea un marcador personalizado para una institución o punto crítico
     * Implementa el patrón Factory Method
     */
    createInstitutionMarker(institution) {
        let customIcon;
        
        // Crear icono específico según el tipo
        if (institution.type === 'punto_critico') {
            // Marcador rojo sin icono para puntos críticos
            customIcon = L.divIcon({
                className: 'punto-critico-rojo-marker',
                html: '',
                iconSize: [20, 20],
                iconAnchor: [10, 10],
                popupAnchor: [0, -10]
            });
        } else {
            // Usar iconos personalizados para instituciones
            customIcon = this.createCustomIcon(institution.type);
        }
        
        // Crear marcador con lazy popup loading
        const marker = L.marker(institution.coordinates, { icon: customIcon });
        
        // Lazy load popup content
        marker.on('click', () => {
            if (!marker.getPopup()) {
                const popupContent = institution.type === 'punto_critico' 
                    ? this.createPuntoCriticoPopupContent(institution.properties || institution, institution.coordinates)
                    : this.createPopupContent(institution);
                    
                marker.bindPopup(popupContent, {
                    maxWidth: 300,
                    className: institution.type === 'punto_critico' ? 'punto-critico-popup' : 'custom-popup'
                });
            }
            this.selectInstitution(institution);
        });
        
        return marker;
    }
    
    /**
     * Crea un icono personalizado para el tipo de institución
     */
    createCustomIcon(type) {
        // Colores de la paleta para cada tipo
        const colors = {
            universidad: '#03588C',
            colegio: '#03A63C', 
            tecnico: '#F2CE16'
        };
        
        const color = colors[type] || '#03588C';
        
        return L.divIcon({
            className: 'custom-marker-clean',
            html: `<div class="marker-container" style="background: ${color};">
                <i class="fas ${this.getInstitutionIcon(type)}"></i>
            </div>`,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });
    }
    
    /**
     * Crea un marcador personalizado para un punto crítico
     */
    createPuntoCriticoMarker(punto) {
        const coordinates = [punto.geometry.coordinates[1], punto.geometry.coordinates[0]];
        const properties = punto.properties;
        
        // Determinar el tipo de marcador basado en las propiedades
        const tipoMarcador = properties.tipo === 'voluminoso' ? 'punto-voluminoso-marker' : 'punto-critico-rojo-marker';
        
        // Crear icono personalizado elegante y compacto
        const icon = L.divIcon({
            className: tipoMarcador,
            html: '',
            iconSize: [12, 12],
            iconAnchor: [6, 6],
            popupAnchor: [0, -6]
        });
        
        const marker = L.marker(coordinates, { icon })
            .bindPopup(this.createPuntoCriticoPopupContent(properties), {
                maxWidth: 350,
                className: 'custom-popup punto-critico-popup'
            })
            .bindTooltip(`<strong>${properties.id || properties.nombre || 'ID no disponible'}</strong>`, {
                permanent: false,
                direction: 'top',
                offset: [0, -12],
                className: 'custom-marker-tooltip'
            });
        
        puntosLayer.addLayer(marker);
        return marker;
    }
    
    /**
     * Obtiene el icono FontAwesome apropiado para cada tipo de institución
     */
    getInstitutionIcon(type) {
        const icons = {
            universidad: 'fa-university',
            colegio: 'fa-school',
            tecnico: 'fa-tools'
        };
        return icons[type] || 'fa-graduation-cap';
    }
    
    /**
     * Crea el contenido HTML para el popup de una institución
     */
    createPopupContent(institution) {
        return `
            ${institution.image ? `<img src="${institution.image}" alt="${institution.name}" class="institution-image" loading="lazy">` : ''}
            <h4>${institution.name}</h4>
            <span class="institution-badge ${institution.type}">
                ${this.getPointTypeLabel(institution.type)}
            </span>
            <p><i class="fas fa-map-marker-alt"></i> ${institution.address}</p>
            <p><i class="fas fa-phone"></i> ${institution.phone}</p>
            <p class="description">${institution.description}</p>
            <button onclick="eduMap.selectInstitution(${institution.id})" class="popup-btn primary">
                <i class="fas fa-info-circle"></i> Ver detalles
            </button>
        `;
    }
    
    /**
     * Obtiene la etiqueta legible para el tipo de institución
     */
    getPointTypeLabel(type) {
        const labels = {
            critico: 'Punto Crítico',
            voluminoso: 'Residuo Voluminoso'
        };
        return labels[type] || type;
    }

    selectPuntoCritico(pointId) {
        const point = currentPuntosCriticos.find(p => p.properties.id === pointId);
        if (point) {
            // Centrar el mapa en el punto
            map.setView([point.geometry.coordinates[1], point.geometry.coordinates[0]], 16);
            
            // Encontrar y abrir el popup del marcador
            puntosLayer.eachLayer(layer => {
                if (layer.feature && layer.feature.properties.id === pointId) {
                    layer.openPopup();
                }
            });
        }
    }
    
    /**
     * Crea el contenido HTML para el popup de un punto crítico
     */
    createPuntoCriticoPopupContent(properties, coordinates) {
        const getStatusBadge = (status) => {
            const statusColors = {
                'Recuperado': '#16a34a',
                'En Proceso': '#f59e0b',
                'Pendiente': '#dc2626',
                'Activo': '#dc2626'
            };
            const color = statusColors[status] || '#6b7280';
            return `<span class="status-badge" style="background-color: ${color}; color: white; padding: 4px 12px; border-radius: 16px; font-size: 12px; font-weight: 600; text-transform: uppercase;">${status || 'Sin estado'}</span>`;
        };
        
        // Tomar coordenadas directamente del JSON tal como aparecen
        let coordsText = 'N/A';
        if (coordinates && Array.isArray(coordinates) && coordinates.length >= 2) {
            // Mostrar con 6 decimales de precisión como en el JSON
            coordsText = `${coordinates[0].toFixed(6)}, ${coordinates[1].toFixed(6)}`;
        }
        
        return `
            <div class="punto-critico-popup">
                <h4>
                    <i class="fas fa-check-circle" style="margin-right: 8px;"></i>
                    Punto Crítico ${properties.id || 'N/A'}
                </h4>
                
                <div style="margin-bottom: 16px; padding: 0 16px;">
                    ${getStatusBadge(properties.estado_actual)}
                </div>
                
                <div style="margin: 16px 0; line-height: 1.6; padding: 0 16px;">
                    <div style="margin-bottom: 12px;">
                        <i class="fas fa-map-marker-alt" style="color: #16a34a; width: 20px; margin-right: 8px;"></i>
                        <span style="font-weight: 600; color: #374151;">Dirección:</span><br>
                        <span style="margin-left: 28px; color: #6b7280;">${properties.direccion || 'No especificada'}</span>
                    </div>
                    
                    <div style="margin-bottom: 12px;">
                        <i class="fas fa-home" style="color: #16a34a; width: 20px; margin-right: 8px;"></i>
                        <span style="font-weight: 600; color: #374151;">Barrio:</span>
                        <span style="color: #6b7280;">${properties.barrio || 'No especificado'}</span>
                    </div>
                    
                    <div style="margin-bottom: 12px;">
                        <i class="fas fa-trash" style="color: #16a34a; width: 20px; margin-right: 8px;"></i>
                        <span style="font-weight: 600; color: #374151;">Tipo de residuo:</span><br>
                        <span style="margin-left: 28px; color: #6b7280; font-size: 13px;">${properties.tipo_residuo || 'No especificado'}</span>
                    </div>
                    
                    ${properties.acciones_realizadas ? `
                    <div style="margin-bottom: 12px;">
                        <i class="fas fa-tools" style="color: #16a34a; width: 20px; margin-right: 8px;"></i>
                        <span style="font-weight: 600; color: #374151;">Acciones realizadas:</span><br>
                        <span style="margin-left: 28px; color: #6b7280; font-size: 13px;">${properties.acciones_realizadas}</span>
                    </div>` : ''}
                </div>
                
                <div style="border-top: 1px solid #e5e7eb; padding: 12px 16px; margin-top: 16px; background: rgba(248,250,252,0.5);">
                    <small style="color: #9ca3af; font-size: 11px;">
                        <i class="fas fa-globe" style="margin-right: 4px;"></i>
                        Coordenadas: ${coordsText}
                    </small>
                </div>
            </div>
        `;
    }
    
    /**
     * Maneja la búsqueda de instituciones
     * Implementa búsqueda fuzzy para mejor experiencia de usuario con debounce
     */
    handleSearch(query) {
        // Cancelar búsqueda anterior si existe
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        
        // Debounce la búsqueda para mejorar performance
        this.searchTimeout = setTimeout(() => {
            this.performSearch(query);
        }, 300);
    }
    
    /**
     * Realiza la búsqueda real en puntos críticos
     */
    performSearch(query) {
        const searchTerm = query.toLowerCase().trim();
        
        if (searchTerm === '') {
            // Mostrar todos los puntos críticos
            this.applyFilters();
        } else {
            // Filtrar puntos críticos por término de búsqueda
            const filteredPoints = currentPuntosCriticos.filter(point => {
                const props = point.properties;
                return (
                    props.descripcion.toLowerCase().includes(searchTerm) ||
                    (props.direccion && props.direccion.toLowerCase().includes(searchTerm)) ||
                    props.tipo.toLowerCase().includes(searchTerm) ||
                    this.getPointTypeLabel(props.tipo).toLowerCase().includes(searchTerm)
                );
            });
            
            // Limpiar capa y agregar solo puntos filtrados
            puntosLayer.clearLayers();
            filteredPoints.forEach(point => {
                const marker = this.createPuntoCriticoMarker(point);
                puntosLayer.addLayer(marker);
            });
        }
        
        this.updateInstitutionsList();
        this.updateStatistics();
    }
    
    /**
     * Maneja los cambios en los filtros por tipo
     */
    handleFilterChange() {
        this.applyFilters();
        this.updateInstitutionsList();
        this.updateStatistics();
    }
    
    /**
     * Aplica los filtros activos a los marcadores del mapa
     */
    applyFilters() {
        const activeFilters = {
            critico: document.getElementById('filter-critico')?.checked ?? true,
            voluminoso: document.getElementById('filter-voluminoso')?.checked ?? true
        };
        
        // Limpiar capa de puntos críticos
        if (puntosLayer) {
            puntosLayer.clearLayers();
        }
        
        // Agregar marcadores de puntos críticos que pasan los filtros
        currentPuntosCriticos.forEach(({ marker, punto }) => {
            const matchesFilter = activeFilters[punto.tipo] || activeFilters.critico;
            
            if (matchesFilter && puntosLayer) {
                puntosLayer.addLayer(marker);
            }
        });
    }
    
    /**
     * Actualiza la lista de puntos críticos en el sidebar
     */
    updateInstitutionsList() {
        const container = document.getElementById('institutions-container');
        const activeFilters = {
            critico: document.getElementById('filter-critico').checked,
            voluminoso: document.getElementById('filter-voluminoso').checked
        };
        
        // Filtrar puntos críticos visibles
        const visiblePoints = currentPuntosCriticos.filter(point => 
            activeFilters[point.properties.tipo]
        );
        
        if (visiblePoints.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>No se encontraron puntos críticos</p>
                </div>
            `;
            return;
        }
        
        // Generar HTML para cada punto crítico
        container.innerHTML = visiblePoints.map(point => `
            <div class="institution-item" onclick="eduMap.selectPuntoCritico('${point.properties.id}')">
                <div class="institution-name">${point.properties.descripcion}</div>
                <div class="institution-type">${this.getPointTypeLabel(point.properties.tipo)}</div>
                <div class="institution-address">${point.properties.direccion || 'Dirección no disponible'}</div>
                <div class="status-badge ${point.properties.estado}">${point.properties.estado}</div>
            </div>
        `).join('');
    }
    
    /**
     * Actualiza las estadísticas en el header y filtros usando datos reales del JSON
     */
    updateStatistics() {
        console.log('=== updateStatistics() iniciada ===');
        console.log('puntosData.length:', puntosData.length);
        
        // Calcular métricas reales desde todos los puntos críticos
        let totalAreaRecuperada = 0; // en m²
        let totalPoblacionImpactada = 0;
        let totalCo2Equivalente = 0;
        const localidadesGestionadas = new Set();
        
        // Procesar todos los puntos sin filtros
        puntosData.forEach((punto, index) => {
            const properties = punto.properties;
            
            // Sumar datos reales del JSON
            const area = parseFloat(properties.area_recuperada_m2) || 0;
            const poblacion = parseInt(properties.poblacion_impactada) || 0;
            const co2 = parseFloat(properties.toneladas_co2_equivalente) || 0;
            
            totalAreaRecuperada += area;
            totalPoblacionImpactada += poblacion;
            totalCo2Equivalente += co2;
            
            // Agregar localidad al conjunto (evita duplicados)
            if (properties.localidad) {
                localidadesGestionadas.add(properties.localidad);
            }
            
            console.log(`Punto ${index}: área=${area}, población=${poblacion}, co2=${co2}, localidad=${properties.localidad}`);
        });
        
        console.log('Totales calculados:', {
            totalPuntos: puntosData.length,
            totalAreaRecuperada,
            totalPoblacionImpactada,
            totalCo2Equivalente,
            localidades: localidadesGestionadas.size
        });
        
        // Calcular totales finales
        const totalPuntos = puntosData.length;
        const areaRecuperadaHectareas = totalAreaRecuperada / 10000; // Convertir m² a hectáreas
        
        console.log('Actualizando elementos del DOM:', {
            totalPuntos,
            areaRecuperadaHectareas,
            totalPoblacionImpactada,
            totalCo2Equivalente,
            localidades: localidadesGestionadas.size
        });
        
        // Actualizar estadísticas del header con datos reales
        const totalElement = document.getElementById('total-points');
        if (totalElement) {
            totalElement.textContent = totalPuntos;
            console.log('Total points actualizado:', totalPuntos);
        } else {
            console.error('Elemento total-points no encontrado');
        }
        
        const areaElement = document.getElementById('recovered-area');
        if (areaElement) {
            areaElement.textContent = areaRecuperadaHectareas.toFixed(1);
            console.log('Área recuperada actualizada:', areaRecuperadaHectareas.toFixed(1));
        } else {
            console.error('Elemento recovered-area no encontrado');
        }
        
        const poblacionElement = document.getElementById('affected-population');
        if (poblacionElement) {
            poblacionElement.textContent = totalPoblacionImpactada.toLocaleString();
            console.log('Población impactada actualizada:', totalPoblacionImpactada.toLocaleString());
        } else {
            console.error('Elemento affected-population no encontrado');
        }
        
        const co2Element = document.getElementById('co2-equivalent');
        if (co2Element) {
            co2Element.textContent = totalCo2Equivalente.toFixed(1);
            console.log('CO2 equivalente actualizado:', totalCo2Equivalente.toFixed(1));
        } else {
            console.error('Elemento co2-equivalent no encontrado');
        }
        
        const localidadesElement = document.getElementById('total-localities');
        if (localidadesElement) {
            localidadesElement.textContent = localidadesGestionadas.size;
            console.log('Total localidades actualizado:', localidadesGestionadas.size);
        } else {
            console.error('Elemento total-localities no encontrado');
        }
    }
    
    /**
     * Selecciona una institución y muestra su información detallada
     */
    selectInstitution(institutionId) {
        const institution = EDUCATIONAL_INSTITUTIONS.find(inst => 
            inst.id === institutionId || inst.id === parseInt(institutionId)
        );
        
        if (!institution) return;
        
        selectedInstitution = institution;
        
        // Centrar mapa en la institución
        map.setView(institution.coordinates, 15);
        
        // Actualizar panel de información
        this.showInstitutionInfo(institution);
        
        // Resaltar en la lista
        this.highlightInstitutionInList(institution.id);
    }
    
    /**
     * Muestra el panel de información detallada de una institución
     */
    showInstitutionInfo(institution) {
        const infoPanel = document.getElementById('institution-info');
        
        // Actualizar contenido
        document.getElementById('info-name').textContent = institution.name;
        document.getElementById('info-type').textContent = this.getPointTypeLabel(institution.type);
        document.getElementById('info-address').textContent = institution.address;
        document.getElementById('info-phone').textContent = institution.phone;
        
        const websiteLink = document.getElementById('info-website');
        websiteLink.href = institution.website;
        websiteLink.textContent = 'Visitar sitio web';
        
        // Mostrar panel
        infoPanel.classList.remove('hidden');
    }
    
    /**
     * Oculta el panel de información
     */
    hideInstitutionInfo() {
        document.getElementById('institution-info').classList.add('hidden');
        selectedInstitution = null;
        this.removeHighlightFromList();
    }
    
    /**
     * Resalta una institución en la lista lateral
     */
    highlightInstitutionInList(institutionId) {
        // Remover highlight anterior
        this.removeHighlightFromList();
        
        // Agregar highlight actual
        const items = document.querySelectorAll('.institution-item');
        items.forEach((item, index) => {
            const visibleInstitutions = this.getVisibleInstitutions();
            if (visibleInstitutions[index] && visibleInstitutions[index].id === institutionId) {
                item.classList.add('active');
            }
        });
    }
    
    /**
     * Remueve el highlight de todos los elementos de la lista
     */
    removeHighlightFromList() {
        document.querySelectorAll('.institution-item.active')
            .forEach(item => item.classList.remove('active'));
    }
    
    /**
     * Obtiene las instituciones actualmente visibles
     */
    getVisibleInstitutions() {
        const activeFilters = {
            universidad: document.getElementById('filter-universidad').checked,
            colegio: document.getElementById('filter-colegio').checked,
            tecnico: document.getElementById('filter-tecnico').checked
        };
        
        return filteredInstitutions.filter(inst => activeFilters[inst.type]);
    }
    
    /**
     * Muestra/oculta el botón de limpiar búsqueda
     */
    toggleClearButton(value) {
        const clearBtn = document.getElementById('clear-search');
        if (value.trim() !== '') {
            clearBtn.classList.add('visible');
        } else {
            clearBtn.classList.remove('visible');
        }
    }
    
    /**
     * Intenta localizar al usuario usando geolocalización
     */
    locateUser() {
        if (!navigator.geolocation) {
            this.showToast('Geolocalización no soportada', 'error');
            return;
        }
        
        this.showToast('Localizando...', 'info');
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                map.setView([latitude, longitude], 15);
                
                // Agregar marcador temporal de ubicación
                const userMarker = L.marker([latitude, longitude], {
                    icon: L.divIcon({
                        className: 'user-location-marker',
                        html: '<i class="fas fa-user"></i>',
                        iconSize: [30, 30],
                        iconAnchor: [15, 15]
                    })
                }).addTo(map);
                
                // Remover marcador después de 5 segundos
                setTimeout(() => {
                    map.removeLayer(userMarker);
                }, 5000);
                
                this.showToast('Ubicación encontrada', 'success');
            },
            (error) => {
                console.error('Error de geolocalización:', error);
                this.showToast('No se pudo obtener la ubicación', 'error');
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            }
        );
    }
    
    /**
     * Alterna el modo pantalla completa
     */
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                this.showToast('No se pudo activar pantalla completa', 'error');
            });
        } else {
            document.exitFullscreen();
        }
    }
    
    /**
     * Resetea la vista del mapa a la posición inicial
     */
    resetMapView() {
        map.setView(CONFIG.BARRANQUILLA_COORDS, CONFIG.DEFAULT_ZOOM);
        this.hideInstitutionInfo();
        this.showToast('Vista restablecida', 'success');
    }
    
    /**
     * Abre direcciones en Google Maps
     */
    getDirections() {
        if (!selectedInstitution) return;
        
        const [lat, lng] = selectedInstitution.coordinates;
        const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        window.open(url, '_blank');
    }
    
    /**
     * Comparte la ubicación de la institución seleccionada
     */
    async shareLocation() {
        if (!selectedInstitution) return;
        
        const shareData = {
            title: selectedInstitution.name,
            text: `${selectedInstitution.name} - ${selectedInstitution.address}`,
            url: window.location.href
        };
        
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback: copiar al portapapeles
                await navigator.clipboard.writeText(
                    `${shareData.title}\n${shareData.text}\n${shareData.url}`
                );
                this.showToast('Información copiada al portapapeles', 'success');
            }
        } catch (error) {
            console.error('Error compartiendo:', error);
            this.showToast('Error al compartir', 'error');
        }
    }
    
    /**
     * Muestra el overlay de carga
     */
    showLoadingOverlay() {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.remove('hidden');
            loadingOverlay.style.display = 'flex';
            loadingOverlay.style.opacity = '1';
        }
    }
    
    /**
     * Oculta el overlay de carga
     */
    hideLoadingOverlay() {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            // Agregar transición suave antes de ocultar
            loadingOverlay.style.transition = 'opacity 0.5s ease-out';
            loadingOverlay.style.opacity = '0';
            
            // Ocultar completamente después de la transición
            setTimeout(() => {
                loadingOverlay.classList.add('hidden');
                loadingOverlay.style.display = 'none';
            }, 500);
        }
    }
    
    /**
     * Inicializa el lazy loading para imágenes
     */
    initializeLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy-load');
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });
            
            // Observar todas las imágenes lazy
            document.querySelectorAll('img.lazy-load').forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback para navegadores sin IntersectionObserver
            document.querySelectorAll('img.lazy-load').forEach(img => {
                img.src = img.dataset.src;
                img.classList.remove('lazy-load');
                img.classList.add('loaded');
            });
        }
    }
    
    /**
     * Muestra una notificación toast
     */
    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        container.appendChild(toast);
        
        // Auto-remover después de 3 segundos
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}



// ===== INICIALIZACIÓN =====
let eduMap;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    try {
        eduMap = new BarranquillaEduMap();
        
        // Fallback de seguridad: ocultar loading después de 10 segundos máximo
        setTimeout(() => {
            const loadingOverlay = document.getElementById('loading-overlay');
            if (loadingOverlay && !loadingOverlay.classList.contains('hidden')) {
                console.warn('Loading overlay ocultado por fallback de seguridad');
                loadingOverlay.classList.add('hidden');
                loadingOverlay.style.display = 'none';
            }
        }, 10000);
        
    } catch (error) {
        console.error('Error durante la inicialización:', error);
        // Ocultar loading overlay en caso de error
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
            loadingOverlay.style.display = 'none';
        }
    }
});

// Fallback adicional en caso de que DOMContentLoaded ya haya ocurrido
if (document.readyState === 'loading') {
    // El DOM aún se está cargando, el event listener funcionará
    console.log('🔄 DOM aún cargando, esperando DOMContentLoaded...');
} else {
    // El DOM ya está listo, ejecutar inmediatamente
    console.log('⚡ DOM ya listo, inicializando aplicación inmediatamente...');
    try {
        eduMap = new BarranquillaEduMap();
        console.log('✅ Aplicación inicializada por fallback');
    } catch (error) {
        console.error('❌ Error en inicialización por fallback:', error);
        // Ocultar loading overlay en caso de error
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
            loadingOverlay.style.display = 'none';
        }
    }
}

// Agregar estilos CSS adicionales para marcadores personalizados
const additionalStyles = `
    <style>
        .custom-marker .marker-container {
            width: 40px;
            height: 40px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            border: 3px solid white;
        }
        
        .custom-marker .marker-container i {
            transform: rotate(45deg);
            color: white;
            font-size: 16px;
        }
        
        .user-location-marker {
            background: #ef4444;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
            animation: pulse 2s infinite;
        }
        
        .leaflet-popup-content {
            font-family: 'Inter', sans-serif;
            padding: 0;
            background: #0F1B26;  /* azul oscuro */
            border-radius: 8px;
            overflow: hidden;
            margin: 0;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            border: 1px solid #03588C;
        }
        
        .leaflet-popup-content-wrapper {
            margin: 0;
            padding: 0;
        }
        
        .leaflet-popup {
            margin-bottom: 20px;
        }
        
        .leaflet-popup-tip-container {
            margin: 0 auto;
        }

        .leaflet-popup-content::before {
            content: '';
            display: block;
            height: 4px;
            background: linear-gradient(90deg, #03588C 0%, #03A63C 50%, #F2CE16 100%);
        }

        .leaflet-popup-content h4 {
            margin: 12px 12px 8px 12px;
            color: #F2F2F2;  /* gris fondos */
            font-size: 16px;
            font-weight: 600;
            text-shadow: 0 1px 2px rgba(0,0,0,0.5);
            line-height: 1.3;
        }
        
        .institution-image {
            width: calc(100% - 24px);
            height: 120px;
            object-fit: cover;
            margin: 8px 12px 12px 12px;
            border-radius: 6px;
            transition: opacity 0.2s ease;
            background: #03588C;  /* azul fuerte */
            border: 2px solid #F2CE16;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        
        .institution-badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 500;
            color: white;
        }
        
        .institution-badge.universidad {
            background: #03588C;  /* azul fuerte */
        }

        .institution-badge.colegio {
            background: #03A63C;  /* Verde resal */
        }

        .institution-badge.tecnico {
            background: #F2CE16;  /* Amarillo el */
            color: #0F1B26;  /* azul oscuro para contraste */
        }
        
        .leaflet-popup-content p {
            margin: 6px 12px;
            font-size: 14px;
            color: #F2F2F2;  /* gris fondos */
        }

        .leaflet-popup-content i {
            width: 16px;
            margin-right: 8px;
            color: #F2CE16;  /* amarillo */
        }
        
        .description {
            font-style: italic;
            margin-top: 12px !important;
        }
        
        .leaflet-popup-content .popup-btn {
            margin: 12px;
            width: calc(100% - 24px);
        }

        .leaflet-popup-content .institution-badge {
            margin: 0 12px 8px 12px;
        }
        
        .popup-btn {
            padding: 8px 16px;
            border: none;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .popup-btn.primary {
            background: #03588C;  /* azul fuerte */
            color: #F2F2F2;  /* gris fondos para contraste */
        }

        .popup-btn.primary:hover {
            background: #0F1B26;  /* azul oscuro */
            color: #F2F2F2;  /* gris fondos para contraste */
        }
        
        .no-results {
            text-align: center;
            padding: 40px 20px;
            color: #94a3b8;
        }
        
        .no-results i {
            font-size: 48px;
            margin-bottom: 16px;
            opacity: 0.5;
        }

        /* MARCADORES ELEGANTES PARA PUNTOS CRÍTICOS */
        /* Estilos de marcadores movidos a styles.css para evitar conflictos */

        /* Tooltip personalizado para marcadores */
        .custom-marker-tooltip {
            background: rgba(255, 255, 255, 0.95);
            color: #1f2937;
            border: 2px solid #03588C;
            border-radius: 8px;
            padding: 8px 12px;
            font-size: 12px;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(10px);
            white-space: nowrap;
        }

        .status-badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 500;
            text-transform: uppercase;
        }

        .status-badge.activo {
            background-color: #16a34a;
            color: white;
        }

        .status-badge.inactivo {
            background-color: #6b7280;
            color: white;
        }

        .punto-critico-popup {
            min-width: 250px;
            background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%);
            border-radius: 12px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.15);
            border: 1px solid rgba(3, 88, 140, 0.2);
            overflow: hidden;
            position: relative;
        }

        .punto-critico-popup::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #03588C 0%, #03A63C 50%, #F2CE16 100%);
        }

        .punto-critico-popup h4 {
            color: #16a34a;
            margin-bottom: 12px;
            margin-top: 16px;
            font-size: 18px;
            font-weight: 700;
            padding: 0 16px;
        }

        .punto-critico-popup .info-row {
            margin: 4px 0;
            font-size: 13px;
        }

        .punto-critico-popup .info-row strong {
            color: #374151;
        }
    </style>
`;

// Inyectar estilos adicionales
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Estilos para optimización de popups
const popupOptimizationStyles = `
    <style>
        /* Optimización de animaciones de popup */
        .leaflet-popup {
            animation: popupFadeIn 0.15s ease-out;
        }
        
        .leaflet-popup.leaflet-popup-closing {
            animation: popupFadeOut 0.1s ease-in;
        }
        
        @keyframes popupFadeIn {
            from {
                opacity: 0;
                transform: translateY(-10px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes popupFadeOut {
            from {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            to {
                opacity: 0;
                transform: translateY(-5px) scale(0.98);
            }
        }
    </style>
`;

// Inyectar estilos de optimización de popups
document.head.insertAdjacentHTML('beforeend', popupOptimizationStyles);

// Estilos CSS personalizados para colorear el mapa con la paleta institucional
const mapCustomStyles = `
    <style>
        /* Estilos para las imágenes de instituciones */
        .institution-image {
            width: 80px;
            height: 60px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 10px;
            border: 2px solid #0F1B26;
            box-shadow: 0 2px 8px rgba(15, 27, 38, 0.2);
        }
        
        /* Estilos personalizados para la capa de barrios */
        .custom-barrios-layer {
            filter: hue-rotate(200deg) saturate(1.2) brightness(0.9);
        }
        
        /* Personalización del mapa base con colores institucionales */
        .leaflet-container {
            background-color: #f8f9fa !important;
            min-height: 400px !important;
        }
        
        .leaflet-tile-container {
            opacity: 1 !important;
        }
        
        .leaflet-tile {
            background-color: #e9ecef !important;
            transition: opacity 0.3s ease !important;
        }
        
        .leaflet-tile-loaded {
            opacity: 1 !important;
        }
        
        /* Estilos para elementos del mapa */
        .leaflet-control-zoom a {
            background-color: #0F1B26 !important;
            color: #FFFFFF !important;
            border: 1px solid #2E5984 !important;
        }
        
        .leaflet-control-zoom a:hover {
            background-color: #2E5984 !important;
        }
        
        /* Personalización de controles de capas */
        .leaflet-control-layers {
            background: linear-gradient(135deg, rgba(15, 27, 38, 0.9) 0%, rgba(46, 89, 132, 0.9) 100%) !important;
            color: #FFFFFF !important;
            border: 1px solid rgba(3, 88, 140, 0.4) !important;
            border-radius: 12px !important;
            backdrop-filter: blur(10px) !important;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3) !important;
            padding: 8px !important;
            min-width: 160px !important;
        }

        .leaflet-control-layers-toggle {
            background: linear-gradient(135deg, #03588C 0%, #2E5984 100%) !important;
            color: #FFFFFF !important;
            border-radius: 8px !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            transition: all 0.2s ease !important;
            width: 32px !important;
            height: 32px !important;
        }
        
        .leaflet-control-layers-toggle:hover {
            background: linear-gradient(135deg, #F2CE16 0%, #03A63C 100%) !important;
            color: #0F1B26 !important;
            transform: scale(1.05) !important;
        }
        
        .leaflet-control-layers label {
            color: #F2F2F2 !important;
            font-size: 13px !important;
            font-weight: 500 !important;
            margin: 4px 0 !important;
            display: flex !important;
            align-items: center !important;
            transition: color 0.2s ease !important;
        }
        
        .leaflet-control-layers label:hover {
            color: #F2CE16 !important;
        }
        
        .leaflet-control-layers input[type="radio"] {
            accent-color: #F2CE16 !important;
            margin-right: 8px !important;
        }
        
        .leaflet-control-layers-separator {
            border-top: 1px solid rgba(242, 206, 22, 0.3) !important;
            margin: 8px 0 !important;
        }
        
        /* Estilos para etiquetas de barrios */
        .barrio-label-container {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
        }
        
        .barrio-label {
            background: rgba(3, 88, 140, 0.85);
            color: white;
            padding: 1px 4px;
            border-radius: 6px;
            font-size: 7px;
            font-weight: 600;
            text-align: center;
            white-space: nowrap;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(3px);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            letter-spacing: 0.1px;
            text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
            transition: all 0.2s ease;
            cursor: default;
            pointer-events: none;
            opacity: 0;
            transform: scale(0.9);
            line-height: 1.2;
        }
        
        /* Control de visibilidad por zoom */
        .leaflet-zoom-level-10 .barrio-label[data-zoom-min="13"],
        .leaflet-zoom-level-11 .barrio-label[data-zoom-min="13"],
        .leaflet-zoom-level-12 .barrio-label[data-zoom-min="13"] {
            opacity: 0;
            display: none;
        }
        
        .leaflet-zoom-level-13 .barrio-label[data-zoom-min="13"],
        .leaflet-zoom-level-14 .barrio-label[data-zoom-min="13"],
        .leaflet-zoom-level-15 .barrio-label[data-zoom-min="13"],
        .leaflet-zoom-level-16 .barrio-label[data-zoom-min="13"],
        .leaflet-zoom-level-17 .barrio-label[data-zoom-min="13"],
        .leaflet-zoom-level-18 .barrio-label[data-zoom-min="13"] {
            opacity: 1;
            transform: scale(1);
            display: block;
        }
        
        /* Tamaños responsivos más pequeños y sutiles */
        .leaflet-zoom-level-13 .barrio-label {
            font-size: 6px;
            padding: 1px 3px;
        }
        
        .leaflet-zoom-level-14 .barrio-label {
            font-size: 7px;
            padding: 1px 4px;
        }
        
        .leaflet-zoom-level-15 .barrio-label,
        .leaflet-zoom-level-16 .barrio-label {
            font-size: 8px;
            padding: 2px 5px;
        }
        
        .leaflet-zoom-level-17 .barrio-label,
        .leaflet-zoom-level-18 .barrio-label {
            font-size: 9px;
            padding: 2px 6px;
        }
    </style>
`;

// Insertar estilos en el head
document.head.insertAdjacentHTML('beforeend', mapCustomStyles);