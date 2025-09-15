// Script de depuración simple
console.log('🔍 Script de depuración cargado');

// Verificar que el DOM esté listo y esperar a que se carguen los scripts defer
if (document.readyState === 'loading') {
    console.log('📄 DOM aún cargando...');
    document.addEventListener('DOMContentLoaded', () => {
        console.log('✅ DOMContentLoaded disparado');
        // Esperar un poco más para que se carguen los scripts defer
        setTimeout(runDebugChecks, 1000);
    });
} else {
    console.log('📄 DOM ya listo');
    // Esperar un poco más para que se carguen los scripts defer
    setTimeout(runDebugChecks, 1000);
}

function runDebugChecks() {
    console.log('🔍 Ejecutando verificaciones de depuración...');
    
    // Verificar Leaflet
    if (typeof L !== 'undefined') {
        console.log('✅ Leaflet disponible:', L.version);
    } else {
        console.error('❌ Leaflet NO disponible');
    }
    
    // Verificar contenedor del mapa
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        console.log('✅ Contenedor del mapa encontrado:', mapContainer);
        console.log('📐 Dimensiones del contenedor:', {
            width: mapContainer.offsetWidth,
            height: mapContainer.offsetHeight,
            display: getComputedStyle(mapContainer).display,
            visibility: getComputedStyle(mapContainer).visibility
        });
    } else {
        console.error('❌ Contenedor del mapa NO encontrado');
    }
    
    // Verificar clase BarranquillaEduMap
    if (typeof BarranquillaEduMap !== 'undefined') {
        console.log('✅ Clase BarranquillaEduMap disponible');
    } else {
        console.error('❌ Clase BarranquillaEduMap NO disponible');
    }
    
    // Verificar CONFIG
    if (typeof CONFIG !== 'undefined') {
        console.log('✅ CONFIG disponible:', CONFIG);
    } else {
        console.error('❌ CONFIG NO disponible');
    }
}

// Capturar errores globales
window.addEventListener('error', (event) => {
    console.error('🚨 Error JavaScript capturado:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
    });
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('🚨 Promise rechazada no manejada:', event.reason);
});