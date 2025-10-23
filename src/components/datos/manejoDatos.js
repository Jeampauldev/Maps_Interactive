// src/components/datos/manejoDatos.js

/**
 * Carga los datos de puntos críticos desde un archivo JSON.
 * @returns {Promise<Array>} Una promesa que se resuelve con los datos de los puntos críticos.
 */
export async function loadPuntosCriticos() {
    try {
        console.log('Cargando puntos críticos desde src/data/puntos_criticos.json...');
        const response = await fetch('src/data/puntos_criticos.json');
        if (!response.ok) {
            throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        const puntosData = data.features || [];

        if (puntosData.length === 0) {
            console.warn('No se encontraron puntos críticos en el archivo');
        }

        // Marcar como puntos críticos
        puntosData.forEach(punto => {
            punto.pointType = 'critico';
        });

        console.log(`✅ Cargados ${puntosData.length} puntos críticos`);
        return puntosData;

    } catch (error) {
        console.error('❌ Error cargando puntos críticos:', error);
        // Devolver un array vacío en caso de error para no bloquear la aplicación
        return [];
    }
}

/**
 * Carga los datos de puntos voluminosos desde un archivo JSON.
 * @returns {Promise<Array>} Una promesa que se resuelve con los datos de los puntos voluminosos.
 */
export async function loadPuntosVoluminosos() {
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
        const puntosVoluminosos = data.map(punto => {
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
        return puntosVoluminosos;

    } catch (error) {
        console.error('❌ Error cargando puntos voluminosos:', error);
        // Devolver un array vacío en caso de error
        return [];
    }
}
