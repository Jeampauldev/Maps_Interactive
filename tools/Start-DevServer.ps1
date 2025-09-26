# Script PowerShell para iniciar servidor de desarrollo
# Mapa Interactivo de Barranquilla

param(
    [string]$ServerType = "python",
    [int]$Port = 8080,
    [switch]$Open
)

function Show-Banner {
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host "   SERVIDOR DE DESARROLLO - MAPA BARRANQUILLA" -ForegroundColor Green
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host ""
}

function Test-Prerequisites {
    $python = Get-Command python -ErrorAction SilentlyContinue
    $node = Get-Command node -ErrorAction SilentlyContinue
    $httpServer = Get-Command http-server -ErrorAction SilentlyContinue
    $liveServer = Get-Command live-server -ErrorAction SilentlyContinue

    Write-Host "🔍 Verificando herramientas disponibles:" -ForegroundColor Yellow
    Write-Host "   Python: $(if($python) { '✅ Disponible' } else { '❌ No encontrado' })"
    Write-Host "   Node.js: $(if($node) { '✅ Disponible' } else { '❌ No encontrado' })"
    Write-Host "   http-server: $(if($httpServer) { '✅ Disponible' } else { '❌ No encontrado' })"
    Write-Host "   live-server: $(if($liveServer) { '✅ Disponible' } else { '❌ No encontrado' })"
    Write-Host ""
}

function Start-PythonServer {
    param([int]$Port)
    Write-Host "🐍 Iniciando Python HTTP Server en puerto $Port..." -ForegroundColor Green
    Write-Host "📍 URL: http://localhost:$Port" -ForegroundColor Cyan
    Write-Host "⚡ Presiona Ctrl+C para detener" -ForegroundColor Yellow
    Write-Host ""
    
    if ($Open) {
        Start-Process "http://localhost:$Port"
    }
    
    python -m http.server $Port
}

function Start-LiveServer {
    param([int]$Port)
    Write-Host "🔴 Iniciando Live Server en puerto $Port..." -ForegroundColor Green
    Write-Host "📍 URL: http://localhost:$Port" -ForegroundColor Cyan
    Write-Host "🔄 Auto-reload habilitado" -ForegroundColor Yellow
    Write-Host ""
    
    $openFlag = if ($Open) { "--open=/index.html" } else { "--no-browser" }
    live-server --port=$Port $openFlag
}

function Start-HttpServer {
    param([int]$Port)
    Write-Host "⚡ Iniciando HTTP Server en puerto $Port..." -ForegroundColor Green
    Write-Host "📍 URL: http://localhost:$Port" -ForegroundColor Cyan
    Write-Host "🌐 CORS habilitado" -ForegroundColor Yellow
    Write-Host ""
    
    $openFlag = if ($Open) { "-o" } else { "" }
    http-server -p $Port -c-1 --cors $openFlag
}

function Show-Menu {
    Write-Host "Selecciona el tipo de servidor:" -ForegroundColor Yellow
    Write-Host "1. Python HTTP Server (simple)" -ForegroundColor White
    Write-Host "2. Live Server (auto-reload)" -ForegroundColor White  
    Write-Host "3. HTTP Server (CORS)" -ForegroundColor White
    Write-Host "4. Abrir navegador solamente" -ForegroundColor White
    Write-Host "5. Salir" -ForegroundColor Red
    Write-Host ""
    
    $choice = Read-Host "Tu elección (1-5)"
    return $choice
}

# Ejecutar script principal
Show-Banner
Test-Prerequisites

if ($ServerType -eq "menu") {
    do {
        $choice = Show-Menu
        
        switch ($choice) {
            "1" { Start-PythonServer -Port $Port }
            "2" { Start-LiveServer -Port $Port }
            "3" { Start-HttpServer -Port $Port }
            "4" { 
                Write-Host "🌐 Abriendo navegador..." -ForegroundColor Green
                Start-Process "http://localhost:$Port"
            }
            "5" { 
                Write-Host "👋 Saliendo..." -ForegroundColor Yellow
                exit 
            }
            default { Write-Host "❌ Opción no válida" -ForegroundColor Red }
        }
    } while ($choice -ne "5")
}
else {
    switch ($ServerType.ToLower()) {
        "python" { Start-PythonServer -Port $Port }
        "live" { Start-LiveServer -Port $Port }
        "http" { Start-HttpServer -Port $Port }
        default { 
            Write-Host "❌ Tipo de servidor no válido. Usa: python, live, o http" -ForegroundColor Red
            Show-Menu
        }
    }
}

# Ejemplos de uso:
# .\Start-DevServer.ps1 -ServerType python -Port 8080 -Open
# .\Start-DevServer.ps1 -ServerType live
# .\Start-DevServer.ps1 -ServerType menu