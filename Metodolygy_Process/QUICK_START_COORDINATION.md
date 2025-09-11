# 🚀 Quick Start - Sistema de Coordinación de Agentes

**Objetivo:** Empezar a usar el sistema de coordinación en menos de 5 minutos

---

## ⚡ **INICIO RÁPIDO**

### **Paso 1: Ejecutar el Menú Principal**
```bash
# Abrir comandos rápidos
C:\02_Repositorio\Mapa\scripts\quick_commands.bat

# Seleccionar opción [A] - COORDINACIÓN de agentes
```

### **Paso 2: Verificar Estado Inicial**
```bash
# En el menú de coordinación, opción [1] - Ver estado actual
# Esto muestra si hay agentes trabajando o archivos bloqueados
```

---

# 🎯 **WORKFLOWS BÁSICOS**

## **🔧 Como Agente Backend:**

### **1. Empezar a Trabajar**
```bash
# Opción [2] en menú coordinación
# Ingresar: "Optimizando datos GeoJSON"
# ETA: "45min"
```

### **2. Bloquear Archivos (Manual)**
```bash
python scripts/coordination.py lock-file "src/data/barrios_optimizado.geojson" backend
python scripts/coordination.py lock-file "src/components/script.js" backend
```

### **3. Al Completar Trabajo - Crear Handoff**
```bash
# Opción [6] en menú coordinación
# Descripción: "Datos optimizados 40%. Verificar renderizado visual"
```

### **4. Marcar como Disponible**
```bash
# Opción [3] en menú coordinación
```

## **🎨 Como Agente UI/UX:**

### **1. Empezar a Trabajar**
```bash
# Opción [4] en menú coordinación  
# Ingresar: "Mejorando diseño responsive"
# ETA: "1h"
```

### **2. Aceptar Handoff de Backend**
```bash
# Ver handoffs pendientes con opción [1]
# Copiar handoff_id del reporte
python scripts/coordination.py accept-handoff backend_to_uiux_20250910_143022 uiux
```

### **3. Al Completar - Completar Handoff**
```bash
python scripts/coordination.py complete-handoff backend_to_uiux_20250910_143022 uiux "Renderizado verificado y optimizado"
```

### **4. Crear Handoff hacia Backend**
```bash
# Opción [7] en menú coordinación
# Descripción: "Nuevo diseño completado. Implementar funcionalidad JS"
```

---

# 📋 **COMANDOS ESENCIALES**

## **🔍 Monitoreo**
```bash
# Ver estado completo
python scripts/coordination.py status

# Solo estado de agentes
python scripts/coordination.py status | findstr AGENTES -A 10
```

## **👤 Gestión de Agente**
```bash
# Backend trabajando
python scripts/coordination.py update-agent backend working "Mi tarea" "30min"

# UI/UX disponible
python scripts/coordination.py update-agent uiux available

# Agente bloqueado
python scripts/coordination.py update-agent backend blocked
```

## **🔒 Gestión de Archivos**
```bash
# Bloquear archivo exclusivo
python scripts/coordination.py lock-file "src/components/script.js" backend

# Bloquear archivo compartido
python scripts/coordination.py lock-file "index.html" uiux

# Desbloquear cuando termines
python scripts/coordination.py unlock-file "src/components/script.js" backend
```

## **🔄 Handoffs**
```bash
# Crear handoff
python scripts/coordination.py create-handoff backend uiux "Descripción del trabajo completado"

# Aceptar handoff
python scripts/coordination.py accept-handoff [handoff_id] uiux

# Completar handoff
python scripts/coordination.py complete-handoff [handoff_id] uiux "Trabajo completado exitosamente"
```

---

# 🎨 **EJEMPLOS PRÁCTICOS**

## **Ejemplo 1: Backend Optimiza Datos**

### **Backend:**
```bash
# 1. Actualizar estado
python scripts/coordination.py update-agent backend working "Optimizando GeoJSON" "30min"

# 2. Bloquear archivos
python scripts/coordination.py lock-file "src/data/barrios_optimizado.geojson" backend

# 3. [TRABAJO: optimizar archivo GeoJSON]

# 4. Crear handoff
python scripts/coordination.py create-handoff backend uiux "GeoJSON optimizado, reducido 40% tamaño. Verificar que visualización se mantiene"

# 5. Desbloquear y disponible
python scripts/coordination.py unlock-file "src/data/barrios_optimizado.geojson" backend
python scripts/coordination.py update-agent backend available
```

### **UI/UX:**
```bash
# 1. Ver handoffs pendientes
python scripts/coordination.py status

# 2. Aceptar handoff
python scripts/coordination.py accept-handoff backend_to_uiux_20250910_143022 uiux

# 3. Actualizar estado
python scripts/coordination.py update-agent uiux working "Verificando renderizado" "15min"

# 4. [TRABAJO: verificar que el mapa se ve bien]

# 5. Completar handoff
python scripts/coordination.py complete-handoff backend_to_uiux_20250910_143022 uiux "Renderizado verificado OK"

# 6. Marcar disponible
python scripts/coordination.py update-agent uiux available
```

## **Ejemplo 2: UI/UX Diseña Interfaz**

### **UI/UX:**
```bash
# 1. Estado trabajando
python scripts/coordination.py update-agent uiux working "Rediseñando panel filtros" "1h"

# 2. Bloquear archivos
python scripts/coordination.py lock-file "src/styles/styles.css" uiux
python scripts/coordination.py lock-file "index.html" uiux

# 3. [TRABAJO: crear nuevo diseño]

# 4. Crear handoff
python scripts/coordination.py create-handoff uiux backend "Diseño de filtros completado. Implementar lógica JS"

# 5. Desbloquear CSS (mantener HTML para Backend)
python scripts/coordination.py unlock-file "src/styles/styles.css" uiux
```

### **Backend:**
```bash
# 1. Aceptar handoff
python scripts/coordination.py accept-handoff uiux_to_backend_20250910_150000 backend

# 2. Estado trabajando
python scripts/coordination.py update-agent backend working "Implementando filtros JS" "45min"

# 3. Bloquear archivos
python scripts/coordination.py lock-file "src/components/script.js" backend

# 4. [TRABAJO: implementar JavaScript]

# 5. Completar handoff
python scripts/coordination.py complete-handoff uiux_to_backend_20250910_150000 backend "Filtros implementados y funcionando"

# 6. Desbloquear archivos
python scripts/coordination.py unlock-file "src/components/script.js" backend
python scripts/coordination.py unlock-file "index.html" backend  # Para UI/UX

# 7. Disponible
python scripts/coordination.py update-agent backend available
```

---

# 🚨 **TROUBLESHOOTING**

## **Error: Archivo ya bloqueado**
```bash
# Ver quién tiene el archivo
python scripts/coordination.py status

# Si es tuyo, desbloquearlo
python scripts/coordination.py unlock-file "archivo.js" tu_agente

# Si es del otro agente, esperar o crear handoff urgente
```

## **Error: Handoff no encontrado**
```bash
# Verificar handoffs activos
python scripts/coordination.py status

# Usar el handoff_id exacto del reporte
# Formato: agente_to_agente_YYYYMMDD_HHMMSS
```

## **Error: Solo puedes desbloquear tus archivos**
```bash
# Solo el agente que bloquea puede desbloquear
# Backend solo desbloquea archivos que Backend bloqueó
# UI/UX solo desbloquea archivos que UI/UX bloqueó
```

## **Resetear Estado de Emergencia**
```bash
# Si algo se rompe, eliminar archivo de coordinación
del "C:\02_Repositorio\Mapa\.coordination.json"

# Empezar limpio - todos los agentes disponibles
python scripts/coordination.py status
```

---

# 🎯 **REGLAS DE ORO**

## **✅ HACER**
- Siempre actualizar estado antes de trabajar
- Bloquear archivos que vas a modificar
- Crear handoffs descriptivos
- Desbloquear archivos cuando termines
- Verificar estado regularmente

## **❌ NO HACER**
- Modificar archivos bloqueados por otro agente
- Dejar archivos bloqueados por horas sin usar
- Ignorar handoffs pendientes por más de 24h
- Modificar archivos compartidos sin coordinación

## **🚨 ARCHIVOS CRÍTICOS**
- `index.html` - **COMPARTIDO** - Coordinación obligatoria
- `manifest.json` - **COMPARTIDO** - Coordinación obligatoria
- `src/components/script.js` - Solo Backend
- `src/styles/styles.css` - Solo UI/UX

---

# 📊 **DASHBOARD DE ESTADO**

Para monitoreo continuo, puedes dejar corriendo:

```bash
# Windows: Actualizar estado cada 30 segundos
:loop
cls
python scripts/coordination.py status
timeout /t 30 /nobreak >nul
goto loop
```

```bash
# O simplemente verificar cuando necesites
python scripts/coordination.py status
```

---

# 💡 **TIPS AVANZADOS**

## **Workflow Eficiente**
1. **Al empezar el día:** Verificar estado y handoffs pendientes
2. **Antes de trabajar:** Actualizar estado y bloquear archivos
3. **Durante el trabajo:** No tocar archivos de otro agente
4. **Al completar:** Crear handoff descriptivo y desbloquear
5. **Al final del día:** Marcar disponible y cerrar handoffs

## **Comunicación Clara**
```bash
# Buenos ejemplos de descripciones:
"Datos GeoJSON optimizados 40%. Verificar renderizado visual"
"Panel de filtros diseñado. Implementar lógica de búsqueda avanzada"
"Service Worker actualizado. Revisar iconos PWA"

# Malos ejemplos:
"Terminé"
"Cambios hechos"
"Revisar"
```

---

**🎯 RECUERDA:** *El sistema está diseñado para evitar conflictos, no para crear burocracia. Úsalo para coordinar mejor, no para complicar el trabajo.*

---

*Quick Start creado para maximizar eficiencia de coordinación en EduMap Barranquilla.*