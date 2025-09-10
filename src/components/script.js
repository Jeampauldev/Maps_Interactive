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
        detailed: {
            name: 'Detallado',
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '© OpenStreetMap contributors'
        },
        minimal: {
            name: 'Barrios Barranquilla',
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
        
        // Agregar capa inicial (Barrios Barranquilla para enfatizar los barrios)
        this.currentLayer = this.mapLayers.minimal;
        this.currentLayer.addTo(map);
        
        // Crear capa para los marcadores
        markersLayer = L.layerGroup().addTo(map);
        
        // Agregar control de zoom personalizado
        L.control.zoom({
            position: 'bottomright'
        }).addTo(map);
        
        // Configurar control de capas
        this.setupLayerControl();
        
        // Configurar eventos del mapa
        map.on('click', () => {
            this.hideInstitutionInfo();
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
     * Configura el control de capas del mapa
     */
    setupLayerControl() {
        const layerSelect = document.getElementById('layerSelect');
        if (layerSelect) {
            layerSelect.addEventListener('change', (e) => {
                this.changeMapLayer(e.target.value);
            });
        }
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