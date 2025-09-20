/**
 * DataLoader.js - Módulo para carga de datos del mapa de Barranquilla
 * 
 * Este módulo maneja la carga asíncrona de datos de puntos críticos
 * Extraído de script.js línea 771 para modularización
 */

class DataLoader {
    constructor(pointsManager, statisticsManager, toastManager) {
        this.pointsManager = pointsManager;
        this.statisticsManager = statisticsManager;
        this.toastManager = toastManager;
        this.puntosData = [];
        this.barriosWithPoints = new Set();
    }

    /**
     * Carga y renderiza los puntos críticos en el mapa
     * @returns {Promise<void>}
     */
    async loadPuntosCriticos() {
        try {
            const response = await fetch('src/data/puntos_criticos.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.puntosData = data.features || [];
            
            // Poblar barriosWithPoints
            this.barriosWithPoints.clear(); // Limpiar datos previos si la función se llama varias veces
            this.puntosData.forEach(punto => {
                if (punto.properties && punto.properties.barrio) {
                    this.barriosWithPoints.add(punto.properties.barrio.toLowerCase());
                }
            });

            // Limpiar marcadores existentes de puntos críticos a través del pointsManager
            if (this.pointsManager) {
                this.pointsManager.clearPuntosMarkers();
            }
            
            // Crear marcadores para cada punto crítico usando el pointsManager
            if (this.pointsManager) {
                this.puntosData.forEach(punto => {
                    this.pointsManager.createPuntoCriticoMarker(punto);
                });
            }
            
            console.log(`Cargados ${this.puntosData.length} puntos críticos`);
            
            // Actualizar estadísticas después de cargar los datos
            if (this.statisticsManager) {
                this.statisticsManager.updateStatistics();
            }
            
        } catch (error) {
            console.error('Error cargando puntos críticos:', error);
            if (this.toastManager) {
                this.toastManager.showToast('Error al cargar puntos críticos', 'error');
            }
        }
    }

    /**
     * Obtiene los datos de puntos críticos cargados
     * @returns {Array} Array de puntos críticos
     */
    getPuntosData() {
        return this.puntosData;
    }

    /**
     * Obtiene el set de barrios que tienen puntos críticos
     * @returns {Set} Set de nombres de barrios
     */
    getBarriosWithPoints() {
        return this.barriosWithPoints;
    }

    /**
     * Recarga los puntos críticos
     * @returns {Promise<void>}
     */
    async reloadPuntosCriticos() {
        console.log('Recargando puntos críticos...');
        await this.loadPuntosCriticos();
    }

    /**
     * Verifica si hay datos cargados
     * @returns {boolean} true si hay datos cargados
     */
    hasData() {
        return this.puntosData.length > 0;
    }

    /**
     * Obtiene estadísticas básicas de los datos
     * @returns {Object} Objeto con estadísticas
     */
    getDataStatistics() {
        const stats = {
            totalPoints: this.puntosData.length,
            totalBarrios: this.barriosWithPoints.size,
            pointsByType: {},
            pointsByStatus: {}
        };

        // Contar por tipo
        this.puntosData.forEach(punto => {
            const tipo = punto.properties?.tipo || 'sin_tipo';
            stats.pointsByType[tipo] = (stats.pointsByType[tipo] || 0) + 1;
            
            const status = punto.properties?.estado_actual || 'sin_estado';
            stats.pointsByStatus[status] = (stats.pointsByStatus[status] || 0) + 1;
        });

        return stats;
    }
}

// Exportar la clase para uso en otros módulos
export default DataLoader;