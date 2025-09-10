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
    
    // Configuración de capas de mapa
    MAP_LAYERS: {
        barrios: {
            name: 'Barrios Barranquilla',
            url: 'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
            attribution: '© CARTO © OpenStreetMap contributors',
            style: 'custom-barrios'
        },
        detailed: {
            name: 'Detallado',
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '© OpenStreetMap contributors'
        },
        minimal: {
            name: 'Minimalista',
            url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
            attribution: '© CARTO © OpenStreetMap contributors'
        },
        dark: {
            name: 'Oscuro',
            url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
            attribution: '© CARTO © OpenStreetMap contributors'
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
let currentMarkers = [];
let filteredInstitutions = [...EDUCATIONAL_INSTITUTIONS];
let selectedInstitution = null;

// ===== CLASE PRINCIPAL DE LA APLICACIÓN =====
class BarranquillaEduMap {
    constructor() {
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
        // Crear el mapa centrado en Barranquilla
        map = L.map('map', {
            center: CONFIG.BARRANQUILLA_COORDS,
            zoom: CONFIG.DEFAULT_ZOOM,
            minZoom: CONFIG.MIN_ZOOM,
            maxZoom: CONFIG.MAX_ZOOM,
            zoomControl: false, // Removemos el control por defecto
            fadeAnimation: true,
            zoomAnimation: true,
            markerZoomAnimation: true
        });
        
        // Crear capas de mapa
        this.mapLayers = {};
        Object.keys(CONFIG.MAP_LAYERS).forEach(key => {
            const layer = CONFIG.MAP_LAYERS[key];
            this.mapLayers[key] = L.tileLayer(layer.url, {
                attribution: layer.attribution
            });
        });
        
        // Cargar capa de barrios de forma asíncrona
        await this.loadBarriosLayer();
        
        // Crear capa para los marcadores
        markersLayer = L.layerGroup().addTo(map);
        
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
        
        // Filtros por tipo de institución
        ['universidad', 'colegio', 'tecnico'].forEach(type => {
            const checkbox = document.getElementById(`filter-${type}`);
            checkbox.addEventListener('change', () => {
                this.handleFilterChange();
            });
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
            this.barriosLayer.addTo(map);
        } catch (error) {
            console.error('Error cargando capa de barrios:', error);
            // Fallback: usar capa de barrios básica
            this.currentLayer = this.mapLayers.barrios;
            this.currentLayer.addTo(map);
        }
    }
    
    /**
     * Configura el control de capas del mapa
     */
    setupLayerControl() {
        const layerSelect = document.getElementById('layerSelect');
        if (layerSelect) {
            layerSelect.addEventListener('change', (e) => {
                this.changeMapLayer(e.target.value);
            });
        }
        
        // Crear control de capas simplificado si no existe
        if (!this.layerControl && this.barriosLayer) {
            const baseLayers = {
                '🏘️ Barrios': this.barriosLayer,
                '🗺️ Detallado': this.mapLayers.detailed,
                '✨ Minimalista': this.mapLayers.minimal
            };
            
            this.layerControl = L.control.layers(baseLayers, {}, {
                 position: 'topright',
                 collapsed: true
             }).addTo(map);
        }
    }
    
    async createCustomBarriosLayer() {
        try {
            const response = await fetch('./src/data/Barrios_de_Barranquilla_según_POT_20250910.geojson');
            const geojsonData = await response.json();
            
            // Crear grupo de capas para barrios y etiquetas
            const barriosGroup = L.layerGroup();
            
            const barriosLayer = L.geoJSON(geojsonData, {
                style: (feature) => {
                    return {
                        color: CONFIG.INSTITUTION_COLORS.universidad,
                        fillColor: CONFIG.INSTITUTION_COLORS.colegio,
                        fillOpacity: 0.3,
                        weight: 2,
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
            
            // Agregar funcionalidad de edición
            barriosLayer.on('add', () => {
                this.enableBarriosEditing();
            });
            
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
            
            fallbackLayer.on('add', () => {
                this.enableBarriosEditing();
            });
            
            return fallbackLayer;
        }
    }
    
    enableBarriosEditing() {
        // Crear botón para personalizar barrios
        const editButton = L.control({ position: 'topleft' });
        editButton.onAdd = () => {
            const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
            div.innerHTML = '<button onclick="eduMap.openBarriosEditor()" title="Personalizar Barrios"><i class="fas fa-edit"></i></button>';
            div.style.backgroundColor = '#0F1B26';
            div.style.color = '#FFFFFF';
            div.style.padding = '5px';
            div.style.borderRadius = '4px';
            return div;
        };
        
        if (!this.editControl) {
             this.editControl = editButton.addTo(this.map);
         }
    }
    
    openBarriosEditor() {
        // Crear modal para editar configuración de barrios
        const modal = document.createElement('div');
        modal.className = 'barrios-editor-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Editor de Barrios - Barranquilla</h3>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="editor-section">
                        <h4>Colores del Mapa</h4>
                        <label>Filtro de Color: <input type="range" id="hue-slider" min="0" max="360" value="200" oninput="eduMap.updateMapFilter()"></label>
                        <label>Saturación: <input type="range" id="saturation-slider" min="0" max="200" value="120" oninput="eduMap.updateMapFilter()"></label>
                        <label>Brillo: <input type="range" id="brightness-slider" min="0" max="200" value="90" oninput="eduMap.updateMapFilter()"></label>
                    </div>
                    <div class="editor-section">
                        <h4>Barrios Destacados</h4>
                        <textarea id="barrios-list" placeholder="Ingrese nombres de barrios separados por comas\nEj: El Prado, Riomar, Villa Country, Alto Prado"></textarea>
                        <button onclick="eduMap.highlightBarrios()">Destacar Barrios</button>
                    </div>
                    <div class="editor-section">
                        <h4>Configuración Avanzada</h4>
                        <label><input type="checkbox" id="show-labels" onchange="eduMap.toggleLabels()"> Mostrar Etiquetas</label>
                        <label><input type="checkbox" id="show-borders" onchange="eduMap.toggleBorders()"> Mostrar Límites</label>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.injectEditorStyles();
    }
    
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
     * Cambia la capa del mapa
     */
    changeMapLayer(layerKey) {
        if (this.currentLayer) {
            map.removeLayer(this.currentLayer);
        }
        
        this.currentLayer = this.mapLayers[layerKey];
        this.currentLayer.addTo(map);
        
        // Mostrar notificación
        const layerName = CONFIG.MAP_LAYERS[layerKey].name;
        this.showToast(`Mapa cambiado a: ${layerName}`, 'info');
    }
    
    /**
     * Carga y renderiza todas las instituciones en el mapa
     * Utiliza el patrón Factory para crear marcadores específicos por tipo
     */
    loadInstitutions() {
        // Limpiar marcadores existentes
        markersLayer.clearLayers();
        currentMarkers = [];
        
        // Crear marcadores para cada institución usando requestAnimationFrame para mejor performance
        this.createMarkersAsync(EDUCATIONAL_INSTITUTIONS);
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
     * Crea un marcador personalizado para una institución
     * Implementa el patrón Factory Method
     */
    createInstitutionMarker(institution) {
        // Usar iconos personalizados mejorados
        const customIcon = this.createCustomIcon(institution.type);
        
        // Crear marcador con lazy popup loading
        const marker = L.marker(institution.coordinates, { icon: customIcon });
        
        // Lazy load popup content
        marker.on('click', () => {
            if (!marker.getPopup()) {
                marker.bindPopup(this.createPopupContent(institution), {
                    maxWidth: 300,
                    className: 'custom-popup'
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
                ${this.getTypeLabel(institution.type)}
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
    getTypeLabel(type) {
        const labels = {
            universidad: 'Universidad',
            colegio: 'Colegio',
            tecnico: 'Instituto Técnico'
        };
        return labels[type] || type;
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
     * Realiza la búsqueda real
     */
    performSearch(query) {
        const searchTerm = query.toLowerCase().trim();
        
        if (searchTerm === '') {
            filteredInstitutions = [...EDUCATIONAL_INSTITUTIONS];
        } else {
            filteredInstitutions = EDUCATIONAL_INSTITUTIONS.filter(institution => {
                return (
                    institution.name.toLowerCase().includes(searchTerm) ||
                    institution.address.toLowerCase().includes(searchTerm) ||
                    institution.description.toLowerCase().includes(searchTerm) ||
                    this.getTypeLabel(institution.type).toLowerCase().includes(searchTerm)
                );
            });
        }
        
        this.applyFilters();
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
            universidad: document.getElementById('filter-universidad').checked,
            colegio: document.getElementById('filter-colegio').checked,
            tecnico: document.getElementById('filter-tecnico').checked
        };
        
        // Limpiar capa de marcadores
        markersLayer.clearLayers();
        
        // Agregar marcadores que pasan los filtros
        currentMarkers.forEach(({ marker, institution }) => {
            const matchesSearch = filteredInstitutions.some(inst => inst.id === institution.id);
            const matchesFilter = activeFilters[institution.type];
            
            if (matchesSearch && matchesFilter) {
                markersLayer.addLayer(marker);
            }
        });
    }
    
    /**
     * Actualiza la lista de instituciones en el sidebar
     */
    updateInstitutionsList() {
        const container = document.getElementById('institutions-container');
        const activeFilters = {
            universidad: document.getElementById('filter-universidad').checked,
            colegio: document.getElementById('filter-colegio').checked,
            tecnico: document.getElementById('filter-tecnico').checked
        };
        
        // Filtrar instituciones visibles
        const visibleInstitutions = filteredInstitutions.filter(inst => 
            activeFilters[inst.type]
        );
        
        if (visibleInstitutions.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>No se encontraron instituciones</p>
                </div>
            `;
            return;
        }
        
        // Generar HTML para cada institución
        container.innerHTML = visibleInstitutions.map(institution => `
            <div class="institution-item" onclick="eduMap.selectInstitution(${institution.id})">
                <div class="institution-name">${institution.name}</div>
                <div class="institution-type">${this.getTypeLabel(institution.type)}</div>
                <div class="institution-address">${institution.address}</div>
            </div>
        `).join('');
    }
    
    /**
     * Actualiza las estadísticas en el header y filtros
     */
    updateStatistics() {
        const activeFilters = {
            universidad: document.getElementById('filter-universidad').checked,
            colegio: document.getElementById('filter-colegio').checked,
            tecnico: document.getElementById('filter-tecnico').checked
        };
        
        // Contar por tipo
        const counts = {
            universidad: 0,
            colegio: 0,
            tecnico: 0
        };
        
        filteredInstitutions.forEach(inst => {
            if (activeFilters[inst.type]) {
                counts[inst.type]++;
            }
        });
        
        // Actualizar contadores en filtros
        Object.keys(counts).forEach(type => {
            document.getElementById(`count-${type}`).textContent = counts[type];
        });
        
        // Actualizar total en header
        const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
        document.getElementById('total-institutions').textContent = total;
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
        document.getElementById('info-type').textContent = this.getTypeLabel(institution.type);
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
        document.getElementById('loading-overlay').classList.remove('hidden');
    }
    
    /**
     * Oculta el overlay de carga
     */
    hideLoadingOverlay() {
        setTimeout(() => {
            document.getElementById('loading-overlay').classList.add('hidden');
        }, 500);
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
    eduMap = new BarranquillaEduMap();
});

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
            margin: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            border: 1px solid #03588C;
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
            background-color: #E8F4FD !important;
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
            background: rgba(3, 88, 140, 0.75);
            color: white;
            padding: 2px 6px;
            border-radius: 8px;
            font-size: 9px;
            font-weight: 500;
            text-align: center;
            white-space: nowrap;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(2px);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            letter-spacing: 0.2px;
            text-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
            transition: all 0.2s ease;
            cursor: default;
            pointer-events: none;
            opacity: 0;
            transform: scale(0.9);
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
        
        /* Tamaños responsivos más sutiles */
        .leaflet-zoom-level-13 .barrio-label {
            font-size: 8px;
            padding: 1px 4px;
        }
        
        .leaflet-zoom-level-14 .barrio-label {
            font-size: 9px;
            padding: 2px 5px;
        }
        
        .leaflet-zoom-level-15 .barrio-label,
        .leaflet-zoom-level-16 .barrio-label {
            font-size: 10px;
            padding: 2px 6px;
        }
        
        .leaflet-zoom-level-17 .barrio-label,
        .leaflet-zoom-level-18 .barrio-label {
            font-size: 11px;
            padding: 3px 7px;
        }
    </style>
`;

// Insertar estilos en el head
document.head.insertAdjacentHTML('beforeend', mapCustomStyles);