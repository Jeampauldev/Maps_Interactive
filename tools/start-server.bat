@echo off
echo =====================================
echo    SERVIDOR LOCAL - MAPA BARRANQUILLA
echo =====================================
echo.
echo Selecciona una opcion:
echo.
echo [1] Python Server (Simple) - Puerto 8080
echo [2] Live Server (Auto-reload) - Puerto 8080  
echo [3] HTTP Server (CORS habilitado) - Puerto 8080
echo [4] Abrir solo en navegador (si ya esta corriendo)
echo [5] Salir
echo.
set /p choice="Tu eleccion (1-5): "

if "%choice%"=="1" (
    echo.
    echo Iniciando Python HTTP Server...
    echo Abre tu navegador en: http://localhost:8080
    echo Presiona Ctrl+C para detener
    echo.
    python -m http.server 8080
)

if "%choice%"=="2" (
    echo.
    echo Iniciando Live Server (con auto-reload)...
    echo Se abrira automaticamente en tu navegador
    echo Presiona Ctrl+C para detener
    echo.
    live-server --port=8080 --open=/index.html
)

if "%choice%"=="3" (
    echo.
    echo Iniciando HTTP Server con CORS...
    echo Se abrira automaticamente en tu navegador
    echo Presiona Ctrl+C para detener
    echo.
    http-server -p 8080 -c-1 --cors -o
)

if "%choice%"=="4" (
    echo.
    echo Abriendo navegador en http://localhost:8080
    start http://localhost:8080
    pause
)

if "%choice%"=="5" (
    echo.
    echo Saliendo...
    exit
)

echo.
echo Opcion no valida. Intenta de nuevo.
pause
goto start