// src/components/ui/ui.js

/**
 * Muestra el overlay de carga.
 */
export function showLoadingOverlay() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.remove('hidden');
        loadingOverlay.style.display = 'flex';
        loadingOverlay.style.opacity = '1';
    }
}

/**
 * Oculta el overlay de carga.
 */
export function hideLoadingOverlay() {
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
 * Muestra una notificación toast.
 * @param {string} message - El mensaje a mostrar.
 * @param {string} type - El tipo de notificación (info, success, error).
 */
export function showToast(message, type = 'info') {
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

/**
 * Actualiza la lista de puntos en el sidebar.
 * @param {Array} points - La lista de puntos a mostrar.
 * @param {object} app - La instancia de la aplicación principal.
 */
export function updatePointsList(points, app) {
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

        // Determinar si es un punto voluminoso
        const isVoluminoso = props.id && props.id.startsWith('VL');

        return `
            <div class="point-card" onclick="mapaPuntosCriticos.selectPuntoCritico('${props.id}')">
                <div class="point-card-header">
                    <strong>${props.id}</strong>
                    <span class="point-card-status ${statusClass}">${props.estado_actual || 'N/A'}</span>
                </div>
                <div class="point-card-body">
                    <div class="point-card-location">
                        <div class="point-card-barrio">
                            <i class="fas fa-map-marker-alt"></i>
                            <strong>${props.barrio || 'No especificado'}</strong>
                        </div>
                        <div class="point-card-address">${props.direccion || 'Dirección no disponible'}</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    console.log('✅ HTML generado, longitud:', htmlContent.length, 'caracteres');
    container.innerHTML = htmlContent;
    console.log('✅ HTML insertado en el contenedor. Contenido:', container.innerHTML.substring(0, 200) + '...');
}
