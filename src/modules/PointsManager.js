/**
 * PointsManager.js - Módulo para manejo de marcadores de puntos críticos
 * 
 * Este módulo maneja la creación, visualización y manipulación de marcadores
 * Extraído de script.js líneas 815-943 para modularización
 */

class PointsManager {
    constructor(map, puntosLayer, toastManager) {
        this.map = map;
        this.puntosLayer = puntosLayer;
        this.toastManager = toastManager;
        this.currentPuntosCriticos = [];
    }

    /**
     * Limpia todos los marcadores de puntos críticos
     */
    clearPuntosMarkers() {
        if (this.puntosLayer) {
            this.puntosLayer.clearLayers();
        }
        this.currentPuntosCriticos = [];
    }

    /**
     * Crea un marcador personalizado para un punto crítico
     * @param {Object} punto - Objeto GeoJSON del punto crítico
     * @returns {Object} Marcador de Leaflet creado
     */
    createPuntoCriticoMarker(punto) {
        const coordinates = [punto.geometry.coordinates[1], punto.geometry.coordinates[0]];
        const properties = punto.properties;
        
        // Determinar la clase de color para el punto interior
        const colorClass = properties.tipo === 'voluminoso' ? 'punto-voluminoso' : 'punto-verde';
        
        // Crear icono personalizado con un div interior para el estilo
        const icon = L.divIcon({
            className: 'custom-point-marker', // Clase contenedora exterior
            html: `<div class="${colorClass}"></div>`, // Div interior para el color
            iconSize: [12, 12],
            iconAnchor: [6, 6],
            popupAnchor: [0, -9] // Ajuste para que la punta del popup apunte al centro del ícono
        });
        
        const marker = L.marker(coordinates, { icon })
            .bindPopup(this.createPuntoCriticoPopupContent(properties, coordinates), {
                maxWidth: 350,
                className: 'punto-critico-popup-wrapper' // Clase para estilizar el contenedor del popup
            })
            .bindTooltip(`<strong>${properties.id || properties.nombre || 'ID no disponible'}</strong>`, {
                permanent: false,
                direction: 'top',
                offset: [0, -12],
                className: 'custom-marker-tooltip'
            });
        
        // Añadir referencia al punto en el marcador para búsquedas futuras
        marker.puntoCriticoData = punto;
        
        if (this.puntosLayer) {
            this.puntosLayer.addLayer(marker);
        }

        // Almacenar en la lista de puntos críticos actuales
        this.currentPuntosCriticos.push({ marker, punto });
        
        return marker;
    }

    /**
     * Crea el contenido HTML para el popup de un punto crítico
     * @param {Object} properties - Propiedades del punto crítico
     * @param {Array} coordinates - Coordenadas [lat, lng]
     * @returns {string} HTML del contenido del popup
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
        `;
    }

    /**
     * Obtiene la etiqueta legible para el tipo de punto
     * @param {string} type - Tipo del punto
     * @returns {string} Etiqueta legible
     */
    getPointTypeLabel(type) {
        const labels = {
            critico: 'Punto Crítico',
            voluminoso: 'Residuo Voluminoso'
        };
        return labels[type] || type;
    }

    /**
     * Selecciona y centra un punto crítico específico
     * @param {string} pointId - ID del punto crítico
     */
    selectPuntoCritico(pointId) {
        const pointData = this.currentPuntosCriticos.find(p => p.punto.properties.id === pointId);
        if (pointData && this.map) {
            const coordinates = pointData.punto.geometry.coordinates;
            // Centrar el mapa en el punto
            this.map.setView([coordinates[1], coordinates[0]], 16);
            
            // Abrir el popup del marcador
            if (pointData.marker) {
                pointData.marker.openPopup();
            }
        }
    }

    /**
     * Obtiene todos los puntos críticos actuales
     * @returns {Array} Array de objetos con marker y punto
     */
    getCurrentPuntosCriticos() {
        return this.currentPuntosCriticos;
    }

    /**
     * Busca puntos críticos por término
     * @param {string} searchTerm - Término de búsqueda
     * @returns {Array} Array de puntos filtrados
     */
    searchPuntosCriticos(searchTerm) {
        if (!searchTerm || searchTerm.trim() === '') {
            return this.currentPuntosCriticos;
        }

        const term = searchTerm.toLowerCase().trim();
        return this.currentPuntosCriticos.filter(pointData => {
            const props = pointData.punto.properties;
            return (
                (props.direccion && props.direccion.toLowerCase().includes(term)) ||
                (props.barrio && props.barrio.toLowerCase().includes(term)) ||
                (props.tipo_residuo && props.tipo_residuo.toLowerCase().includes(term)) ||
                (props.id && props.id.toString().includes(term)) ||
                (props.estado_actual && props.estado_actual.toLowerCase().includes(term))
            );
        });
    }

    /**
     * Aplica filtros de visibilidad a los marcadores
     * @param {Array} filteredPoints - Array de puntos que deben ser visibles
     */
    applyVisibilityFilter(filteredPoints = null) {
        if (!this.puntosLayer) return;

        const pointsToShow = filteredPoints || this.currentPuntosCriticos;
        
        // Ocultar todos los marcadores primero
        this.puntosLayer.eachLayer(layer => {
            if (this.map.hasLayer(layer)) {
                this.map.removeLayer(layer);
            }
        });

        // Mostrar solo los marcadores filtrados
        pointsToShow.forEach(pointData => {
            if (pointData.marker && !this.map.hasLayer(pointData.marker)) {
                this.map.addLayer(pointData.marker);
            }
        });
    }

    /**
     * Obtiene estadísticas de los puntos actuales
     * @returns {Object} Objeto con estadísticas
     */
    getPointsStatistics() {
        const stats = {
            total: this.currentPuntosCriticos.length,
            byType: {},
            byStatus: {},
            byBarrio: {}
        };

        this.currentPuntosCriticos.forEach(pointData => {
            const props = pointData.punto.properties;
            
            // Por tipo
            const tipo = props.tipo || 'sin_tipo';
            stats.byType[tipo] = (stats.byType[tipo] || 0) + 1;
            
            // Por estado
            const status = props.estado_actual || 'sin_estado';
            stats.byStatus[status] = (stats.byStatus[status] || 0) + 1;
            
            // Por barrio
            const barrio = props.barrio || 'sin_barrio';
            stats.byBarrio[barrio] = (stats.byBarrio[barrio] || 0) + 1;
        });

        return stats;
    }
}

// Exportar la clase para uso en otros módulos
export default PointsManager;