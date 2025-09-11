# 🤝 Matriz de Coordinación de Agentes - EduMap Barranquilla

**Objetivo:** Definir flujos de trabajo claros entre el Agente Backend y el Agente UI/UX

---

## 🎭 **ROLES Y RESPONSABILIDADES**

### 🔧 **Agente Backend**
**Especialización:** Datos, Performance, Funcionalidad, PWA
- ✅ Gestión de archivos GeoJSON y datos
- ✅ Optimización de Service Workers
- ✅ JavaScript funcional y lógica de negocio
- ✅ Configuración de manifesto PWA
- ✅ Testing técnico y validaciones
- ✅ Performance backend y optimización de datos

### 🎨 **Agente UI/UX**
**Especialización:** Diseño, Experiencia de Usuario, Responsive
- ✅ Diseño CSS y estilos visuales
- ✅ Experiencia de usuario e interacciones
- ✅ Responsive design y mobile-first
- ✅ Diseño de iconos y assets visuales
- ✅ Accesibilidad y usabilidad
- ✅ Testing visual y UX

---

## 📁 **MATRIZ DE ARCHIVOS**

### 🔒 **Archivos Exclusivos - Backend**
| Archivo | Responsabilidad | Modificación |
|---------|-----------------|--------------|
| `src/data/barrios_optimizado.geojson` | 🔧 Backend | Solo Backend |
| `src/components/script.js` | 🔧 Backend | Solo Backend |
| `sw.js` | 🔧 Backend | Solo Backend |
| `scripts/` | 🔧 Backend | Solo Backend |

### 🎨 **Archivos Exclusivos - UI/UX**
| Archivo | Responsabilidad | Modificación |
|---------|-----------------|--------------|
| `src/styles/styles.css` | 🎨 UI/UX | Solo UI/UX |
| `src/assets/icons/` | 🎨 UI/UX | Solo UI/UX |
| `src/assets/images/` | 🎨 UI/UX | Solo UI/UX |
| `src/assets/logos/` | 🎨 UI/UX | Solo UI/UX |

### ⚠️ **Archivos Compartidos - Coordinación Requerida**
| Archivo | Backend | UI/UX | Protocolo |
|---------|---------|-------|-----------|
| `index.html` | Estructura/Scripts | Layout/UI | **🔄 Handoff obligatorio** |
| `manifest.json` | Configuración PWA | Iconos/Metadatos | **🔄 Handoff obligatorio** |

---

# 🔄 **WORKFLOWS DE COORDINACIÓN**

## **WORKFLOW 1: Backend → UI/UX**
*Cuando Backend termina funcionalidad técnica y UI/UX debe mejorar presentación*

### 📤 **Handoff de Backend a UI/UX**

#### **Paso 1: Backend Prepara Handoff**
```bash
# Backend actualiza su estado
python scripts/coordination.py update-agent backend working "Optimizando datos GeoJSON" "30min"

# Backend bloquea archivos que está modificando
python scripts/coordination.py lock-file "src/data/barrios_optimizado.geojson" backend
python scripts/coordination.py lock-file "src/components/script.js" backend
```

#### **Paso 2: Backend Completa Trabajo**
```bash
# Backend crea handoff hacia UI/UX
python scripts/coordination.py create-handoff backend uiux "Optimización de datos completada. Necesita mejoras visuales en rendimiento del mapa y feedback de usuario durante carga de datos"

# Backend desbloquea archivos
python scripts/coordination.py unlock-file "src/data/barrios_optimizado.geojson" backend
python scripts/coordination.py unlock-file "src/components/script.js" backend

# Backend actualiza estado
python scripts/coordination.py update-agent backend available
```

#### **Paso 3: UI/UX Acepta y Ejecuta**
```bash
# UI/UX acepta el handoff
python scripts/coordination.py accept-handoff backend_to_uiux_YYYYMMDD_HHMMSS uiux

# UI/UX actualiza estado
python scripts/coordination.py update-agent uiux working "Mejorando UX de carga de datos" "45min"

# UI/UX bloquea archivos necesarios
python scripts/coordination.py lock-file "src/styles/styles.css" uiux
python scripts/coordination.py lock-file "index.html" uiux
```

#### **Paso 4: UI/UX Completa y Cierra**
```bash
# UI/UX completa el handoff
python scripts/coordination.py complete-handoff backend_to_uiux_YYYYMMDD_HHMMSS uiux "Agregados spinners de carga y mejoras visuales en performance"

# UI/UX desbloquea archivos
python scripts/coordination.py unlock-file "src/styles/styles.css" uiux
python scripts/coordination.py unlock-file "index.html" uiux

# UI/UX actualiza estado
python scripts/coordination.py update-agent uiux available
```

---

## **WORKFLOW 2: UI/UX → Backend**
*Cuando UI/UX mejora diseño y Backend debe implementar funcionalidad técnica*

### 📤 **Handoff de UI/UX a Backend**

#### **Paso 1: UI/UX Prepara Handoff**
```bash
# UI/UX actualiza estado
python scripts/coordination.py update-agent uiux working "Rediseñando interfaz de búsqueda" "1h"

# UI/UX bloquea archivos de diseño
python scripts/coordination.py lock-file "src/styles/styles.css" uiux
python scripts/coordination.py lock-file "index.html" uiux
```

#### **Paso 2: UI/UX Completa Diseño**
```bash
# UI/UX crea handoff hacia Backend
python scripts/coordination.py create-handoff uiux backend "Nuevo diseño de búsqueda completado. Necesita implementar funcionalidad de filtros avanzados y lógica de búsqueda por múltiples criterios"

# UI/UX desbloquea archivos de diseño
python scripts/coordination.py unlock-file "src/styles/styles.css" uiux

# UI/UX mantiene bloqueado HTML hasta que Backend implemente
# (HTML compartido requiere coordinación)
```

#### **Paso 3: Backend Implementa Funcionalidad**
```bash
# Backend acepta handoff
python scripts/coordination.py accept-handoff uiux_to_backend_YYYYMMDD_HHMMSS backend

# Backend actualiza estado
python scripts/coordination.py update-agent backend working "Implementando filtros avanzados" "1h30m"

# Backend bloquea archivos de lógica
python scripts/coordination.py lock-file "src/components/script.js" backend
python scripts/coordination.py lock-file "index.html" backend
```

#### **Paso 4: Backend Completa Implementación**
```bash
# Backend completa handoff
python scripts/coordination.py complete-handoff uiux_to_backend_YYYYMMDD_HHMMSS backend "Filtros avanzados implementados con API de búsqueda optimizada"

# Backend desbloquea archivos
python scripts/coordination.py unlock-file "src/components/script.js" backend
python scripts/coordination.py unlock-file "index.html" backend

# UI/UX puede desbloquear HTML ahora
python scripts/coordination.py unlock-file "index.html" uiux

# Backend actualiza estado
python scripts/coordination.py update-agent backend available
```

---

## **WORKFLOW 3: Coordinación de Archivos Compartidos**
*Protocolo específico para `index.html` y `manifest.json`*

### 🤝 **Protocolo de Archivos Compartidos**

#### **Regla #1: Solo un agente modifica a la vez**
```bash
# Agente que quiere modificar verifica el estado
python scripts/coordination.py status

# Si archivo compartido libre, lo bloquea
python scripts/coordination.py lock-file "index.html" backend

# Realiza modificaciones
# ...

# Al terminar, desbloquea
python scripts/coordination.py unlock-file "index.html" backend
```

#### **Regla #2: Notificación obligatoria para cambios en compartidos**
```bash
# Si cambio afecta al otro agente, crear handoff
python scripts/coordination.py create-handoff backend uiux "Modificado HTML para agregar nuevos elementos de datos. Revisar si afecta estilos CSS"
```

#### **Regla #3: Revisión cruzada para archivos críticos**
Antes de considerar completado un cambio en archivo compartido:
1. ✅ Agente creador valida funcionalidad
2. ✅ Agente receptor valida compatibilidad
3. ✅ Ambos aprueban el cambio

---

# 📋 **TIPOS DE HANDOFFS COMUNES**

## **🔧 Backend → 🎨 UI/UX**

### **Tipo 1: Optimización Técnica Completada**
```
Descripción: "Datos GeoJSON optimizados, reducido 40% del tamaño. Performance mejorado. Necesita verificar que visualización se mantiene correcta"
Archivos: ["src/data/barrios_optimizado.geojson"]
Acción esperada: Verificar renderizado y optimizar estilos si necesario
```

### **Tipo 2: Nueva Funcionalidad Implementada**
```
Descripción: "Implementada búsqueda por tipo de institución. Funcionalidad lista. Necesita mejorar UX de la interfaz de filtros"
Archivos: ["src/components/script.js", "index.html"]
Acción esperada: Diseñar mejor UX para filtros y mejorar feedback visual
```

### **Tipo 3: PWA Configurado**
```
Descripción: "Service Worker actualizado y manifiesto configurado. PWA funcional. Necesita revisar iconos y metadatos"
Archivos: ["sw.js", "manifest.json"]
Acción esperada: Optimizar iconos PWA y ajustar metadatos de presentación
```

## **🎨 UI/UX → 🔧 Backend**

### **Tipo 1: Diseño Completado**
```
Descripción: "Nuevo diseño responsive para sidebar implementado. Necesita ajustar lógica de JavaScript para nuevas interacciones"
Archivos: ["src/styles/styles.css", "index.html"]
Acción esperada: Implementar JavaScript para nuevas interacciones UI
```

### **Tipo 2: Assets Optimizados**
```
Descripción: "Iconos y imágenes optimizados, reducido 60% del peso. Actualizar referencias en código"
Archivos: ["src/assets/icons/", "src/assets/images/"]
Acción esperada: Actualizar referencias en JS y verificar carga correcta
```

### **Tipo 3: Mejoras de Accesibilidad**
```
Descripción: "Añadidos attributes ARIA y mejoras de contraste. Verificar que no afectan funcionalidad"
Archivos: ["index.html", "src/styles/styles.css"]
Acción esperada: Testing funcional y ajustar JavaScript si necesario
```

---

# ⚡ **COMANDOS RÁPIDOS DE COORDINACIÓN**

## **🔍 Estado Actual**
```bash
# Ver estado completo de coordinación
python scripts/coordination.py status
```

## **👤 Gestión de Agentes**
```bash
# Agente Backend empieza a trabajar
python scripts/coordination.py update-agent backend working "Optimizando datos GeoJSON" "30min"

# Agente UI/UX disponible
python scripts/coordination.py update-agent uiux available

# Agente bloqueado esperando handoff
python scripts/coordination.py update-agent backend blocked "" ""
```

## **🔒 Gestión de Archivos**
```bash
# Bloquear archivo para Backend
python scripts/coordination.py lock-file "src/components/script.js" backend

# Desbloquear archivo
python scripts/coordination.py unlock-file "src/components/script.js" backend

# Bloquear archivo compartido para UI/UX
python scripts/coordination.py lock-file "index.html" uiux
```

## **🔄 Gestión de Handoffs**
```bash
# Crear handoff Backend → UI/UX
python scripts/coordination.py create-handoff backend uiux "Optimización completada, necesita revisar UX"

# Aceptar handoff como UI/UX
python scripts/coordination.py accept-handoff backend_to_uiux_20250910_143022 uiux

# Completar handoff
python scripts/coordination.py complete-handoff backend_to_uiux_20250910_143022 uiux "UX mejorado según especificaciones"
```

---

# 📊 **MÉTRICAS DE COORDINACIÓN**

## **KPIs de Eficiencia**
- ⏱️ **Tiempo promedio de handoff:** <30 minutos
- 🔄 **Handoffs completados/día:** Objetivo 3-5
- 🔒 **Tiempo de archivos bloqueados:** <2 horas
- ❌ **Conflictos de archivos:** 0 por día
- ✅ **Tasks completadas sin rollback:** >95%

## **Señales de Alerta**
- 🚨 Archivo bloqueado >4 horas
- 🚨 Handoff pendiente >24 horas  
- 🚨 Ambos agentes trabajando en archivos compartidos
- 🚨 >2 rollbacks en un día

---

# 🎯 **EJEMPLOS DE COORDINACIÓN PRÁCTICA**

## **Escenario 1: Optimización de Performance**

### **Backend Inicia:**
1. `python scripts/coordination.py update-agent backend working "Optimizando GeoJSON" "45min"`
2. `python scripts/coordination.py lock-file "src/data/barrios_optimizado.geojson" backend`
3. Backend optimiza datos, reduce tamaño de archivo
4. Backend valida que mapa sigue funcionando
5. `python scripts/coordination.py create-handoff backend uiux "Datos optimizados 40%. Verificar que renderizado visual se mantiene correcto"`
6. `python scripts/coordination.py unlock-file "src/data/barrios_optimizado.geojson" backend`

### **UI/UX Continúa:**
1. `python scripts/coordination.py accept-handoff backend_to_uiux_20250910_143022 uiux`
2. `python scripts/coordination.py update-agent uiux working "Verificando impacto visual" "20min"`
3. UI/UX verifica renderizado, nota que algunos colores cambiaron
4. `python scripts/coordination.py lock-file "src/styles/styles.css" uiux`
5. UI/UX ajusta estilos para mantener consistencia visual
6. `python scripts/coordination.py complete-handoff backend_to_uiux_20250910_143022 uiux "Estilos ajustados, renderizado correcto mantenido"`

## **Escenario 2: Nueva Feature de UI**

### **UI/UX Inicia:**
1. `python scripts/coordination.py update-agent uiux working "Diseñando panel de filtros avanzados" "1h"`
2. `python scripts/coordination.py lock-file "src/styles/styles.css" uiux`
3. `python scripts/coordination.py lock-file "index.html" uiux`
4. UI/UX crea mockup visual del panel de filtros
5. UI/UX implementa HTML y CSS estático
6. `python scripts/coordination.py create-handoff uiux backend "Panel de filtros diseñado. Necesita implementar lógica de filtrado por categoría y ubicación"`

### **Backend Continúa:**
1. `python scripts/coordination.py accept-handoff uiux_to_backend_20250910_150000 backend`
2. `python scripts/coordination.py update-agent backend working "Implementando lógica de filtros" "1h30m"`
3. `python scripts/coordination.py lock-file "src/components/script.js" backend`
4. Backend implementa JavaScript para filtros
5. Backend prueba funcionamiento con diseño UI/UX
6. `python scripts/coordination.py complete-handoff uiux_to_backend_20250910_150000 backend "Filtros funcionando con datos reales"`

---

# 🚨 **PROTOCOLOS DE EMERGENCIA**

## **Conflicto de Archivos**
Si dos agentes necesitan el mismo archivo:
1. **STOP** - No proceder con modificaciones
2. Verificar estado: `python scripts/coordination.py status`
3. Comunicarse a través de handoff para priorizar
4. Agente con mayor prioridad procede primero
5. Crear handoff al completar

## **Handoff Abandonado**
Si handoff >24 horas sin respuesta:
1. Verificar estado del agente receptor
2. Si disponible pero no responde: crear nuevo handoff
3. Si bloqueado: esperar o reasignar prioridades
4. Documentar en notas del handoff

## **Rollback por Coordinación**
Si cambio de un agente rompe trabajo del otro:
1. Identificar archivo/cambio problemático
2. Rollback inmediato
3. Crear handoff de coordinación urgente
4. Re-planificar cambio con mejor coordinación

---

**🎯 PRINCIPIO FUNDAMENTAL:** *"La comunicación es clave. Mejor sobrecomunicar que causar conflictos."*

---

*Matriz creada para garantizar flujo eficiente entre Backend y UI/UX en EduMap Barranquilla.*