# ✅ Checklist Manual de Testing - EduMap Barranquilla

**Objetivo:** Verificar manualmente que el mapa funciona correctamente después de cada modificación

---

## 🚀 **TESTING RÁPIDO (2-3 minutos)**
*Usar después de cambios menores*

### ⚡ **Verificación Express**
| # | Acción | Esperado | ✓ |
|---|--------|----------|---|
| 1 | Abrir `index.html` en navegador | Página carga sin errores | ☐ |
| 2 | Verificar mapa aparece | Leaflet map visible con tiles | ☐ |
| 3 | Verificar instituciones | 12 marcadores visibles en mapa | ☐ |
| 4 | Click en una institución | Popup muestra información | ☐ |
| 5 | Abrir panel lateral | Sidebar se desliza correctamente | ☐ |

**Si TODOS están ✅ → Continuar con cambios**  
**Si alguno falla → ROLLBACK inmediato**

---

## 🔍 **TESTING COMPLETO (5-10 minutos)**
*Usar después de cambios importantes o al final del día*

### 📱 **1. Funcionalidad del Mapa**
| # | Verificación | Acción | Esperado | ✓ |
|---|--------------|--------|----------|---|
| 1.1 | **Carga inicial** | Abrir `index.html` | Mapa carga en <3 segundos | ☐ |
| 1.2 | **Tiles del mapa** | Verificar fondo | OpenStreetMap tiles visibles | ☐ |
| 1.3 | **Zoom** | Usar botones +/- | Zoom funciona suavemente | ☐ |
| 1.4 | **Pan** | Arrastrar mapa | Mapa se mueve correctamente | ☐ |
| 1.5 | **Centro inicial** | Posición al cargar | Barranquilla centrada | ☐ |

### 🏫 **2. Instituciones Educativas**
| # | Verificación | Acción | Esperado | ✓ |
|---|--------------|--------|----------|---|
| 2.1 | **Marcadores** | Contar pins en mapa | 12 instituciones visibles | ☐ |
| 2.2 | **Popups** | Click en cada pin | Popup muestra nombre/info | ☐ |
| 2.3 | **Iconos** | Verificar visualización | Iconos de educación visibles | ☐ |
| 2.4 | **Posicionamiento** | Ubicaciones en mapa | Pins en posiciones correctas | ☐ |

### 🔍 **3. Panel de Búsqueda**
| # | Verificación | Acción | Esperado | ✓ |
|---|--------------|--------|----------|---|
| 3.1 | **Abrir panel** | Click en icono búsqueda | Sidebar se desliza desde izquierda | ☐ |
| 3.2 | **Cerrar panel** | Click en X o fuera | Panel se cierra correctamente | ☐ |
| 3.3 | **Campo búsqueda** | Escribir nombre institución | Campo responde al texto | ☐ |
| 3.4 | **Filtros** | Usar filtros disponibles | Filtros afectan resultados | ☐ |
| 3.5 | **Resultados** | Ver lista instituciones | Lista se actualiza dinámicamente | ☐ |

### 🌍 **4. Datos Geográficos**
| # | Verificación | Acción | Esperado | ✓ |
|---|--------------|--------|----------|---|
| 4.1 | **Polígonos barrios** | Verificar en mapa | Barrios dibujados correctamente | ☐ |
| 4.2 | **Colores barrios** | Inspeccionar visualmente | Colores diferenciados por barrio | ☐ |
| 4.3 | **Hover barrios** | Pasar mouse sobre barrio | Efecto hover funciona | ☐ |
| 4.4 | **Click barrios** | Click en polígono barrio | Información del barrio aparece | ☐ |

### 📱 **5. PWA (Progressive Web App)**
| # | Verificación | Acción | Esperado | ✓ |
|---|--------------|--------|----------|---|
| 5.1 | **Manifest** | DevTools > Application > Manifest | Manifest carga sin errores | ☐ |
| 5.2 | **Service Worker** | DevTools > Application > SW | SW registrado y activo | ☐ |
| 5.3 | **Instalación** | Chrome: "Instalar app" | Opción de instalación disponible | ☐ |
| 5.4 | **Iconos** | Verificar en manifest | Iconos PWA existen y cargan | ☐ |
| 5.5 | **Offline** | Desconectar internet | Mapa funciona offline (básico) | ☐ |

### 🎨 **6. Diseño y UI/UX**
| # | Verificación | Acción | Esperado | ✓ |
|---|--------------|--------|----------|---|
| 6.1 | **Responsive** | Cambiar tamaño ventana | Layout se adapta correctamente | ☐ |
| 6.2 | **Móvil** | DevTools mobile view | Funciona en vista móvil | ☐ |
| 6.3 | **Colores** | Verificar paleta | Colores consistentes con diseño | ☐ |
| 6.4 | **Fonts** | Verificar tipografía | Fuentes cargan correctamente | ☐ |
| 6.5 | **Botones** | Probar interacciones | Todos los botones responden | ☐ |

---

## 🔥 **TESTING DE PERFORMANCE (5 minutos)**
*Usar después de optimizaciones*

### ⚡ **Métricas Clave**
| Métrica | Herramienta | Valor Objetivo | Actual | ✓ |
|---------|-------------|----------------|---------|---|
| **Tiempo carga** | Cronómetro | <3 segundos | ___ seg | ☐ |
| **First Paint** | DevTools > Lighthouse | <2 segundos | ___ seg | ☐ |
| **Tamaño bundle** | DevTools > Network | <5 MB total | ___ MB | ☐ |
| **Requests** | DevTools > Network | <20 requests | ___ requests | ☐ |
| **PWA Score** | Lighthouse | >90 | ___ / 100 | ☐ |

### 🌐 **Testing Cross-Browser**
| Navegador | Versión | Funciona | Notas | ✓ |
|-----------|---------|----------|-------|---|
| **Chrome** | Latest | ☐ | ___________ | ☐ |
| **Firefox** | Latest | ☐ | ___________ | ☐ |
| **Safari** | Latest | ☐ | ___________ | ☐ |
| **Edge** | Latest | ☐ | ___________ | ☐ |
| **Chrome Mobile** | Latest | ☐ | ___________ | ☐ |

---

## 🚨 **TESTING POST-ERROR**
*Usar después de un rollback o corrección de errores*

### 🔄 **Verificación de Recuperación**
| # | Verificación | Estado | Notas |
|---|--------------|---------|-------|
| 1 | **Funcionalidad base** | ☐ | ¿Mapa carga normalmente? |
| 2 | **Sin errores JavaScript** | ☐ | DevTools > Console limpia |
| 3 | **Archivos presentes** | ☐ | Todos los assets cargan |
| 4 | **Performance normal** | ☐ | Velocidad similar a antes |
| 5 | **Funciones críticas** | ☐ | Búsqueda, PWA, markers OK |

---

## 📊 **TESTING ESPECÍFICO POR TIPO DE CAMBIO**

### 🗂️ **Después de Eliminar Archivos**
- [ ] ✅ Verificar que no hay errores 404 en DevTools > Network
- [ ] ✅ Confirmar que CSS se carga desde ubicación correcta
- [ ] ✅ Confirmar que JavaScript se carga desde ubicación correcta
- [ ] ✅ Verificar que iconos e imágenes cargan
- [ ] ✅ Probar todas las funcionalidades básicas

### 🔧 **Después de Modificar PWA**
- [ ] ✅ Manifest.json válido en DevTools
- [ ] ✅ Service Worker se registra sin errores
- [ ] ✅ Cache funciona correctamente
- [ ] ✅ Instalación PWA disponible
- [ ] ✅ Funciona offline (al menos parcialmente)

### 🗺️ **Después de Cambiar Datos GeoJSON**
- [ ] ✅ Barrios se renderizan correctamente
- [ ] ✅ No hay errores de parsing en consola
- [ ] ✅ Performance del mapa mantiene fluidez
- [ ] ✅ Colores y estilos se aplican bien
- [ ] ✅ Interacción con polígonos funciona

### 🎨 **Después de Cambios CSS/UI**
- [ ] ✅ Layout no se rompe en ningún breakpoint
- [ ] ✅ Colores son consistentes
- [ ] ✅ Fuentes cargan correctamente
- [ ] ✅ Animaciones funcionan suavemente
- [ ] ✅ Accesibilidad mantiene contraste adecuado

### ⚙️ **Después de Optimizaciones**
- [ ] ✅ Funcionalidad idéntica a antes
- [ ] ✅ Performance mejorada o igual
- [ ] ✅ Tamaño de archivos reducido
- [ ] ✅ Sin regresiones en funcionalidades
- [ ] ✅ Cross-browser compatibility mantenida

---

## 📱 **TESTING MÓVIL ESPECÍFICO**

### 📲 **Verificaciones Mobile**
| # | Verificación | Esperado | ✓ |
|---|--------------|----------|---|
| 1 | **Touch gestures** | Pan, zoom, tap funcionan | ☐ |
| 2 | **Viewport** | Sin zoom horizontal | ☐ |
| 3 | **Botones** | Tamaño adecuado para touch | ☐ |
| 4 | **Sidebar** | Se abre/cierra correctamente | ☐ |
| 5 | **Performance** | Fluidez en móvil mantenida | ☐ |

---

## ✅ **CHECKLIST DE FINALIZACIÓN**

### 🎯 **Antes de Commit/Deploy**
- [ ] **Testing rápido** completado sin errores
- [ ] **Testing completo** completado con <2 warnings
- [ ] **DevTools console** limpia (sin errores rojos)
- [ ] **Network panel** sin 404s o errores
- [ ] **Lighthouse** score >85 en Performance
- [ ] **Mobile testing** básico completado
- [ ] **Funcionalidades críticas** verificadas
- [ ] **Rollback plan** confirmado y documentado

### 📝 **Documentación**
- [ ] Cambios implementados documentados
- [ ] Issues encontrados registrados
- [ ] Performance comparada con versión anterior
- [ ] Próximos pasos definidos

---

## 🚨 **PROTOCOLO DE FALLO**

### ❌ **Si Testing Falla:**

1. **STOP INMEDIATAMENTE** - No seguir con más cambios
2. **Identificar** el cambio específico que causó el problema
3. **Rollback** a la versión funcional inmediatamente
4. **Verificar** que rollback restaura funcionalidad
5. **Analizar** qué causó el fallo antes de reintentar
6. **Re-planificar** el cambio de manera más segura

### 📞 **Escalación de Problemas**
- **Nivel 1** - Error menor: arreglar inmediatamente
- **Nivel 2** - Error mayor: rollback + análisis
- **Nivel 3** - Mapa no funciona: restaurar backup completo

---

**🎯 MANTRA:** *"Si algo no pasa el testing, no proceder hasta arreglarlo"*

---

*Checklist creado para mantener la calidad y funcionalidad del EduMap Barranquilla durante todo el proceso de desarrollo.*