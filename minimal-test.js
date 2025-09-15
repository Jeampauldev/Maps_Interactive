// Test mínimo para identificar el problema
console.log('🔬 Test mínimo iniciado');

// Verificar Leaflet primero
if (typeof L === 'undefined') {
    console.error('❌ PROBLEMA: Leaflet no está disponible');
} else {
    console.log('✅ Leaflet disponible:', L.version);
}

// Verificar contenedor del mapa
const mapContainer = document.getElementById('map');
if (!mapContainer) {
    console.error('❌ PROBLEMA: Contenedor del mapa no encontrado');
} else {
    console.log('✅ Contenedor del mapa encontrado');
    
    // Intentar crear un mapa básico
    try {
        console.log('🗺️ Intentando crear mapa básico...');
        const testMap = L.map('map', {
            center: [10.9639, -74.7964],
            zoom: 12
        });
        
        // Añadir una capa básica
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(testMap);
        
        console.log('✅ ¡Mapa básico creado exitosamente!');
        
        // Ocultar loading overlay si existe
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
            loadingOverlay.style.display = 'none';
            console.log('✅ Loading overlay ocultado');
        }
        
    } catch (error) {
        console.error('❌ Error creando mapa básico:', error);
    }
}

console.log('🔬 Test mínimo finalizado');