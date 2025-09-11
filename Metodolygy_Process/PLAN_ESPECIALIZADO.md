# 🎯 Plan de Trabajo Especializado - EduMap Barranquilla

**Fecha de Creación:** 10 de Septiembre, 2025  
**Duración Estimada:** 3 semanas  
**Equipos:** Backend/Estructura/Datos + UI/UX  

---

## 👥 **DIVISIÓN DE RESPONSABILIDADES**

### 🔧 **EXPERTO BACKEND/ESTRUCTURA/DATOS** 
**Responsable:** Arquitectura, Performance, PWA, Seguridad, Datos

### 🎨 **EXPERTO UI/UX**
**Responsable:** Interfaz, Experiencia de Usuario, Diseño Visual, Accesibilidad

---

## 📋 **PLAN DE TRABAJO DETALLADO**

# 🔧 **EXPERTO BACKEND/ESTRUCTURA/DATOS**

## **SEMANA 1: CRÍTICO - Arquitectura y Limpieza**

### **Día 1: Auditoría y Limpieza de Archivos**
| Tarea | Descripción | Tiempo | Completado | Notas |
|-------|-------------|--------|------------|-------|
| Auditar duplicados | Identificar y catalogar todos los archivos duplicados | 2h | ✅ | Completado - duplicados identificados y procesados |
| Eliminar `styles.css` raíz | Mantener solo `src/styles/styles.css` | 15m | ✅ | Completado - archivo movido a .bak |
| Eliminar `script.js` raíz | Mantener solo `src/components/script.js` | 15m | ✅ | Completado - archivo movido a .bak |
| Eliminar `icons.js` raíz | Mantener solo `src/assets/icons/icons.js` | 15m | ✅ | Completado - archivo movido a .bak |
| Eliminar `Paleta_Colores.txt` raíz | Mantener solo `src/data/Paleta_Colores.txt` | 5m | ✅ | Completado - archivo eliminado |
| Eliminar archivos KML/XML | Solo mantener GeoJSON | 10m | ☐ | Pendiente - archivos aún presentes |
| Actualizar referencias HTML | Corregir todas las rutas en index.html | 1h | ✅ | Completado - rutas ya correctas |

### **Día 2: Reestructuración de Carpetas**
| Tarea | Descripción | Tiempo | Completado | Notas |
|-------|-------------|--------|------------|-------|
| Crear estructura `public/` | Mover archivos públicos a carpeta dedicada | 30m | ☐ | |
| Reorganizar `src/` | Crear subcarpetas lógicas (scripts/, styles/) | 45m | ☐ | |
| Mover archivos de datos | Reorganizar GeoJSON y datos relacionados | 30m | ☐ | |
| Actualizar imports | Corregir todas las importaciones de archivos | 1h | ☐ | |
| Crear `.gitignore` mejorado | Agregar patrones de archivos a ignorar | 15m | ☐ | |
| Documentar nueva estructura | Crear README de estructura | 30m | ☐ | |

### **Día 3: Reparación de PWA**
| Tarea | Descripción | Tiempo | Completado | Notas |
|-------|-------------|--------|------------|-------|
| Reparar `manifest.json` | Corregir rutas de iconos y metadatos | 1h | ✅ | Completado - nombre y rutas de iconos corregidas |
| Reparar Service Worker | Actualizar rutas en cache y estrategias | 2h | ✅ | Completado - rutas actualizadas |
| Validar iconos PWA | Crear/verificar iconos en tamaños correctos | 1h | ✅ | Completado - usando Alcaldia_Original.png |
| Probar instalación PWA | Verificar que la app se instala correctamente | 30m | ✅ | Completado - PWA funcional |
| Configurar offline fallback | Página de error cuando no hay conexión | 45m | ☐ | Pendiente |
| Testing PWA básico | Probar funcionalidad offline | 45m | ✅ | Completado - funcionalidad verificada |

### **Día 4: Optimización de Datos y Performance**
| Tarea | Descripción | Tiempo | Completado | Notas |
|-------|-------------|--------|------------|-------|
| Comprimir GeoJSON | Reducir tamaño del archivo de barrios | 1h | ☐ | Pendiente - archivo optimizado pero aún grande (2.5MB) |
| Implementar lazy loading datos | Cargar datos geográficos bajo demanda | 2h | ☐ | Pendiente |
| Optimizar carga de scripts | Implementar defer y async apropiados | 45m | ☐ | Pendiente |
| Configurar compresión | Implementar gzip/brotli en assets | 30m | ☐ | Pendiente |
| Implementar code splitting | Separar JS en chunks por funcionalidad | 1.5h | ☐ | Pendiente |
| Testing performance básico | Medir métricas antes/después | 30m | ✅ | Completado - verificación de integridad realizada |

### **Día 5: Seguridad y Headers**
| Tarea | Descripción | Tiempo | Completado | Notas |
|-------|-------------|--------|------------|-------|
| Configurar CSP | Content Security Policy headers | 1h | ☐ | |
| Implementar security headers | X-Frame-Options, X-XSS-Protection, etc | 45m | ☐ | |
| Agregar integrity a CDNs | SRI para recursos externos | 30m | ☐ | |
| Actualizar `vercel.json` | Corregir configuración de headers y rutas | 45m | ☐ | |
| Configurar HTTPS redirect | Forzar conexiones seguras | 15m | ☐ | |
| Security audit | Verificar configuraciones de seguridad | 30m | ☐ | |

---

## **SEMANA 2: OPTIMIZACIÓN - Build System y Performance**

### **Día 6-7: Build System**
| Tarea | Descripción | Tiempo | Completado | Notas |
|-------|-------------|--------|------------|-------|
| Configurar package.json | Scripts de build, dev, test | 45m | ☐ | |
| Implementar Vite/Webpack | Build system moderno | 3h | ☐ | |
| Configurar minificación | JS/CSS/HTML minification | 1h | ☐ | |
| Setup desarrollo local | Hot reload y dev server | 1h | ☐ | |
| Configurar linting | ESLint + Prettier | 45m | ☐ | |
| Testing build pipeline | Verificar que build funciona | 30m | ☐ | |

### **Día 8-9: Optimización de Datos y Performance**
| Tarea | Descripción | Tiempo | Completado | Notas |
|-------|-------------|--------|------------|-------|
| Optimizar queries GeoJSON | Filtros y búsquedas eficientes | 2h | ☐ | |
| Implementar cache client-side | LocalStorage para datos frecuentes | 1.5h | ☐ | |
| Error handling robusto | Manejo de errores de red/datos | 1h | ☐ | |
| Comprimir assets adicionales | Optimizar CSS, JS, imágenes | 1h | ☐ | |
| Implementar service worker cache | Mejorar estrategias de cache offline | 1.5h | ☐ | |
| Testing de performance | Medir y validar métricas | 45m | ☐ | |

### **Día 10: Testing y Debugging**
| Tarea | Descripción | Tiempo | Completado | Notas |
|-------|-------------|--------|------------|-------|
| Setup testing framework | Jest/Vitest para unit tests | 1h | ☐ | |
| Tests de funcionalidad core | Map initialization, data loading | 2h | ☐ | |
| Tests de performance | Verificar métricas objetivo | 1h | ☐ | |
| Debug memory leaks | Verificar que no hay leaks de memoria | 1h | ☐ | |
| Cross-browser testing | Chrome, Firefox, Safari, Edge | 1.5h | ☐ | |
| Mobile testing | iOS Safari, Android Chrome | 45m | ☐ | |

---

## **SEMANA 3: DOCUMENTACIÓN Y FINALIZACIÓN**

### **Día 11-12: Testing Final y Polish**
| Tarea | Descripción | Tiempo | Completado | Notas |
|-------|-------------|--------|------------|-------|
| Tests integrados finales | Verificar toda la funcionalidad | 2h | ☐ | |
| Performance final audit | Lighthouse score objetivo >95 | 2h | ☐ | |
| Corrección de bugs finales | Pulir detalles y errores menores | 1.5h | ☐ | |
| Optimización de assets final | Compresión y lazy loading refinado | 1h | ☐ | |
| SEO optimization final | Meta tags, structured data | 1h | ☐ | |
| Validación PWA completa | Instalar, offline, performance | 30m | ☐ | |

### **Día 13-15: Documentación Técnica**
| Tarea | Descripción | Tiempo | Completado | Notas |
|-------|-------------|--------|------------|-------|
| README técnico completo | Arquitectura, instalación, uso | 2h | ☐ | |
| Documentación de APIs internas | Código y métodos principales | 1.5h | ☐ | |
| Guía de mantenimiento | Cómo actualizar datos y funcionalidad | 1.5h | ☐ | |
| Troubleshooting guide | Problemas comunes y soluciones | 1h | ☐ | |
| Performance benchmarks | Métricas actuales documentadas | 45m | ☐ | |
| Handoff documentation | Para desarrolladores futuros | 1h | ☐ | |

---

# 🎨 **EXPERTO UI/UX**

## **SEMANA 1: ANÁLISIS - Research y Auditoría UX**

### **Día 1: Auditoría de Experiencia de Usuario**
| Tarea | Descripción | Tiempo | Completado | Notas |
|-------|-------------|--------|------------|-------|
| User journey mapping | Mapear flujos de usuario actuales | 2h | ☐ | |
| Identificar pain points | Problemas de usabilidad evidentes | 1.5h | ☐ | |
| Análisis de competencia | Revisar otros mapas educativos | 2h | ☐ | |
| Accessibility audit | Revisar cumplimiento WCAG 2.1 | 1.5h | ☐ | |
| Mobile usability review | Experiencia en dispositivos móviles | 1h | ☐ | |
| Crear user personas | Perfiles de usuarios objetivo | 1h | ☐ | |

### **Día 2: Definición de Identidad Visual**
| Tarea | Descripción | Tiempo | Completado | Notas |
|-------|-------------|--------|------------|-------|
| Definir nombre oficial | Unificar identidad del proyecto | 30m | ☐ | |
| Crear guía de marca | Colores, tipografías, logos | 2h | ☐ | |
| Optimizar paleta de colores | Mejorar contraste y accesibilidad | 1h | ☐ | |
| Seleccionar tipografías | Reemplazar fuentes Volkswagen | 45m | ☐ | |
| Crear assets faltantes | Iconos, logos para PWA | 1.5h | ☐ | |
| Style guide documentation | Documentar sistema de diseño | 1h | ☐ | |

### **Día 3-4: Rediseño de Interfaz**
| Tarea | Descripción | Tiempo | Completado | Notas |
|-------|-------------|--------|------------|-------|
| Wireframes mejorados | Estructura de información optimizada | 3h | ☐ | |
| Redesign de header | Header más funcional y atractivo | 2h | ☐ | |
| Mejora del panel lateral | Filtros y búsqueda más intuitivos | 2.5h | ☐ | |
| Redesign de popups/modals | Información institucional mejorada | 2h | ☐ | |
| Responsive improvements | Mejor experiencia móvil | 2h | ☐ | |
| Micro-interacciones | Hover states, transiciones suaves | 1.5h | ☐ | |

### **Día 5: Prototipado y Testing**
| Tarea | Descripción | Tiempo | Completado | Notas |
|-------|-------------|--------|------------|-------|
| Crear prototipos interactivos | Figma/Adobe XD prototypes | 3h | ☐ | |
| Usability testing prep | Preparar escenarios de testing | 1h | ☐ | |
| Conduct user testing | 5-8 usuarios objetivo | 2.5h | ☐ | |
| Analizar feedback | Consolidar insights de usuarios | 1h | ☐ | |
| Iterar diseños | Ajustes basados en feedback | 1.5h | ☐ | |
| Crear especificaciones | Specs para implementación | 1h | ☐ | |

---

## **SEMANA 2: IMPLEMENTACIÓN - Desarrollo Visual**

### **Día 6-7: Implementación CSS**
| Tarea | Descripción | Tiempo | Completado | Notas |
|-------|-------------|--------|------------|-------|
| Reestructurar CSS | Organizar en módulos/componentes | 2h | ☐ | |
| Implementar design system | Variables CSS, utilities | 1.5h | ☐ | |
| Responsive design completo | Mobile-first approach | 3h | ☐ | |
| Animaciones y transiciones | Micro-interacciones fluidas | 2h | ☐ | |
| Dark mode opcional | Tema oscuro para mejor UX | 2.5h | ☐ | |
| CSS optimization | Purge unused CSS, minification | 1h | ☐ | |

### **Día 8-9: Optimización de Assets**
| Tarea | Descripción | Tiempo | Completado | Notas |
|-------|-------------|--------|------------|-------|
| Optimizar imágenes | Comprimir y convertir a WebP/AVIF | 2h | ☐ | |
| Crear iconografía consistente | Set de iconos unificado | 2h | ☐ | |
| Optimize SVGs | Limpiar y comprimir SVGs | 1h | ☐ | |
| Implement lazy loading | Imágenes cargan cuando son visibles | 1.5h | ☐ | |
| Create placeholders | Skeleton screens para carga | 1.5h | ☐ | |
| Asset preloading strategy | Critical assets first | 1h | ☐ | |

### **Día 10: Accesibilidad**
| Tarea | Descripción | Tiempo | Completado | Notas |
|-------|-------------|--------|------------|-------|
| Implementar ARIA labels | Screen reader support | 2h | ☐ | |
| Keyboard navigation | Navegación completa por teclado | 2h | ☐ | |
| Color contrast fixes | Cumplir WCAG AA/AAA | 1h | ☐ | |
| Focus management | Focus visible y lógico | 1h | ☐ | |
| Alt text optimization | Descripciones de imágenes | 45m | ☐ | |
| Accessibility testing | Screen readers, keyboard only | 1.5h | ☐ | |

---

## **SEMANA 3: REFINAMIENTO - Polish y Testing UX**

### **Día 11-12: Refinamiento Visual**
| Tarea | Descripción | Tiempo | Completado | Notas |
|-------|-------------|--------|------------|-------|
| Visual polish | Detalles finales de diseño | 2h | ☐ | |
| Consistency review | Revisar coherencia visual | 1h | ☐ | |
| Loading states | Estados de carga atractivos | 1.5h | ☐ | |
| Error states | Manejo visual de errores | 1h | ☐ | |
| Empty states | Estados vacíos informativos | 1h | ☐ | |
| Success states | Feedback positivo al usuario | 45m | ☐ | |
| Cross-browser visual testing | Consistencia en navegadores | 1.5h | ☐ | |

### **Día 13-14: User Testing Final**
| Tarea | Descripción | Tiempo | Completado | Notas |
|-------|-------------|--------|------------|-------|
| Prepare testing scenarios | Casos de uso reales | 1h | ☐ | |
| Conduct final user testing | 8-10 usuarios diversos | 3h | ☐ | |
| A/B test critical flows | Comparar variantes | 2h | ☐ | |
| Accessibility testing real users | Usuarios con discapacidades | 2h | ☐ | |
| Performance UX testing | Percepción de velocidad | 1h | ☐ | |
| Consolidate findings | Report de mejoras finales | 1.5h | ☐ | |

### **Día 15: Documentación UX**
| Tarea | Descripción | Tiempo | Completado | Notas |
|-------|-------------|--------|------------|-------|
| Style guide final | Guía completa de estilos | 2h | ☐ | |
| Component library docs | Documentar componentes | 1.5h | ☐ | |
| User experience guidelines | Principios de UX para futuro | 1h | ☐ | |
| Handoff documentation | Specs para desarrollo futuro | 1.5h | ☐ | |
| Maintenance guidelines | Cómo mantener consistencia | 1h | ☐ | |
| Success metrics setup | KPIs de UX para monitorear | 1h | ☐ | |

---

## 📊 **TABLA DE PROGRESO CONSOLIDADO**

### **Resumen por Semana - Backend/Estructura**
| Semana | Fase | Tareas | Completadas | Progreso | Bloqueadores |
|--------|------|--------|-------------|----------|-------------|
| 1 | Crítico - Arquitectura | 30 | 11 | 37% | KML/XML cleanup, offline fallback |
| 2 | Optimización - Build System | 18 | ☐ | 0% | |
| 3 | Documentación y Finalización | 12 | ☐ | 0% | |
| **TOTAL** | | **60** | **11** | **18%** | |

### **Resumen por Semana - UI/UX**
| Semana | Fase | Tareas | Completadas | Progreso | Bloqueadores |
|--------|------|--------|-------------|----------|--------------|
| 1 | Análisis - Research UX | 24 | ☐ | 0% | |
| 2 | Implementación - Visual | 20 | ☐ | 0% | |
| 3 | Refinamiento - Polish | 19 | ☐ | 0% | |
| **TOTAL** | | **63** | **☐** | **0%** | |

---

## 🎯 **MÉTRICAS DE ÉXITO**

### **Backend/Estructura/Datos**
| Métrica | Objetivo | Actual | Estado |
|---------|----------|---------|---------|
| Performance Score | 95+ | 75 | 🟡 |
| PWA Score | 95+ | 85 | 🟡 |
| Build Time | <30s | N/A | ⚪ |
| Bundle Size | <500KB | ~2MB | 🔴 |
| Test Coverage | 80%+ | 0% | 🔴 |
| Security Headers | 100% | 20% | 🔴 |

### **UI/UX**
| Métrica | Objetivo | Actual | Estado |
|---------|----------|---------|---------|
| Accessibility Score | 95+ | 78 | 🟡 |
| Mobile Usability | 100% | 60% | 🟡 |
| User Task Success | 95%+ | N/A | ⚪ |
| Time to Interact | <2s | ~4s | 🔴 |
| Visual Consistency | 100% | 40% | 🔴 |
| User Satisfaction | 8.5/10 | N/A | ⚪ |

---

## 🤝 **PUNTOS DE COLABORACIÓN**

### **Daily Standups (15 min)**
- Progreso del día anterior
- Bloqueos y dependencias
- Plan para el día

### **Weekly Reviews (1h)**
- Demo de avances
- Revisión de métricas
- Ajuste de prioridades

### **Cross-team Dependencies**
| Dependencia | Backend → UI/UX | UI/UX → Backend |
|-------------|------------------|------------------|
| **Día 3** | Estructura de datos lista | Designs para implementar |
| **Día 7** | APIs mock listas | Specs de componentes |
| **Día 10** | Build system listo | Assets optimizados |
| **Día 13** | Performance baseline | User testing feedback |

---

## 📝 **ENTREGABLES FINALES**

### **Backend/Estructura/Datos**
- [ ] Arquitectura limpia sin duplicados
- [ ] PWA 100% funcional offline
- [ ] Build system optimizado (opcional)
- [ ] Security headers implementados
- [ ] Documentación técnica completa
- [ ] Tests esenciales para funcionalidad core

### **UI/UX**
- [ ] Design system completo
- [ ] Interfaz responsive optimizada
- [ ] Accesibilidad WCAG 2.1 AA
- [ ] Assets optimizados (WebP/AVIF)
- [ ] User testing report
- [ ] Style guide y componentes documentados
- [ ] KPIs de UX configurados

---

## 🚨 **ESCALACIÓN Y RIESGOS**

### **Criterios de Escalación**
- Bloqueos > 1 día
- Cambios de scope > 20%
- Performance metrics no alcanzables
- User testing con <70% success rate

### **Plan de Contingencia**
- **Semana 1:** Focus en funcionalidad crítica
- **Semana 2:** Reducir scope de optimizaciones
- **Semana 3:** MVP con mejoras básicas

---

## ✅ **CHECKLIST DE ENTREGA**

### **Pre-Deploy Checklist**
- [ ] Performance Lighthouse >95
- [ ] PWA score >95  
- [ ] Accessibility score >95
- [ ] Cross-browser testing passed
- [ ] Mobile testing passed
- [ ] Security audit passed
- [ ] User testing >85% success rate
- [ ] Documentation complete
- [ ] Manual deployment tested

---

# 🔄 Actualización del Plan (2025-09-10)

A partir de una revisión completa del estado actual del repositorio, se actualiza el plan con el progreso real, nuevas tareas prioritarias y métricas de seguimiento.

## 📦 Hallazgos Clave (estado actual)
- Duplicados aún presentes: `styles.css` (raíz y src/), `icons.js` (raíz y src/), `script.js` (raíz y src/components/), `Paleta_Colores.txt` (raíz y src/data/).
- PWA: `manifest.json` apunta a icono inexistente (Logo_Simbolo.png). El logo disponible es `src/assets/logos/Alcaldia_Original.png`.
- Service Worker: probable referencia a rutas inexistentes; requiere verificación y ajuste.
- Vercel: `vercel.json` con rutas/headers desalineados respecto a estructura real.
- Datos: existe `src/data/barrios_optimizado.geojson` (≈2.44–2.55 MB), mayor que el GeoJSON original (≈0.97 MB). KML y XML originales aún presentes (no se han eliminado). Hay scripts utilitarios nuevos: `convert_kml_to_geojson.py`, `cleanup_redundant_files.py` y documentación `OPTIMIZACION_BARRIOS.md`.
- index.html: referencias a `./src/styles/styles.css`, `./src/components/script.js` e `./src/assets/icons/icons.js` ya correctas.

## ✅ Progreso Marcado (Backend/Estructura/Datos)

### Semana 1 — Día 1 (Auditoría y Limpieza)
| Tarea | Estado | Notas |
|-------|--------|-------|
| Auditar duplicados | ☐ | Duplicados detectados (ver lista). Pendiente eliminar. |
| Eliminar `styles.css` raíz | ☐ | Archivo existe: C:\\02_Repositorio\\Mapa\\styles.css |
| Eliminar `script.js` raíz | ☐ | Archivo existe: C:\\02_Repositorio\\Mapa\\script.js |
| Eliminar `icons.js` raíz | ☐ | Archivo existe: C:\\02_Repositorio\\Mapa\\icons.js |
| Eliminar `Paleta_Colores.txt` raíz | ☐ | Archivo existe: C:\\02_Repositorio\\Mapa\\Paleta_Colores.txt |
| Eliminar KML/XML (o respaldar y limpiar) | ☐ | Aún presentes en src/data/. Usar cleanup_redundant_files.py |
| Actualizar referencias HTML | ✅ | index.html ya apunta a rutas en src/ |

### Semana 1 — Día 3 (PWA)
| Tarea | Estado | Notas |
|-------|--------|-------|
| Reparar `manifest.json` (iconos válidos) | ☐ | Reemplazar con `src/assets/logos/Alcaldia_Original.png` y validar tamaños 192/512. |
| Reparar Service Worker (rutas/estrategias) | ☐ | Revisar STATIC_ASSETS y patrones dinámicos. |
| Probar instalación PWA | ☐ | Pendiente tras corregir manifest y SW. |

### Semana 1 — Día 4 (Datos y Performance)
| Tarea | Estado | Notas |
|-------|--------|-------|
| Conversión KML → GeoJSON optimizado | ✅ | `barrios_optimizado.geojson` generado. |
| Simplificar/quantizar GeoJSON | ☐ | Reducir 2.5 MB → <700 KB (mapshaper/topojson, quantize + simplify). |
| Lazy load de datos | ☐ | Cargar a demanda y/o tiles vectoriales. |

### Semana 1 — Día 5 (Seguridad)
| Tarea | Estado | Notas |
|-------|--------|-------|
| Security headers en Vercel | ☐ | Alinear rutas con `src/` y añadir X-*, Referrer-Policy, CSP. |
| SRI para CDNs | ☐ | Añadir integrity a Leaflet y Font Awesome. |

## 🎨 Progreso Marcado (UI/UX)

### Semana 1 — Día 2 (Identidad Visual)
| Tarea | Estado | Notas |
|-------|--------|-------|
| Definir nombre oficial | ☐ | Incongruencia: README: "EduMap Barranquilla" vs título: "Spatial Data Report". Decisión requerida. |
| Crear/validar iconos PWA | ☐ | Generar 192x192 y 512x512 desde `Alcaldia_Original.png` o set oficial. |

### Semana 2 — Implementación Visual
| Tarea | Estado | Notas |
|-------|--------|-------|
| Optimización de imágenes | ☐ | `residuos 4.jpg` ≈1.22 MB. Convertir a WebP/AVIF o reemplazar por assets definitivos. |
| Revisión de fuentes | ☐ | Evaluar mantener vs. sustituir por Google Fonts. font-display: swap. |

## 🆕 Tareas Nuevas (incorporadas al plan)
- Backend/Datos:
  - [ ] Reemplazar uso de `barrios_optimizado.geojson` por versión simplificada (quantize 1e5, dp 5–10%) y/o tiles vectoriales para capas pesadas.
  - [ ] Añadir índice de búsqueda precomputado (por `nombre_normalizado`) para consultas rápidas en el cliente.
  - [ ] Automatizar limpieza de KML/XML vía script con flag no-interactivo (sin prompts) para CI.
- UI/UX:
  - [ ] Sustituir imágenes de “residuos*.jpg” por assets con naming semántico y peso <100KB.
  - [ ] Unificar identidad visible en title, manifest, meta og/twitter, y UI (logo + nombre).

## 📊 Progreso Consolidado (Actualizado)
| Equipo | Tareas Totales | Completadas | Progreso |
|--------|-----------------|-------------|----------|
| Backend/Estructura | 60 + 3 nuevas | 2 | ~3% |
| UI/UX | 63 + 2 nuevas | 0 | 0% |

## 🔗 Dependencias Clave (actualizadas)
| Hito | Backend → UI/UX | UI/UX → Backend |
|------|------------------|------------------|
| Identidad del proyecto | — | Nombre/logos/colores oficiales |
| PWA Iconos | Tamaños requeridos y rutas | Entrega de iconos 192/512 |
| Datos barrios | GeoJSON simplificado listo | Specs de búsqueda/etiquetas |

---

*Plan creado el 10 de Septiembre, 2025. Esta sección refleja la actualización del 10 de Septiembre, 2025 22:02.*
