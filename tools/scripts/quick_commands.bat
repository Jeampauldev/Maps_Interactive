@echo off
REM ⚡ COMANDOS RÁPIDOS - EduMap Barranquilla
REM Scripts para ejecutar tareas comunes de desarrollo de forma rápida

echo.
echo ===============================================
echo ⚡ COMANDOS RÁPIDOS - EduMap Barranquilla
echo ===============================================
echo.

:menu
echo Selecciona una opción:
echo.
echo [1] 💾 Crear BACKUP del proyecto
echo [2] 🛡️  VALIDAR integridad del mapa
echo [3] 🚀 ABRIR mapa en navegador
echo [4] 📁 Abrir proyecto en explorador
echo [5] 🔧 Ver ESTRUCTURA de archivos
echo [6] 📊 Ver TAMAÑO del proyecto
echo [7] 🗑️  LIMPIAR archivos temporales
echo [8] ⚙️  CONFIGURAR ambiente de desarrollo
echo [9] 📱 Ejecutar server local (Python)
echo [A] 🤝 COORDINACIÓN de agentes
echo [0] ❌ Salir
echo.

set /p option="Ingresa tu opción (0-9): "

if "%option%"=="1" goto backup
if "%option%"=="2" goto validate
if "%option%"=="3" goto open_browser
if "%option%"=="4" goto open_explorer
if "%option%"=="5" goto show_structure
if "%option%"=="6" goto show_size
if "%option%"=="7" goto cleanup
if "%option%"=="8" goto setup_dev
if "%option%"=="9" goto local_server
if /i "%option%"=="A" goto coordination
if "%option%"=="0" goto exit

echo ❌ Opción inválida. Intenta de nuevo.
echo.
pause
cls
goto menu

:backup
echo.
echo 💾 Creando backup del proyecto...
echo =====================================
python "%~dp0backup_project.py" "C:\02_Repositorio\Mapa"
if %errorlevel% equ 0 (
    echo.
    echo ✅ BACKUP CREADO EXITOSAMENTE
    echo 📁 Verifica en: C:\02_Repositorio\
) else (
    echo.
    echo ❌ ERROR: Falló la creación del backup
    echo 💡 Verifica que Python esté instalado y funcionando
)
echo.
pause
cls
goto menu

:validate
echo.
echo 🛡️  Validando integridad del mapa...
echo ====================================
python "%~dp0validate_map.py" "C:\02_Repositorio\Mapa"
if %errorlevel% equ 0 (
    echo.
    echo ✅ VALIDACIÓN COMPLETADA - MAPA OK
) else (
    echo.
    echo ⚠️  VALIDACIÓN COMPLETADA - HAY ISSUES
    echo 🔧 Revisa los errores reportados arriba
)
echo.
pause
cls
goto menu

:open_browser
echo.
echo 🚀 Abriendo mapa en navegador...
echo ===============================
start "" "C:\02_Repositorio\Mapa\index.html"
echo ✅ Mapa abierto en navegador predeterminado
echo 💡 Si no abre, navega manualmente a: C:\02_Repositorio\Mapa\index.html
echo.
pause
cls
goto menu

:open_explorer
echo.
echo 📁 Abriendo proyecto en explorador...
echo ====================================
start "" "C:\02_Repositorio\Mapa"
echo ✅ Explorador de archivos abierto
echo.
pause
cls
goto menu

:show_structure
echo.
echo 🔧 Estructura del proyecto:
echo ===========================
tree "C:\02_Repositorio\Mapa" /F /A
echo.
pause
cls
goto menu

:show_size
echo.
echo 📊 Analizando tamaño del proyecto...
echo ===================================
for /f "tokens=3" %%a in ('dir "C:\02_Repositorio\Mapa" /s /-c ^| find "File(s)"') do (
    echo 📁 Tamaño total: %%a bytes
)
echo.
echo 📂 Tamaños por carpeta:
for /d %%d in ("C:\02_Repositorio\Mapa\*") do (
    echo.
    echo 📁 %%~nd:
    for /f "tokens=3" %%s in ('dir "%%d" /s /-c 2^>nul ^| find "File(s)"') do echo   %%s bytes
)
echo.
pause
cls
goto menu

:cleanup
echo.
echo 🗑️  Limpiando archivos temporales...
echo ===================================
echo.

REM Eliminar archivos .bak
echo Eliminando archivos .bak...
for /r "C:\02_Repositorio\Mapa" %%f in (*.bak) do (
    echo   Eliminando: %%f
    del "%%f" 2>nul
)

REM Eliminar archivos .tmp
echo Eliminando archivos .tmp...
for /r "C:\02_Repositorio\Mapa" %%f in (*.tmp) do (
    echo   Eliminando: %%f
    del "%%f" 2>nul
)

REM Eliminar Thumbs.db
echo Eliminando Thumbs.db...
for /r "C:\02_Repositorio\Mapa" %%f in (Thumbs.db) do (
    echo   Eliminando: %%f
    del "%%f" 2>nul
)

REM Eliminar .DS_Store (si existe)
echo Eliminando .DS_Store...
for /r "C:\02_Repositorio\Mapa" %%f in (.DS_Store) do (
    echo   Eliminando: %%f
    del "%%f" 2>nul
)

echo.
echo ✅ LIMPIEZA COMPLETADA
echo 🧹 Archivos temporales eliminados
echo.
pause
cls
goto menu

:setup_dev
echo.
echo ⚙️  Configurando ambiente de desarrollo...
echo =========================================
echo.

REM Verificar Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python no está instalado o no está en PATH
    echo 💡 Instala Python desde: https://python.org/downloads/
    echo.
) else (
    echo ✅ Python detectado: 
    python --version
    echo.
)

REM Verificar navegador
echo 🌐 Navegadores disponibles:
where chrome >nul 2>&1 && echo ✅ Google Chrome
where firefox >nul 2>&1 && echo ✅ Firefox
where msedge >nul 2>&1 && echo ✅ Microsoft Edge
echo.

REM Verificar editor de código
echo 📝 Editores de código:
where code >nul 2>&1 && echo ✅ Visual Studio Code
where notepad++ >nul 2>&1 && echo ✅ Notepad++
where sublime_text >nul 2>&1 && echo ✅ Sublime Text
echo.

echo 📋 Configuración recomendada:
echo   1. ✅ Tener Python instalado para scripts de validación/backup
echo   2. ✅ Usar Chrome/Firefox con DevTools para testing
echo   3. ✅ Configurar Live Server o similar para desarrollo local
echo   4. ✅ Tener editor con syntax highlighting para HTML/CSS/JS
echo.

pause
cls
goto menu

:local_server
echo.
echo 📱 Iniciando servidor local...
echo =============================
echo.
cd /d "C:\02_Repositorio\Mapa"

REM Verificar si Python está disponible
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: Python no está instalado o no está en PATH
    echo.
    echo 💡 Alternativas:
    echo   1. Instalar Python: https://python.org/downloads/
    echo   2. Usar Live Server extension en VS Code
    echo   3. Usar cualquier servidor local HTTP
    echo.
    pause
    cls
    goto menu
)

echo ✅ Python detectado. Iniciando servidor HTTP local...
echo.
echo 🌐 El mapa estará disponible en:
echo    http://localhost:8000
echo    http://127.0.0.1:8000
echo.
echo ⚠️  NOTA: Para detener el servidor presiona Ctrl+C
echo.

REM Intentar abrir el navegador automáticamente
timeout /t 3 /nobreak >nul
start "" "http://localhost:8000"

REM Iniciar servidor Python
python -m http.server 8000

echo.
echo 🔌 Servidor detenido
pause
cls
goto menu

:coordination
echo.
echo 🤝 Sistema de coordinación de agentes...
echo ========================================
echo.
echo Selecciona una opción de coordinación:
echo.
echo [1] 📊 Ver estado actual
echo [2] 🔧 Agente Backend - Trabajando
echo [3] 🔧 Agente Backend - Disponible
echo [4] 🎨 Agente UI/UX - Trabajando
echo [5] 🎨 Agente UI/UX - Disponible
echo [6] 🔄 Crear handoff Backend → UI/UX
echo [7] 🔄 Crear handoff UI/UX → Backend
echo [8] 📖 Abrir documentación de coordinación
echo [0] ⬅️  Volver al menú principal
echo.

set /p coord_option="Ingresa tu opción (0-8): "

if "%coord_option%"=="1" goto coord_status
if "%coord_option%"=="2" goto coord_backend_working
if "%coord_option%"=="3" goto coord_backend_available
if "%coord_option%"=="4" goto coord_uiux_working
if "%coord_option%"=="5" goto coord_uiux_available
if "%coord_option%"=="6" goto coord_handoff_be_to_ui
if "%coord_option%"=="7" goto coord_handoff_ui_to_be
if "%coord_option%"=="8" goto coord_docs
if "%coord_option%"=="0" goto coord_back

echo ❌ Opción inválida.
echo.
pause
goto coordination

:coord_status
echo.
echo 📊 Estado actual de coordinación:
echo ====================================
python "%~dp0coordination.py" status
echo.
pause
goto coordination

:coord_backend_working
echo.
set /p task="Ingresa la tarea del Backend: "
set /p eta="Ingresa ETA (ej: 30min, 1h): "
echo.
echo 🔧 Actualizando estado Backend...
python "%~dp0coordination.py" update-agent backend working "%task%" "%eta%"
echo.
pause
goto coordination

:coord_backend_available
echo.
echo 🔧 Marcando Backend como disponible...
python "%~dp0coordination.py" update-agent backend available
echo.
pause
goto coordination

:coord_uiux_working
echo.
set /p task="Ingresa la tarea del UI/UX: "
set /p eta="Ingresa ETA (ej: 30min, 1h): "
echo.
echo 🎨 Actualizando estado UI/UX...
python "%~dp0coordination.py" update-agent uiux working "%task%" "%eta%"
echo.
pause
goto coordination

:coord_uiux_available
echo.
echo 🎨 Marcando UI/UX como disponible...
python "%~dp0coordination.py" update-agent uiux available
echo.
pause
goto coordination

:coord_handoff_be_to_ui
echo.
set /p description="Descripción del handoff Backend → UI/UX: "
echo.
echo 🔄 Creando handoff Backend → UI/UX...
python "%~dp0coordination.py" create-handoff backend uiux "%description%"
echo.
echo 💡 TIP: UI/UX debe aceptar el handoff con:
echo    python scripts/coordination.py accept-handoff [handoff_id] uiux
echo.
pause
goto coordination

:coord_handoff_ui_to_be
echo.
set /p description="Descripción del handoff UI/UX → Backend: "
echo.
echo 🔄 Creando handoff UI/UX → Backend...
python "%~dp0coordination.py" create-handoff uiux backend "%description%"
echo.
echo 💡 TIP: Backend debe aceptar el handoff con:
echo    python scripts/coordination.py accept-handoff [handoff_id] backend
echo.
pause
goto coordination

:coord_docs
echo.
echo 📖 Abriendo documentación de coordinación...
start "" "C:\02_Repositorio\Mapa\AGENT_COORDINATION_MATRIX.md"
echo ✅ Documentación abierta
echo.
pause
goto coordination

:coord_back
cls
goto menu

:exit
echo.
echo 👋 ¡Hasta luego!
echo.
echo 🚀 Tips para desarrollo eficiente:
echo   • Usa el backup (opción 1) antes de cambios importantes
echo   • Valida siempre (opción 2) después de modificaciones  
echo   • Mantén el servidor local (opción 9) corriendo durante desarrollo
echo   • Consulta CHECKLIST_MANUAL_TESTING.md para testing completo
echo.
exit /b 0
