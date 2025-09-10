// Iconos SVG personalizados para los marcadores
const CUSTOM_ICONS = {
    // Icono para universidades - Edificio académico con graduación y elementos decorativos
    universidad: `
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="univGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
                </linearGradient>
                <pattern id="brickPattern" patternUnits="userSpaceOnUse" width="4" height="2">
                    <rect width="4" height="2" fill="#f8fafc"/>
                    <rect width="2" height="1" fill="#e2e8f0"/>
                    <rect x="2" y="1" width="2" height="1" fill="#e2e8f0"/>
                </pattern>
            </defs>
            <!-- Fondo circular con sombra -->
            <circle cx="21" cy="21" r="18" fill="rgba(0,0,0,0.1)"/>
            <circle cx="20" cy="20" r="18" fill="url(#univGrad)" stroke="white" stroke-width="2"/>
            <!-- Edificio universitario con textura -->
            <rect x="8" y="15" width="24" height="12" fill="url(#brickPattern)" rx="1" stroke="#cbd5e1" stroke-width="0.5"/>
            <!-- Columnas clásicas -->
            <rect x="10" y="17" width="1.5" height="8" fill="#64748b"/>
            <rect x="13" y="17" width="1.5" height="8" fill="#64748b"/>
            <rect x="16" y="17" width="1.5" height="8" fill="#64748b"/>
            <rect x="19" y="17" width="2" height="6" fill="#1e40af"/> <!-- Puerta principal -->
            <rect x="22" y="17" width="1.5" height="8" fill="#64748b"/>
            <rect x="25" y="17" width="1.5" height="8" fill="#64748b"/>
            <rect x="28" y="17" width="1.5" height="8" fill="#64748b"/>
            <!-- Techo triangular con detalles -->
            <polygon points="6,15 20,8 34,15" fill="#dc2626" stroke="#991b1b" stroke-width="0.5"/>
            <polygon points="8,15 20,10 32,15" fill="#ef4444"/>
            <!-- Birrete de graduación mejorado -->
            <rect x="15" y="10" width="10" height="2" fill="#1f2937" rx="1"/>
            <polygon points="14,10 26,10 25,7 15,7" fill="#374151"/>
            <line x1="25" y1="8" x2="28" y2="5" stroke="#fbbf24" stroke-width="1.5"/>
            <circle cx="28" cy="5" r="1.5" fill="#f59e0b"/>
            <!-- Elementos decorativos tipo escudo universitario -->
            <circle cx="12" cy="12" r="2" fill="#fbbf24" stroke="#f59e0b" stroke-width="0.5"/>
            <text x="12" y="13" text-anchor="middle" font-size="2" fill="#1f2937">U</text>
            <!-- Libros apilados -->
            <rect x="26" y="23" width="4" height="1" fill="#dc2626"/>
            <rect x="26.5" y="22" width="3" height="1" fill="#2563eb"/>
            <rect x="27" y="21" width="2" height="1" fill="#16a34a"/>
        </svg>
    `,
    
    // Icono para colegios - Edificio escolar con elementos educativos creativos
    colegio: `
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="colegioGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#047857;stop-opacity:1" />
                </linearGradient>
                <pattern id="windowPattern" patternUnits="userSpaceOnUse" width="3" height="3">
                    <rect width="3" height="3" fill="#e0f2fe"/>
                    <rect x="1" y="1" width="1" height="1" fill="#0891b2"/>
                </pattern>
            </defs>
            <!-- Fondo circular con sombra -->
            <circle cx="21" cy="21" r="18" fill="rgba(0,0,0,0.1)"/>
            <circle cx="20" cy="20" r="18" fill="url(#colegioGrad)" stroke="white" stroke-width="2"/>
            <!-- Edificio escolar moderno -->
            <rect x="6" y="16" width="28" height="14" fill="#f8fafc" rx="2" stroke="#e2e8f0" stroke-width="0.5"/>
            <!-- Ventanas con patrón -->
            <rect x="8" y="18" width="3" height="4" fill="url(#windowPattern)" rx="0.5"/>
            <rect x="13" y="18" width="3" height="4" fill="url(#windowPattern)" rx="0.5"/>
            <rect x="24" y="18" width="3" height="4" fill="url(#windowPattern)" rx="0.5"/>
            <rect x="29" y="18" width="3" height="4" fill="url(#windowPattern)" rx="0.5"/>
            <!-- Puerta principal decorativa -->
            <rect x="18" y="18" width="4" height="6" fill="#047857" rx="2"/> 
            <circle cx="20" cy="21" r="0.3" fill="#fbbf24"/> <!-- Manija -->
            <rect x="19" y="19" width="2" height="1" fill="#10b981" rx="0.5"/> <!-- Ventana puerta -->
            <!-- Techo con chimenea -->
            <polygon points="4,16 20,9 36,16" fill="#dc2626" stroke="#991b1b" stroke-width="0.5"/>
            <rect x="28" y="11" width="2" height="5" fill="#7c2d12"/> <!-- Chimenea -->
            <rect x="27.5" y="10" width="3" height="1" fill="#991b1b"/> <!-- Tope chimenea -->
            <!-- Patio de juegos -->
            <circle cx="10" cy="26" r="1.5" fill="#f59e0b"/> <!-- Pelota -->
            <rect x="8.5" y="27.5" width="3" height="0.5" fill="#22c55e"/> <!-- Césped -->
            <!-- Libros apilados con más detalle -->
            <rect x="22" y="25" width="5" height="1" fill="#ef4444" rx="0.2"/>
            <rect x="22.5" y="24" width="4" height="1" fill="#3b82f6" rx="0.2"/>
            <rect x="23" y="23" width="3" height="1" fill="#f59e0b" rx="0.2"/>
            <!-- Manzana del profesor mejorada -->
            <circle cx="28" cy="24" r="1.5" fill="#ef4444"/>
            <path d="M28,22.5 Q28.5,22 29,22.5" stroke="#22c55e" stroke-width="0.5" fill="none"/> <!-- Hoja -->
            <rect x="27.8" y="22.3" width="0.4" height="1" fill="#16a34a"/> <!-- Tallo -->
            <!-- Elementos decorativos escolares -->
            <circle cx="12" cy="12" r="1.5" fill="#fbbf24" stroke="#f59e0b" stroke-width="0.3"/>
            <text x="12" y="12.5" text-anchor="middle" font-size="1.5" fill="#1f2937">A</text>
        </svg>
    `,
    
    // Icono para institutos técnicos - Laboratorio técnico avanzado
    tecnico: `
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="tecnicoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#d97706;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#e5e7eb;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#f9fafb;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#d1d5db;stop-opacity:1" />
                </linearGradient>
            </defs>
            <!-- Fondo circular con sombra -->
            <circle cx="21" cy="21" r="18" fill="rgba(0,0,0,0.1)"/>
            <circle cx="20" cy="20" r="18" fill="url(#tecnicoGrad)" stroke="white" stroke-width="2"/>
            <!-- Edificio técnico -->
            <rect x="8" y="18" width="24" height="12" fill="#1f2937" rx="1"/>
            <rect x="10" y="20" width="20" height="8" fill="#374151" rx="0.5"/>
            <!-- Ventanas del laboratorio -->
            <rect x="12" y="22" width="3" height="2" fill="#60a5fa" rx="0.3"/>
            <rect x="16" y="22" width="3" height="2" fill="#34d399" rx="0.3"/>
            <rect x="20" y="22" width="3" height="2" fill="#fbbf24" rx="0.3"/>
            <rect x="24" y="22" width="3" height="2" fill="#f87171" rx="0.3"/>
            <!-- Engranaje principal mejorado -->
            <g transform="translate(20,15)">
                <circle r="4" fill="url(#metalGrad)" stroke="#6b7280" stroke-width="0.3"/>
                <circle r="1.5" fill="#374151"/>
                <!-- Dientes del engranaje más detallados -->
                <rect x="-0.5" y="-6" width="1" height="2" fill="url(#metalGrad)"/>
                <rect x="-0.5" y="4" width="1" height="2" fill="url(#metalGrad)"/>
                <rect x="-6" y="-0.5" width="2" height="1" fill="url(#metalGrad)"/>
                <rect x="4" y="-0.5" width="2" height="1" fill="url(#metalGrad)"/>
                <rect x="-4.2" y="-4.2" width="1.4" height="1.4" fill="url(#metalGrad)" transform="rotate(45)"/>
                <rect x="2.8" y="-4.2" width="1.4" height="1.4" fill="url(#metalGrad)" transform="rotate(45)"/>
                <rect x="-4.2" y="2.8" width="1.4" height="1.4" fill="url(#metalGrad)" transform="rotate(45)"/>
                <rect x="2.8" y="2.8" width="1.4" height="1.4" fill="url(#metalGrad)" transform="rotate(45)"/>
            </g>
            <!-- Herramientas avanzadas -->
            <!-- Destornillador -->
            <rect x="10" y="26" width="0.8" height="6" fill="#fbbf24" rx="0.4"/>
            <rect x="9.6" y="32" width="1.6" height="1" fill="#374151" rx="0.2"/>
            <!-- Llave inglesa -->
            <rect x="13" y="26" width="4" height="0.8" fill="url(#metalGrad)" rx="0.4"/>
            <rect x="16.5" y="25.5" width="1" height="1.8" fill="url(#metalGrad)" rx="0.2"/>
            <!-- Calibrador -->
            <path d="M20,26 L22,28 L24,26" stroke="url(#metalGrad)" stroke-width="0.8" fill="none"/>
            <circle cx="22" cy="27" r="0.5" fill="#374151"/>
            <!-- Circuito electrónico -->
            <rect x="26" y="26" width="4" height="3" fill="#065f46" rx="0.3"/>
            <circle cx="27" cy="27" r="0.3" fill="#10b981"/>
            <circle cx="29" cy="28" r="0.3" fill="#ef4444"/>
            <rect x="27.5" y="26.8" width="1" height="0.4" fill="#fbbf24"/>
            <!-- Elementos decorativos técnicos -->
            <rect x="6" y="12" width="2" height="0.5" fill="#6b7280"/>
            <rect x="32" y="12" width="2" height="0.5" fill="#6b7280"/>
            <circle cx="7" cy="11" r="0.8" fill="#ef4444"/>
            <circle cx="33" cy="11" r="0.8" fill="#22c55e"/>
        </svg>
    `,
    
    // Icono genérico mejorado
    default: `
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="defaultGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#4338ca;stop-opacity:1" />
                </linearGradient>
            </defs>
            <!-- Fondo circular -->
            <circle cx="20" cy="20" r="18" fill="url(#defaultGrad)" stroke="white" stroke-width="2"/>
            <!-- Edificio genérico -->
            <rect x="10" y="15" width="20" height="15" fill="white" rx="2"/>
            <rect x="12" y="17" width="3" height="3" fill="#6366f1"/>
            <rect x="17" y="17" width="3" height="3" fill="#6366f1"/>
            <rect x="22" y="17" width="3" height="3" fill="#6366f1"/>
            <rect x="12" y="22" width="3" height="3" fill="#6366f1"/>
            <rect x="17" y="22" width="3" height="8" fill="#4338ca"/> <!-- Puerta -->
            <rect x="22" y="22" width="3" height="3" fill="#6366f1"/>
            <!-- Estrella educativa -->
            <polygon points="20,8 21,11 24,11 21.5,13 22.5,16 20,14 17.5,16 18.5,13 16,11 19,11" fill="#fbbf24"/>
        </svg>
    `
};

// Función para crear iconos personalizados de Leaflet
function createCustomIcon(type, size = [40, 40]) {
    const iconSvg = CUSTOM_ICONS[type] || CUSTOM_ICONS.default;
    const iconUrl = 'data:image/svg+xml;base64,' + btoa(iconSvg);
    
    return L.icon({
        iconUrl: iconUrl,
        iconSize: size,
        iconAnchor: [size[0]/2, size[1]],
        popupAnchor: [0, -size[1]],
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        shadowSize: [41, 41],
        shadowAnchor: [12, 41]
    });
}

// Función para crear iconos con colores personalizados
function createColoredIcon(type, color, size = [40, 40]) {
    let iconSvg = CUSTOM_ICONS[type] || CUSTOM_ICONS.default;
    
    // Reemplazar colores en el SVG
    const colorMap = {
        universidad: color || '#3b82f6',
        colegio: color || '#10b981',
        tecnico: color || '#f59e0b',
        default: color || '#6366f1'
    };
    
    // Aplicar el color personalizado
    iconSvg = iconSvg.replace(/fill="#[0-9a-fA-F]{6}"/g, `fill="${colorMap[type] || color}"`);
    
    const iconUrl = 'data:image/svg+xml;base64,' + btoa(iconSvg);
    
    return L.icon({
        iconUrl: iconUrl,
        iconSize: size,
        iconAnchor: [size[0]/2, size[1]],
        popupAnchor: [0, -size[1]],
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        shadowSize: [41, 41],
        shadowAnchor: [12, 41]
    });
}