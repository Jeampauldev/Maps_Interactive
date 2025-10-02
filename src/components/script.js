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
    
    // Configuración de capas de mapa con proveedores gratuitos y estables
    MAP_LAYERS: {
        detailed: {
            name: 'Detallado Moderno',
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            errorTileUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='
        },
        satellite: {
            name: 'Satélite HD',
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
            errorTileUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='
        },
        minimal: {
            name: 'Minimalista',
            url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a>',
            errorTileUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='
        },
        dark: {
            name: 'Oscuro Elegante',
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            errorTileUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='
        },
        streets: {
            name: 'Calles Básicas',
            url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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
let puntosVoluminosos = [];
let allPoints = []; // Array combinado de todos los puntos
let barriosWithPoints = new Set(); // Nuevo Set para almacenar barrios con puntos
let cachedIconSvg = null; // Variable para cachear el SVG del ícono verde (críticos)
let cachedOrangeIconSvg = null; // Variable para cachear el SVG del ícono naranja (voluminosos)
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
            console.log('🚀 Iniciando aplicación...');
            this.showLoadingOverlay();
            
            console.log('🗺️ Inicializando mapa...');
            await this.initializeMap();
            
            console.log('🎨 Cargando iconos...');
            await this.loadIconTemplate();
            
            console.log('🎲 Configurando eventos...');
            this.setupEventListeners();
            
            console.log('📍 Cargando puntos críticos...');
            await this.loadPuntosCriticos();
            
            console.log('📊 Actualizando estadísticas...');
            this.updateStatistics();
            
            this.hideLoadingOverlay();
            this.showToast('Mapa cargado exitosamente', 'success');
            console.log('✅ Aplicación inicializada correctamente');
            
        } catch (error) {
            console.error('❌ Error inicializando la aplicación:', error);
            console.error('Stack trace:', error.stack);
            this.showToast('Error al cargar el mapa: ' + error.message, 'error');
            this.hideLoadingOverlay();
        }
    }

    /**
     * Carga las plantillas de iconos SVG desde archivos externos
     */
    async loadIconTemplate() {
        if (cachedIconSvg && cachedOrangeIconSvg) return;
        
        try {
            console.log('🔄 Iniciando carga de iconos...');
            
            // Cargar icono verde para puntos críticos
            console.log('Cargando icono verde...');
            const responseGreen = await fetch('src/assets/icons/icono_ubicacion.xml');
            if (responseGreen.ok) {
                cachedIconSvg = await responseGreen.text();
                console.log('✅ Icono verde cargado');
            } else {
                throw new Error(`Error cargando icono verde: ${responseGreen.status}`);
            }
            
            // Cargar icono naranja para puntos voluminosos
            console.log('Cargando icono naranja...');
            const responseOrange = await fetch('src/assets/icons/icono_ubicacion_naranja.xml');
            if (responseOrange.ok) {
                cachedOrangeIconSvg = await responseOrange.text();
                console.log('✅ Icono naranja cargado');
            } else {
                console.warn('Icono naranja no encontrado, usando fallback');
                // Usar el icono verde como fallback para naranjas
                cachedOrangeIconSvg = cachedIconSvg.replace(/#03A63C/g, '#FF8C00');
            }
            
        } catch (error) {
            console.error('Error cargando iconos:', error);
            // Fallback con iconos SVG simples
            cachedIconSvg = `<svg width="30" height="30" viewBox="0 0 30 30"><circle cx="15" cy="15" r="10" fill="#03A63C" stroke="white" stroke-width="2"/><text x="15" y="20" font-size="8" fill="white" text-anchor="middle">{{ID}}</text></svg>`;
            cachedOrangeIconSvg = `<svg width="30" height="30" viewBox="0 0 30 30"><circle cx="15" cy="15" r="10" fill="#FF8C00" stroke="white" stroke-width="2"/><text x="15" y="20" font-size="8" fill="white" text-anchor="middle">{{ID}}</text></svg>`;
            console.log('✅ Iconos fallback creados');
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
            renderer: L.canvas({
                padding: 0.5,
                tolerance: 0
            }),
            // Configuraciones específicas para Vercel
            worldCopyJump: false,
            maxBoundsViscosity: 1.0,
            inertia: true,
            inertiaDeceleration: 3000,
            inertiaMaxSpeed: Infinity,
            easeLinearity: 0.2,
            // Configuración del canvas para evitar fondo blanco
            attributionControl: false,
            zoomSnap: 1,
            zoomDelta: 1
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
                timeout: 15000,
                retryAttempts: 5,
                crossOrigin: 'anonymous',
                // Configuraciones específicas para canvas y Vercel
                keepBuffer: 2,
                updateWhenIdle: false,
                updateWhenZooming: true,
                updateInterval: 200,
                zIndex: 1,
                opacity: 1,
                // Prevenir fondo blanco durante carga
                className: 'custom-tile-layer'
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
        
        // Filtros por tipo de punto crítico - incluir todos los tipos disponibles
        ['critico', 'voluminoso'].forEach(type => {
            const checkbox = document.getElementById(`filter-${type}`);
            if (checkbox) {
                console.log(`✅ Event listener agregado para filter-${type}`);
                
                // Usar solo el evento change, que es más confiable
                checkbox.addEventListener('change', (e) => {
                    console.log(`🔄 Checkbox ${type} cambiado a:`, e.target.checked);
                    this.handleFilterChange();
                });
                
                // Manejar click en el label padre completo
                const label = checkbox.closest('.filter-item');
                if (label) {
                    // Event listener para todo el label
                    label.addEventListener('click', (e) => {
                        // Prevenir que el click se propague si ya se hizo click en el checkbox
                        if (e.target === checkbox) {
                            return; // Dejar que el checkbox maneje su propio evento
                        }
                        
                        console.log(`🏷️ Click en label completo ${type}`);
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Cambiar el estado del checkbox
                        checkbox.checked = !checkbox.checked;
                        console.log(`🔄 Label click - Checkbox ${type} cambiado a:`, checkbox.checked);
                        
                        // Disparar evento change manualmente
                        checkbox.dispatchEvent(new Event('change'));
                    });
                }
                
                // Event listeners específicos para los spans para mayor responsividad
                const filterText = label?.querySelector('.filter-text');
                const countSpan = label?.querySelector('.count');
                const checkmark = label?.querySelector('.checkmark');
                
                // Agregar event listeners a cada elemento clickeable
                [filterText, countSpan, checkmark].forEach(element => {
                    if (element) {
                        element.addEventListener('click', (e) => {
                            console.log(`📝 Click directo en elemento ${element.className} para ${type}`);
                            e.preventDefault();
                            e.stopPropagation();
                            
                            // Cambiar el estado del checkbox
                            checkbox.checked = !checkbox.checked;
                            console.log(`🔄 Elemento click - Checkbox ${type} cambiado a:`, checkbox.checked);
                            
                            // Disparar evento change manualmente
                            checkbox.dispatchEvent(new Event('change'));
                        });
                        
                        // Agregar estilo de cursor pointer
                        element.style.cursor = 'pointer';
                    }
                });
                
            } else {
                console.error(`❌ Checkbox filter-${type} no encontrado`);
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
                        color: '#03588C', // Borde azul consistente
                        fillColor: 'transparent', // Sin relleno
                        fillOpacity: 0, // Asegurar que no haya relleno
                        weight: 0.8, // Línea más delgada
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
                        
                        // Crear etiqueta permanente para el nombre del barrio, solo si el barrio tiene puntos
                        const barrioNombreLower = feature.properties.nombre.toLowerCase();
                        const hasPoint = barriosWithPoints.has(barrioNombreLower);
                        console.log(`Barrio: ${feature.properties.nombre}, Tiene punto: ${hasPoint}`); // DEBUG LOG
                        if (hasPoint) {
                            const bounds = layer.getBounds();
                            const center = bounds.getCenter();
                            
                            // Calcular tamaño dinámico basado en el área del barrio
                            const area = (bounds.getNorthEast().lat - bounds.getSouthWest().lat) * 
                                       (bounds.getNorthEast().lng - bounds.getSouthWest().lng);
                            const labelWidth = Math.min(Math.max(feature.properties.nombre.length * 8, 60), 150);
                            
                            const labelIcon = L.divIcon({
                                className: 'barrio-label-container',
                                html: `<div class="barrio-label" data-zoom-min="12">${feature.properties.nombre}</div>`,
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
            const fallbackLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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
            /* Esta función ahora solo se encarga de los popups de barrios si fuera necesario en el futuro. */
            /* Los estilos principales del popup de puntos críticos se han movido a styles.css */
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
     * Carga y renderiza los puntos críticos en el mapa
     */
    async loadPuntosCriticos() {
        try {
            console.log('Cargando puntos críticos desde src/data/puntos_criticos.json...');
            const response = await fetch('src/data/puntos_criticos.json');
            if (!response.ok) {
                throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            puntosData = data.features || [];
            
            if (puntosData.length === 0) {
                console.warn('No se encontraron puntos críticos en el archivo');
            }
            
            // Marcar como puntos críticos
            puntosData.forEach(punto => {
                punto.pointType = 'critico';
            });
            
            console.log(`✅ Cargados ${puntosData.length} puntos críticos`);
            
            // Cargar también puntos voluminosos
            await this.loadPuntosVoluminosos();
            
        } catch (error) {
            console.error('❌ Error cargando puntos críticos:', error);
            this.showToast('Error al cargar puntos críticos: ' + error.message, 'error');
            // Continuar con datos vacíos para no bloquear la aplicación
            puntosData = [];
            await this.loadPuntosVoluminosos();
        }
    }
    
    /**
     * Carga y renderiza los puntos voluminosos en el mapa
     */
    async loadPuntosVoluminosos() {
        try {
            console.log('Cargando puntos voluminosos desde src/data/puntos_voluminosos.json...');
            const response = await fetch('src/data/puntos_voluminosos.json');
            if (!response.ok) {
                throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            if (!Array.isArray(data)) {
                throw new Error('Los datos de puntos voluminosos no tienen el formato esperado (array)');
            }
            
            // Convertir formato de puntos voluminosos a GeoJSON
            puntosVoluminosos = data.map(punto => {
                if (!punto.COORD_X || !punto.COORD_Y) {
                    console.warn('Punto voluminoso sin coordenadas:', punto.ID);
                    return null;
                }
                
                return {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [punto.COORD_Y, punto.COORD_X] // [lng, lat]
                    },
                    properties: {
                        id: punto.ID,
                        barrio: punto.BARRIO,
                        localidad: punto.LOCALIDAD,
                        estado_actual: punto.ESTADO_ACTUAL,
                        poblacion_impactada: punto.POBLACION_IMPACTADA,
                        toneladas_co2_equivalente: punto.TONELADAS_DE_CO2_EQUIVALENTE,
                        tipo_residuo: 'Residuos Voluminosos',
                        acciones_realizadas: punto.ACCIONES_REALIZADAS || 'Recuperación de residuos voluminosos',
                        direccion: punto.DIRECCION || 'No especificada'
                    },
                    pointType: 'voluminoso'
                };
            }).filter(punto => punto !== null); // Filtrar puntos inválidos
            
            console.log(`✅ Cargados ${puntosVoluminosos.length} puntos voluminosos`);
            
        } catch (error) {
            console.error('❌ Error cargando puntos voluminosos:', error);
            this.showToast('Error al cargar puntos voluminosos: ' + error.message, 'error');
            // Continuar con datos vacíos
            puntosVoluminosos = [];
        }
        
        // Siempre combinar puntos y renderizar, incluso si hay errores
        this.combineAndRenderAllPoints();
        
        // Inicializar checkboxes por defecto (ambos marcados)
        this.initializeFilters();
    }
    
    /**
     * Combina todos los tipos de puntos y los renderiza
     */
    combineAndRenderAllPoints() {
        console.log('🔄 Combinando y renderizando puntos...');
        console.log(`Puntos críticos disponibles: ${puntosData.length}`);
        console.log(`Puntos voluminosos disponibles: ${puntosVoluminosos.length}`);
        
        // Combinar todos los puntos
        allPoints = [...puntosData, ...puntosVoluminosos];
        console.log(`Total puntos combinados: ${allPoints.length}`);
        
        // Debug: mostrar tipos de puntos
        const tiposPuntos = allPoints.map(p => p.pointType);
        console.log('Tipos de puntos:', tiposPuntos);
        
        // Poblar barriosWithPoints
        barriosWithPoints.clear();
        allPoints.forEach(punto => {
            if (punto.properties && punto.properties.barrio) {
                barriosWithPoints.add(punto.properties.barrio.toLowerCase());
            }
        });
        
        // Limpiar marcadores existentes
        puntosLayer.clearLayers();
        currentPuntosCriticos = [];
        
        // Crear marcadores para todos los puntos
        console.log('🗺️ Creando marcadores...');
        allPoints.forEach((punto, index) => {
            console.log(`Creando marcador ${index + 1}: ${punto.properties.id} (tipo: ${punto.pointType})`);
            const marker = punto.pointType === 'voluminoso' ? 
                this.createPuntoVoluminosoMarker(punto) : 
                this.createPuntoCriticoMarker(punto);
            
            if (marker) {
                currentPuntosCriticos.push({ marker, punto });
                console.log(`✅ Marcador creado exitosamente para ${punto.properties.id}`);
            } else {
                console.error(`❌ Error creando marcador para ${punto.properties.id}`);
            }
        });
        
        console.log(`Total renderizado: ${allPoints.length} puntos (${puntosData.length} críticos + ${puntosVoluminosos.length} voluminosos)`);
        console.log(`Marcadores creados: ${currentPuntosCriticos.length}`);
        
        // Actualizar estadísticas y UI con todos los puntos (estado inicial)
        this.updateStatistics(allPoints);
        this.updateFilterCounts();
        this.updatePointsList(allPoints);
    }


    
    /**
     * Crea un marcador personalizado para un punto crítico
     */
    createPuntoCriticoMarker(punto) {
        console.log(`🟢 Creando marcador crítico para: ${punto.properties.id}`);
        const coordinates = [punto.geometry.coordinates[1], punto.geometry.coordinates[0]];
        const properties = punto.properties;
        
        console.log(`Coordenadas: [${coordinates[0]}, ${coordinates[1]}]`);

        // Usar la plantilla cacheada y reemplazar el placeholder
        if (!cachedIconSvg) {
            console.error(`❌ Plantilla de ícono verde no disponible para ${properties.id}`);
            return null;
        }
        const iconHtml = cachedIconSvg.replace('{{ID}}', properties.id || 'N/A');
        console.log('✅ Icono HTML generado para punto crítico');

        const icon = L.divIcon({
            className: 'custom-point-marker',
            html: iconHtml,
            iconSize: [30, 30],      // Dimensiones finales del ícono minimalista
            iconAnchor: [15, 28],     // Ancla en la punta de la línea
            popupAnchor: [0, -30]     // El popup se abre encima del ícono
        });
        
        const marker = L.marker(coordinates, { icon })
            .bindPopup(this.createPuntoCriticoPopupContent(properties, coordinates), {
                maxWidth: 380,
                className: 'punto-critico-popup-wrapper'
            })
            .bindTooltip(`
                <div class="population-tooltip-content">
                    <i class="fas fa-users"></i>
                    <span>${properties.poblacion_impactada ? properties.poblacion_impactada.toLocaleString('es-CO') : '0'}</span>
                </div>
            `, {
                permanent: false,
                direction: 'right',
                offset: [20, -18], // Recalibrado para el nuevo tamaño de ícono
                className: 'population-tooltip' // Nueva clase para el estilo personalizado
            });
        
        puntosLayer.addLayer(marker);
        return marker;
    }
    
    /**
     * Crea un marcador personalizado para un punto voluminoso (usa icono naranja)
     */
    createPuntoVoluminosoMarker(punto) {
        console.log(`🟠 Creando marcador voluminoso para: ${punto.properties.id}`);
        const coordinates = [punto.geometry.coordinates[1], punto.geometry.coordinates[0]];
        const properties = punto.properties;
        
        console.log(`Coordenadas: [${coordinates[0]}, ${coordinates[1]}]`);

        // Usar la plantilla naranja cacheada para puntos voluminosos
        if (!cachedOrangeIconSvg) {
            console.error(`❌ Plantilla de ícono naranja no disponible para ${properties.id}`);
            return null;
        }
        const iconHtml = cachedOrangeIconSvg.replace('{{ID}}', properties.id || 'N/A');
        console.log('✅ Icono HTML generado para punto voluminoso');

        const icon = L.divIcon({
            className: 'custom-point-marker', // Misma clase que puntos críticos
            html: iconHtml,
            iconSize: [30, 30],      
            iconAnchor: [15, 28],     
            popupAnchor: [0, -30]     
        });
        
        const marker = L.marker(coordinates, { icon })
            .bindPopup(this.createPuntoCriticoPopupContent(properties, coordinates), { // Usar el mismo popup que críticos
                maxWidth: 300, // Reducir el ancho para puntos voluminosos
                className: 'punto-critico-popup-wrapper' // Misma clase que puntos críticos
            })
            .bindTooltip(`
                <div class="population-tooltip-content">
                    <i class="fas fa-users"></i>
                    <span>${properties.poblacion_impactada ? properties.poblacion_impactada.toLocaleString('es-CO') : '0'}</span>
                </div>
            `, {
                permanent: false,
                direction: 'right',
                offset: [20, -18], 
                className: 'population-tooltip' // Mismo tooltip que críticos
            });
        
        puntosLayer.addLayer(marker);
        return marker;
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
        // Buscar en todos los puntos (críticos + voluminosos)
        const pointData = currentPuntosCriticos.find(p => p.punto.properties.id === pointId);
        if (pointData) {
            const coords = [pointData.punto.geometry.coordinates[1], pointData.punto.geometry.coordinates[0]];
            map.setView(coords, 16);
            
            // Abrir el popup del marcador correspondiente
            if (pointData.marker) {
                pointData.marker.openPopup();
            }
        }
    }
    
    /**
     * Crea el contenido HTML para el popup de un punto crítico con diseño mejorado
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

        const formatNumber = (num) => num ? parseFloat(num).toLocaleString('es-CO') : '0';

        // Determinar el tipo de punto basado en el ID
        const isVoluminoso = properties.id && properties.id.startsWith('VL');
        const pointTitle = isVoluminoso ? `Residuo Voluminoso ${properties.id || 'N/A'}` : `Punto Crítico ${properties.id || 'N/A'}`;
        
        // Generar la ruta de la foto para puntos críticos
        let photoHtml = '';
        if (!isVoluminoso && properties.id) {
            // Convertir PC001 → PC_001.jpg
            const photoId = properties.id.replace('PC', 'PC_');
            const photoPath = `./src/assets/Photos/${photoId}.jpg`;
            
            photoHtml = `
                <div class="popup-photo" style="margin: 6px 0; text-align: center;">
                    <img src="${photoPath}" 
                         alt="Foto del ${pointTitle}" 
                         style="width: 100%; max-width: 200px; height: 120px; object-fit: cover; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);"
                         onerror="this.parentElement.style.display='none';"
                         onload="this.parentElement.style.display='block';">
                </div>
            `;
        }
        
        return `
            <div class="popup-container" style="font-family: var(--font-family);">
                <div class="popup-header" style="background-color: #FFFFFF; color: #374151; padding: 6px 10px 0 10px;">
                    <h4 style="margin: 0; font-size: 15px; font-weight: 700;">${pointTitle}</h4>
                    <p style="margin: 2px 0 0; font-size: 12px; opacity: 0.9;">Barrio: ${properties.barrio || 'No especificado'}</p>
                </div>
                
                ${photoHtml}
                
                <div style="padding: 0 10px;">
                    <div style="display: flex; justify-content: space-around; align-items: flex-start; padding-top: 6px; margin-bottom: 6px; text-align: center;">
                        <div title="Población Impactada">
                            <i class="fas fa-users" style="color: #16a34a; font-size: 14px; margin-bottom: 3px;"></i>
                            <p style="margin: 0; font-weight: 600; color: #374151; font-size: 13px;">${formatNumber(properties.poblacion_impactada)}</p>
                            <p style="margin: 0; font-size: 9px; color: #6b7280;">Población Impactada</p>
                        </div>
                        <div title="Toneladas de CO₂ Equivalente">
                            <i class="fas fa-smog" style="color: #16a34a; font-size: 14px; margin-bottom: 3px;"></i>
                            <p style="margin: 0; font-weight: 600; color: #374151; font-size: 13px;">${formatNumber(properties.toneladas_co2_equivalente)}</p>
                            <p style="margin: 0; font-size: 9px; color: #6b7280;">Ton CO₂ Equiv.</p>
                        </div>
                        ${!isVoluminoso ? `
                        <div title="Área Recuperada">
                            <i class="fas fa-leaf" style="color: #16a34a; font-size: 14px; margin-bottom: 3px;"></i>
                            <p style="margin: 0; font-weight: 600; color: #374151; font-size: 13px;">${formatNumber(properties.area_recuperada_m2)}</p>
                            <p style="margin: 0; font-size: 9px; color: #6b7280;">m² Recuperados</p>
                        </div>` : ''}
                    </div>

                    <div style="line-height: 1.4; font-size: 12px; padding-bottom: 6px;">
                        ${!isVoluminoso ? `
                        <div style="margin-bottom: 8px;">
                            <i class="fas fa-map-marker-alt" style="color: #4b5563; width: 16px; margin-right: 5px;"></i>
                            <span style="font-weight: 600; color: #374151;">Dirección:</span>
                            <p style="margin: 0 0 0 21px; color: #6b7280; font-size: 11px;">${properties.direccion || 'No especificada'}</p>
                        </div>` : ''}
                        
                        ${isVoluminoso && properties.localidad ? `
                        <div style="margin-bottom: 8px;">
                            <i class="fas fa-building" style="color: #4b5563; width: 16px; margin-right: 5px;"></i>
                            <span style="font-weight: 600; color: #374151;">Localidad:</span>
                            <p style="margin: 0 0 0 21px; color: #6b7280; font-size: 11px;">${properties.localidad}</p>
                        </div>` : ''}
                        
                        ${properties.tipo_residuo ? `
                        <div style="margin-bottom: 8px;">
                            <i class="fas fa-trash" style="color: #4b5563; width: 16px; margin-right: 5px;"></i>
                            <span style="font-weight: 600; color: #374151;">Tipo de residuo:</span>
                            <p style="margin: 0 0 0 21px; color: #6b7280; font-size: 11px;">${properties.tipo_residuo || 'No especificado'}</p>
                        </div>` : ''}
                        
                        ${properties.acciones_realizadas && properties.acciones_realizadas !== 'ND' ? `
                        <div style="margin-bottom: 8px;">
                            <i class="fas fa-tools" style="color: #4b5563; width: 16px; margin-right: 5px;"></i>
                            <span style="font-weight: 600; color: #374151;">Acciones realizadas:</span>
                            <p style="margin: 0 0 0 21px; color: #6b7280; font-size: 11px;">${properties.acciones_realizadas}</p>
                        </div>` : ''}
                    </div>
                </div>
                
                <div style="border-top: 1px solid #e5e7eb; padding: 3px 8px; background: #f9fafb;">
                    <small style="color: #9ca3af; font-size: 9px; display: flex; align-items: center;">
                        <i class="fas fa-globe" style="margin-right: 4px;"></i>
                        Lat: ${coordinates[0].toFixed(6)}, Long: ${coordinates[1].toFixed(6)}
                    </small>
                </div>
            </div>
        `;
    }
    
    // Función eliminada: createPuntoVoluminosoPopupContent
    // Los puntos voluminosos ahora usan el mismo popup que los críticos
    
    /**
     * Maneja la búsqueda de instituciones
     */
    handleSearch(query) {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        this.searchTimeout = setTimeout(() => {
            this.performSearch(query);
        }, 300);
    }
    
    /**
     * Realiza la búsqueda y filtra los puntos en el mapa y la lista
     */
    performSearch(query) {
        const searchTerm = query.toLowerCase().trim();
        this.applyFilters(searchTerm);
    }
    
    /**
     * Maneja los cambios en los filtros por tipo
     */
    handleFilterChange() {
        const query = document.getElementById('search-input')?.value || '';
        this.applyFilters(query.toLowerCase().trim());
    }
    
    applyFilters(searchTerm = '') {
        const filterCriticoChecked = document.getElementById('filter-critico')?.checked ?? false;
        const filterVoluminosoChecked = document.getElementById('filter-voluminoso')?.checked ?? false;

        console.log('🔍 Aplicando filtros:', { searchTerm, filterCriticoChecked, filterVoluminosoChecked });

        // Usar TODOS los puntos (críticos + voluminosos)
        let pointsAfterSearch = allPoints;

        // 1. Apply search term filter - buscar en TODOS los puntos
        if (searchTerm) {
            pointsAfterSearch = allPoints.filter(feature => {
                if (!feature.properties) return false;
                const props = feature.properties;
                const searchIn = [
                    props.id,
                    props.direccion,
                    props.barrio,
                    props.tipo_residuo,
                    props.acciones_realizadas,
                    props.localidad
                ].join(' ').toLowerCase();
                return searchIn.includes(searchTerm);
            });
        }

        // 2. Apply type filters usando pointType
        let finalFilteredPoints;
        
        console.log('Estado de checkboxes antes de filtrar:', { filterCriticoChecked, filterVoluminosoChecked });
        
        // Si TODOS los filtros están marcados O NINGUNO está marcado, mostrar TODOS los puntos
        if ((filterCriticoChecked && filterVoluminosoChecked) || 
            (!filterCriticoChecked && !filterVoluminosoChecked)) {
            console.log('🎆 Mostrando TODOS los puntos (todos los filtros activos o ninguno)');
            finalFilteredPoints = pointsAfterSearch;
        } else {
            // Al menos un filtro está marcado, aplicar filtrado específico
            console.log('⚙️ Aplicando filtrado específico');
            finalFilteredPoints = pointsAfterSearch.filter(feature => {
                if (!feature.properties) return false;
                
                // Usar pointType para determinar el tipo
                const isCritico = feature.pointType === 'critico';
                const isVoluminoso = feature.pointType === 'voluminoso';
                
                console.log(`Evaluando punto ${feature.properties.id}: tipo=${feature.pointType}, isCritico=${isCritico}, isVoluminoso=${isVoluminoso}`);

                // Solo mostrar puntos que coincidan con algún filtro marcado
                let matchesFilter = false;
                if (filterCriticoChecked && isCritico) {
                    matchesFilter = true;
                    console.log(`✅ Punto crítico ${feature.properties.id} incluido`);
                }
                if (filterVoluminosoChecked && isVoluminoso) {
                    matchesFilter = true;
                    console.log(`✅ Punto voluminoso ${feature.properties.id} incluido`);
                }
                
                if (!matchesFilter) {
                    console.log(`❌ Punto ${feature.properties.id} excluido`);
                }
                
                return matchesFilter;
            });
        }
        
        console.log(`📋 Puntos finales después de filtrado: ${finalFilteredPoints.length} de ${pointsAfterSearch.length} puntos`);

        // Update map markers - usar la función correcta según el tipo
        console.log(`🗺️ Renderizando ${finalFilteredPoints.length} puntos filtrados`);
        puntosLayer.clearLayers();
        
        finalFilteredPoints.forEach(punto => {
            console.log(`Renderizando punto: ${punto.properties.id} (tipo: ${punto.pointType})`);
            if (punto.pointType === 'voluminoso') {
                this.createPuntoVoluminosoMarker(punto);
            } else {
                this.createPuntoCriticoMarker(punto);
            }
        });

        // Update stats and sidebar list con puntos filtrados actuales
        this.updateStatistics(finalFilteredPoints);
        this.updatePointsList(finalFilteredPoints);
    }
    
    /**
     * Actualiza la lista de puntos en el sidebar
     */
    updatePointsList(points) {
        console.log('📋 Actualizando lista de puntos:', points?.length || 0, 'puntos');
        const container = document.getElementById('points-container');
        if (!container) {
            console.error('❌ Contenedor points-container no encontrado');
            return;
        }
        
        console.log('Container encontrado:', container);
        
        // Validar que points sea un array válido
        if (!points || !Array.isArray(points) || points.length === 0) {
            console.log('⚠️ No hay puntos para mostrar');
            container.innerHTML = `
                <div class="no-results" style="text-align: center; padding: 20px; color: #86868b;">
                    <i class="fas fa-info-circle" style="font-size: 24px; margin-bottom: 10px;"></i>
                    <p>No se encontraron resultados.</p>
                </div>
            `;
            return;
        }
        
        console.log('📋 Generando HTML para', points.length, 'puntos...');

        const htmlContent = points.map((feature, index) => {
            const props = feature.properties;
            const statusClass = props.estado_actual ? props.estado_actual.toLowerCase().replace(/ /g, '-') : 'sin-estado';
            
            // Calcular datos adicionales valiosos
            const area = parseFloat(props.area_recuperada_m2) || 0;
            const co2 = parseFloat(props.toneladas_co2_equivalente) || 0;
            const poblacion = parseInt(props.poblacion_impactada) || 0;
            
            console.log(`Generando tarjeta ${index + 1}:`, props.id, 'en barrio', props.barrio);
            
            // Determinar si es un punto voluminoso
            const isVoluminoso = props.id && props.id.startsWith('VL');
            
            return `
                <div class="point-card compact" onclick="eduMap.selectPuntoCritico('${props.id}')">
                    <div class="point-card-header">
                        <strong>${props.id}</strong>
                        ${!isVoluminoso ? `<span class="point-card-status ${statusClass}">${props.estado_actual || 'N/A'}</span>` : ''}
                    </div>
                    <div class="point-card-body">
                        <div class="point-card-location">
                            <div class="point-card-barrio">
                                <i class="fas fa-map-marker-alt"></i>
                                <strong>${props.barrio || 'No especificado'}</strong>
                            </div>
                            ${!isVoluminoso ? `<div class="point-card-address">${props.direccion || 'Dirección no disponible'}</div>` : ''}
                            <div class="point-card-locality">Localidad: ${props.localidad || 'Localidad no especificada'}</div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        console.log('✅ HTML generado, longitud:', htmlContent.length, 'caracteres');
        container.innerHTML = htmlContent;
        console.log('✅ HTML insertado en el contenedor. Contenido:', container.innerHTML.substring(0, 200) + '...');
    }
    
    /**
     * Actualiza las estadísticas en el header y filtros usando datos reales del JSON
     */
    updateStatistics(visiblePoints = allPoints) {
        console.log('=== updateStatistics() iniciada ===');
        console.log('visiblePoints.length:', visiblePoints.length);
        
        // Calcular métricas reales desde los puntos visibles (críticos + voluminosos)
        let totalAreaRecuperada = 0; // en m²
        let totalPoblacionImpactada = 0;
        let totalCo2Equivalente = 0;
        const barriosImpactados = new Set(); // Solo barrios con puntos críticos
        
        // Separar puntos críticos de voluminosos para el conteo
        let puntosCriticosCount = 0;
        
        // Procesar puntos visibles (críticos + voluminosos)
        visiblePoints.forEach((punto, index) => {
            const properties = punto.properties;
            const isVoluminoso = properties.id && properties.id.startsWith('VL');
            
            // Solo contar puntos críticos en el total (excluir voluminosos)
            if (!isVoluminoso) {
                puntosCriticosCount++;
                
                // Solo agregar barrios de puntos críticos al conjunto
                if (properties.barrio) {
                    barriosImpactados.add(properties.barrio);
                }
            }
            
            // Sumar datos reales del JSON
            const area = parseFloat(properties.area_recuperada_m2) || 0;
            const poblacion = parseInt(properties.poblacion_impactada) || 0;
            const co2 = parseFloat(properties.toneladas_co2_equivalente) || 0;
            
            totalAreaRecuperada += area;
            totalPoblacionImpactada += poblacion;
            totalCo2Equivalente += co2;
            
            console.log(`Punto ${index} (${punto.pointType}): área=${area}, población=${poblacion}, co2=${co2}, barrio=${properties.barrio}, isVoluminoso=${isVoluminoso}`);
        });
        
        console.log('Totales calculados (visibles):', {
            totalPuntos: visiblePoints.length,
            puntosCriticosCount,
            totalAreaRecuperada,
            totalPoblacionImpactada,
            totalCo2Equivalente,
            barrios: barriosImpactados.size
        });
        
        // Totales finales basados en puntos críticos únicamente (excluyendo voluminosos)
        const totalPuntos = puntosCriticosCount;
        const areaRecuperadaM2 = totalAreaRecuperada;
        
        console.log('Actualizando elementos del DOM:', {
            totalPuntos,
            areaRecuperadaM2,
            totalPoblacionImpactada,
            totalCo2Equivalente,
            barrios: barriosImpactados.size
        });
        
        // Actualizar estadísticas del header con datos reales
        const totalElement = document.getElementById('total-points');
        if (totalElement) {
            totalElement.textContent = totalPuntos.toLocaleString('es-CO');
            console.log('Total points actualizado:', totalPuntos);
        } else {
            console.error('Elemento total-points no encontrado');
        }
        
        const areaElement = document.getElementById('recovered-area');
        if (areaElement) {
            areaElement.textContent = areaRecuperadaM2.toLocaleString('es-CO');
            console.log('m² recuperados actualizado:', areaRecuperadaM2);
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
            localidadesElement.textContent = barriosImpactados.size.toLocaleString('es-CO');
            console.log('Barrios impactados actualizado:', barriosImpactados.size);
        } else {
            console.error('Elemento total-localities no encontrado');
        }
    }
    
    /**
     * Inicializa los filtros con valores por defecto
     */
    initializeFilters() {
        console.log('🎮 Inicializando filtros...');
        
        // Marcar ambos checkboxes por defecto
        const criticoCheckbox = document.getElementById('filter-critico');
        const voluminosoCheckbox = document.getElementById('filter-voluminoso');
        
        if (criticoCheckbox) {
            criticoCheckbox.checked = true;
            console.log('✅ Checkbox críticos inicializado como marcado');
        }
        
        if (voluminosoCheckbox) {
            voluminosoCheckbox.checked = true;
            console.log('✅ Checkbox voluminosos inicializado como marcado');
        }
        
        // Aplicar filtros iniciales - esto debe mostrar TODOS los puntos
        console.log('🔄 Aplicando filtros iniciales con todos los checkboxes marcados');
        this.applyFilters('');
        
        // Forzar actualización inmediata de la lista
        console.log('📋 La lista se actualizará automáticamente por applyFilters()');
        // No llamar updatePointsList directamente aquí - applyFilters() ya lo hace
    }
    
    /**
     * Actualiza los contadores de los filtros
     */
    updateFilterCounts() {
        const criticosCount = puntosData.length;
        const voluminososCount = puntosVoluminosos.length;
        
        // Actualizar contador de puntos críticos
        const countCritico = document.getElementById('count-critico');
        if (countCritico) {
            countCritico.textContent = criticosCount;
        }
        
        // Actualizar contador de puntos voluminosos
        const countVoluminoso = document.getElementById('count-voluminoso');
        if (countVoluminoso) {
            countVoluminoso.textContent = voluminososCount;
        }
        
        console.log(`Contadores actualizados: críticos=${criticosCount}, voluminosos=${voluminososCount}`);
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
        /* Todos los estilos de popups se han movido a styles.css para consolidación */
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
        
        /* Estilos para información de población en las tarjetas */
        .point-card-population {
            font-size: 11px !important;
            color: #6b7280 !important;
            margin-top: 4px !important;
            display: flex !important;
            align-items: center !important;
        }
    </style>
`;

// Insertar estilos en el head
document.head.insertAdjacentHTML('beforeend', mapCustomStyles);
