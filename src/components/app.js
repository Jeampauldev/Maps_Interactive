// src/components/app.js

import { CONFIG } from './config.js';
import { loadPuntosCriticos, loadPuntosVoluminosos } from './datos/manejoDatos.js';
import { initializeMap, createPuntoCriticoMarker, createPuntoVoluminosoMarker, clearMarkers } from './mapa/mapa.js';
import { showLoadingOverlay, hideLoadingOverlay, showToast, updatePointsList } from './ui/ui.js';

class MapaPuntosCriticos {
    constructor() {
        console.log('🚀 Iniciando constructor de MapaPuntosCriticos...');
        this.initializeApp();
    }

    async initializeApp() {
        try {
            showLoadingOverlay();

            this.map = await initializeMap();

            await this.loadIconTemplates();
            this.setupEventListeners();

            const puntosCriticos = await loadPuntosCriticos();
            const puntosVoluminosos = await loadPuntosVoluminosos();

            this.allPoints = [...puntosCriticos, ...puntosVoluminosos];
            this.currentPuntosCriticos = [];

            this.renderAllPoints();

            hideLoadingOverlay();
            showToast('Mapa cargado exitosamente', 'success');
            console.log('✅ Aplicación inicializada correctamente');

        } catch (error) {
            console.error('❌ Error inicializando la aplicación:', error);
            showToast('Error al cargar el mapa: ' + error.message, 'error');
            hideLoadingOverlay();
        }
    }

    async loadIconTemplates() {
        try {
            // Usaremos SVGs directamente para un mejor control y rendimiento
            this.cachedIconSvg = `
                <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0C10.17 0 3 7.17 3 16.003 3 24.833 19 38 19 38s16-13.167 16-21.997C35 7.17 27.83 0 19 0z" fill="#03A63C" stroke="#FFFFFF" stroke-width="2"/>
                    <text x="19" y="20" font-size="10" font-weight="bold" fill="white" text-anchor="middle">{{ID}}</text>
                </svg>`;
            this.cachedOrangeIconSvg = `
                <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0C10.17 0 3 7.17 3 16.003 3 24.833 19 38 19 38s16-13.167 16-21.997C35 7.17 27.83 0 19 0z" fill="#FF8C00" stroke="#FFFFFF" stroke-width="2"/>
                    <text x="19" y="20" font-size="10" font-weight="bold" fill="white" text-anchor="middle">{{ID}}</text>
                </svg>`;
        } catch (error) {
            console.error('Error creando plantillas de iconos SVG:', error);
            // Fallback en caso de error
            this.cachedIconSvg = `<svg width="30" height="30" viewBox="0 0 30 30"><circle cx="15" cy="15" r="10" fill="#03A63C" stroke="white" stroke-width="2"/><text x="15" y="20" font-size="8" fill="white" text-anchor="middle">{{ID}}</text></svg>`;
            this.cachedOrangeIconSvg = `<svg width="30" height="30" viewBox="0 0 30 30"><circle cx="15" cy="15" r="10" fill="#FF8C00" stroke="white" stroke-width="2"/><text x="15" y="20" font-size="8" fill="white" text-anchor="middle">{{ID}}</text></svg>`;
        }
    }

    setupEventListeners() {
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));

        ['critico', 'voluminoso'].forEach(type => {
            const checkbox = document.getElementById(`filter-${type}`);
            if (checkbox) {
                checkbox.addEventListener('change', () => this.handleFilterChange());
            }
        });

        document.getElementById('locate-btn').addEventListener('click', () => this.locateUser());
        document.getElementById('fullscreen-btn').addEventListener('click', () => this.toggleFullscreen());
        document.getElementById('reset-view').addEventListener('click', () => this.resetMapView());
    }

    renderAllPoints() {
        clearMarkers();
        this.currentPuntosCriticos = [];

        this.allPoints.forEach(punto => {
            const marker = punto.pointType === 'voluminoso' ?
                createPuntoVoluminosoMarker(punto, this.cachedOrangeIconSvg) :
                createPuntoCriticoMarker(punto, this.cachedIconSvg);

            if (marker) {
                this.currentPuntosCriticos.push({ marker, punto });
            }
        });
        updatePointsList(this.allPoints, this);
    }

    handleSearch(query) {
        const searchTerm = query.toLowerCase().trim();
        this.applyFilters(searchTerm);
    }

    handleFilterChange() {
        const query = document.getElementById('search-input')?.value || '';
        this.applyFilters(query.toLowerCase().trim());
    }

    applyFilters(searchTerm = '') {
        const filterCriticoChecked = document.getElementById('filter-critico')?.checked ?? false;
        const filterVoluminosoChecked = document.getElementById('filter-voluminoso')?.checked ?? false;

        let filteredPoints = this.allPoints;

        if (searchTerm) {
            filteredPoints = filteredPoints.filter(feature => {
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

        if (filterCriticoChecked || filterVoluminosoChecked) {
            filteredPoints = filteredPoints.filter(feature => {
                const isCritico = feature.pointType === 'critico';
                const isVoluminoso = feature.pointType === 'voluminoso';

                return (filterCriticoChecked && isCritico) || (filterVoluminosoChecked && isVoluminoso);
            });
        }

        clearMarkers();
        filteredPoints.forEach(punto => {
            if (punto.pointType === 'voluminoso') {
                createPuntoVoluminosoMarker(punto, this.cachedOrangeIconSvg);
            } else {
                createPuntoCriticoMarker(punto, this.cachedIconSvg);
            }
        });
        updatePointsList(filteredPoints, this);
    }

    selectPuntoCritico(pointId) {
        const pointData = this.currentPuntosCriticos.find(p => p.punto.properties.id === pointId);
        if (pointData) {
            const coords = [pointData.punto.geometry.coordinates[1], pointData.punto.geometry.coordinates[0]];
            this.map.setView(coords, 16);
            if (pointData.marker) {
                pointData.marker.openPopup();
            }
        }
    }

    locateUser() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const latlng = [position.coords.latitude, position.coords.longitude];
                this.map.setView(latlng, 15);
            }, () => {
                showToast('No se pudo obtener la ubicación.', 'error');
            });
        } else {
            showToast('La geolocalización no es soportada por este navegador.', 'error');
        }
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    resetMapView() {
        this.map.setView(CONFIG.BARRANQUILLA_COORDS, CONFIG.DEFAULT_ZOOM);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.mapaPuntosCriticos = new MapaPuntosCriticos();
});
