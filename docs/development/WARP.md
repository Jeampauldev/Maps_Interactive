# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Spatial Data Report | Disposición Final** is a Progressive Web App (PWA) that visualizes critical points in Barranquilla under the "Barranquilla Limpia y Linda" strategy. The project originally started as EduMap Barranquilla but has been converted to display georeferenced critical points data.

### Project Type
- **Frontend:** Pure HTML5, CSS3, and Vanilla JavaScript (ES6+)
- **Mapping:** Leaflet.js for interactive maps
- **Data:** GeoJSON format for geographic data
- **Deployment:** Vercel with PWA capabilities

## Architecture

### Core Structure
```
C:\02_Repositorio\Mapa\
├── index.html                 # Main HTML entry point
├── manifest.json              # PWA manifest
├── sw.js                     # Service worker for PWA
├── src/
│   ├── components/
│   │   └── script.js         # Main application logic
│   ├── styles/
│   │   └── styles.css        # All CSS styling
│   ├── data/
│   │   ├── barrios_optimizado.geojson       # Geographic boundaries
│   │   ├── barrios_ultra_optimizado.geojson # Optimized version
│   │   └── puntos_criticos.json            # Critical points data
│   ├── libs/
│   │   ├── leaflet.js        # Leaflet mapping library
│   │   └── font-awesome.css  # Icon fonts
│   └── assets/               # Images and icons
├── scripts/                  # Development and coordination tools
├── Metodolygy_Process/       # Agent coordination documentation
└── vercel.json              # Vercel deployment configuration
```

### Key Design Patterns
- **Template Method:** Application initialization sequence
- **Factory Method:** Marker creation by institution type
- **Observer Pattern:** UI event management  
- **Builder Pattern:** Progressive map configuration

## Development Commands

### Local Development Server
```bash
# Start Python HTTP server (recommended)
python -m http.server 8000
# Access at http://localhost:8000

# Alternative via package.json
npm start
# or
npm run dev
```

### Quick Development Tasks
Use the interactive batch script for common tasks:
```bash
# Run the quick commands menu
scripts\quick_commands.bat

# Key options:
# [1] Create project backup
# [2] Validate map integrity  
# [3] Open map in browser
# [9] Start local Python server
```

### Data Processing Scripts
```bash
# Optimize GeoJSON data
python optimize_geojson.py

# Convert KML to GeoJSON  
python convert_kml_to_geojson.py

# Clean up redundant files
python cleanup_redundant_files.py

# Validate map functionality
python scripts\validate_map.py
```

## Agent Coordination System

This project uses a sophisticated agent coordination system for collaborative development:

### Agent Roles
- **Backend Agent:** Data optimization, JavaScript functionality, PWA features, performance
- **UI/UX Agent:** Styling, responsive design, visual experience, accessibility

### File Ownership
**Backend Exclusive:**
- `src/components/script.js` - Main application logic
- `src/data/*.geojson` - Geographic data files  
- `sw.js` - Service worker
- `scripts/` - Development tools

**UI/UX Exclusive:**
- `src/styles/styles.css` - All styling
- `src/assets/` - Images, icons, visual assets

**Shared (Coordination Required):**
- `index.html` - HTML structure and layout
- `manifest.json` - PWA configuration

### Coordination Commands
```bash
# Check system status
python scripts\coordination.py status

# Update agent status
python scripts\coordination.py update-agent backend working "Task description" "30min"
python scripts\coordination.py update-agent uiux available

# File locking
python scripts\coordination.py lock-file "src/components/script.js" backend
python scripts\coordination.py unlock-file "src/components/script.js" backend

# Create handoffs between agents
python scripts\coordination.py create-handoff backend uiux "Work completed, needs visual review"
python scripts\coordination.py accept-handoff [handoff_id] uiux
```

## Data Structure

### Critical Points Data (`puntos_criticos.json`)
Each critical point contains:
- `id`: Unique identifier
- `coordinates`: [latitude, longitude] 
- `address`: Street address
- `description`: Point description
- `type`: Point classification
- `affected_population`: Number of people impacted
- `neighborhood`: Neighborhood name

### Geographic Boundaries (`barrios_optimizado.geojson`)
Contains neighborhood polygons for Barranquilla with properties for styling and popup information.

## Key Configuration

### Map Settings (in `script.js`)
```javascript
const CONFIG = {
    BARRANQUILLA_COORDS: [10.9639, -74.7964], // City center
    DEFAULT_ZOOM: 12,
    INSTITUTION_COLORS: {
        universidad: '#03588C',
        colegio: '#03A63C', 
        tecnico: '#F2CE16'
    }
}
```

### Client Requirements
Based on `requerimiento_cliente.yml`:
- Map must load properly (no blank states)
- Should not open in incognito mode
- Simple list view for found points
- Minimalist blue balloon markers for neighborhoods  
- Aesthetic cards for point details
- Green points changed to balloons with ID
- Popup must include affected population

## Development Notes

### Cache Busting
The application uses timestamp-based cache busting for development:
```javascript
// CSS loaded with timestamp
cssLink.href = `./src/styles/styles.css?v=${Date.now()}`;

// Script loaded with timestamp  
script.src = `./src/components/script.js?v=${Date.now()}`;
```

### Service Worker
Service worker is DISABLED during development to prevent caching issues. For production, uncomment the registration code in `index.html`.

### Performance Optimization
- GeoJSON files have ultra-optimized versions for production
- Vercel configuration includes aggressive caching for static assets
- CSS/JS files are cached for 1 year, data files for 1 hour

### PWA Features  
- Offline capability via service worker
- App installation prompt after 30 seconds
- Mobile-first responsive design
- Manifest includes shortcuts and screenshots

## Testing and Validation

### Manual Testing Checklist
Comprehensive testing procedures are documented in:
- `Metodolygy_Process/CHECKLIST_MANUAL_TESTING.md`

### Map Validation
```bash
# Validate map integrity and performance
python scripts\validate_map.py "C:\02_Repositorio\Mapa"
```

## Deployment

### Vercel Configuration
The project is configured for Vercel deployment with:
- Header-based caching policies
- Security headers (CSP, XSS protection)
- SPA routing fallback to `index.html`

### Build Process
No build step required - static files deployed directly to Vercel.

## Context Migration

The project context shows evolution from educational institutions to critical waste points. When working with the data:

1. Original structure supported universities, schools, and technical institutes
2. Current focus is on waste management critical points
3. Some variable names and comments may still reference the educational context
4. Data structure has been adapted but maintains similar patterns

## Browser Compatibility

- Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- Mobile responsive: 320px to 4K resolution  
- WCAG 2.1 AA accessibility compliance
- Progressive Web App features in modern browsers

## Security

- Content Security Policy configured in Vercel
- XSS and clickjacking protection
- No sensitive data exposure
- Local development only for critical operations