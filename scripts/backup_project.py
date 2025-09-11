#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
💾 SCRIPT DE BACKUP AUTOMÁTICO - EduMap Barranquilla
Crea copias de seguridad del proyecto antes de modificaciones
"""

import os
import shutil
import sys
from datetime import datetime
from pathlib import Path

# Colores para output
class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    BOLD = '\033[1m'
    END = '\033[0m'

def print_status(message, status="INFO"):
    colors = {
        "SUCCESS": Colors.GREEN,
        "ERROR": Colors.RED,
        "WARNING": Colors.YELLOW,
        "INFO": Colors.BLUE
    }
    print(f"{colors.get(status, '')}{Colors.BOLD}[{status}]{Colors.END} {message}")

class ProjectBackup:
    def __init__(self, project_path="C:/02_Repositorio/Mapa"):
        self.project_path = Path(project_path)
        self.project_name = self.project_path.name
        self.parent_dir = self.project_path.parent
        
        # Generar nombre de backup con timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        self.backup_name = f"{self.project_name}_backup_{timestamp}"
        self.backup_path = self.parent_dir / self.backup_name
        
    def get_directory_size(self, path):
        """Calcula el tamaño total del directorio"""
        total_size = 0
        try:
            for root, dirs, files in os.walk(path):
                for file in files:
                    file_path = os.path.join(root, file)
                    if os.path.exists(file_path):
                        total_size += os.path.getsize(file_path)
        except OSError as e:
            print_status(f"Error calculando tamaño: {e}", "WARNING")
        return total_size
    
    def format_size(self, size_bytes):
        """Formatea el tamaño en bytes a una unidad legible"""
        if size_bytes == 0:
            return "0 B"
        size_names = ["B", "KB", "MB", "GB"]
        i = 0
        while size_bytes >= 1024 and i < len(size_names) - 1:
            size_bytes /= 1024.0
            i += 1
        return f"{size_bytes:.1f} {size_names[i]}"
    
    def should_exclude_item(self, item_name):
        """Determina si un elemento debe excluirse del backup"""
        exclude_patterns = [
            '.git',           # Control de versiones Git
            '__pycache__',    # Cache de Python
            '.pyc',           # Archivos compilados Python
            'node_modules',   # Dependencias de Node.js
            '.env',           # Archivos de entorno
            '.DS_Store',      # Archivos de macOS
            'Thumbs.db',      # Archivos de Windows
            '*.tmp',          # Archivos temporales
            '*.log',          # Archivos de log
            '.vscode',        # Configuración VS Code
            '.idea',          # Configuración IntelliJ
            'scripts/*.bak'   # Archivos de backup anteriores
        ]
        
        for pattern in exclude_patterns:
            if pattern in item_name or item_name.endswith(pattern.replace('*', '')):
                return True
        return False
    
    def copy_with_exclusions(self, src, dst):
        """Copia el proyecto excluyendo archivos/directorios innecesarios"""
        print_status(f"Copiando proyecto de {src} a {dst}...", "INFO")
        
        try:
            # Crear directorio destino
            dst.mkdir(parents=True, exist_ok=True)
            
            copied_files = 0
            excluded_files = 0
            
            for root, dirs, files in os.walk(src):
                # Filtrar directorios excluidos
                dirs[:] = [d for d in dirs if not self.should_exclude_item(d)]
                
                # Crear estructura de directorios
                rel_root = Path(root).relative_to(src)
                current_dst_dir = dst / rel_root
                current_dst_dir.mkdir(parents=True, exist_ok=True)
                
                # Copiar archivos
                for file in files:
                    if self.should_exclude_item(file):
                        excluded_files += 1
                        continue
                    
                    src_file = Path(root) / file
                    dst_file = current_dst_dir / file
                    
                    try:
                        shutil.copy2(src_file, dst_file)
                        copied_files += 1
                    except Exception as e:
                        print_status(f"Error copiando {file}: {e}", "WARNING")
            
            print_status(f"✅ {copied_files} archivos copiados", "SUCCESS")
            if excluded_files > 0:
                print_status(f"⚠️  {excluded_files} archivos excluidos", "WARNING")
                
            return True
            
        except Exception as e:
            print_status(f"Error durante la copia: {e}", "ERROR")
            return False
    
    def create_backup_info(self):
        """Crea un archivo de información sobre el backup"""
        info_content = f"""🛡️ BACKUP INFORMATION - EduMap Barranquilla
========================================

Backup creado: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
Proyecto origen: {self.project_path}
Directorio backup: {self.backup_path}

PROPÓSITO:
Este backup fue creado automáticamente antes de realizar modificaciones
al proyecto EduMap Barranquilla para garantizar la recuperación rápida
en caso de errores durante el desarrollo.

INSTRUCCIONES DE RESTAURACIÓN:
1. Si hay problemas con el proyecto actual:
   - Eliminar o renombrar el directorio del proyecto actual
   - Copiar este backup al directorio original
   - Verificar que funciona correctamente

2. Comando de restauración rápida:
   rm -rf "{self.project_path}"
   cp -r "{self.backup_path}" "{self.project_path}"

NOTAS:
- Este backup excluye archivos temporales y de desarrollo
- Contiene solo los archivos esenciales del proyecto
- Verificar funcionalidad después de restaurar

========================================
Generado por el sistema de backup automático
"""
        
        info_file = self.backup_path / "BACKUP_INFO.txt"
        try:
            with open(info_file, 'w', encoding='utf-8') as f:
                f.write(info_content)
            return True
        except Exception as e:
            print_status(f"Error creando archivo de información: {e}", "WARNING")
            return False
    
    def create_backup(self):
        """Crea el backup completo del proyecto"""
        print_status("=" * 60, "INFO")
        print_status("💾 INICIANDO BACKUP DEL PROYECTO", "INFO")
        print_status("=" * 60, "INFO")
        
        # Verificar que el proyecto existe
        if not self.project_path.exists():
            print_status(f"❌ Directorio del proyecto no encontrado: {self.project_path}", "ERROR")
            return False
        
        # Mostrar información del proyecto
        project_size = self.get_directory_size(self.project_path)
        print_status(f"📁 Proyecto: {self.project_path}", "INFO")
        print_status(f"📊 Tamaño: {self.format_size(project_size)}", "INFO")
        print_status(f"💾 Backup destino: {self.backup_path}", "INFO")
        
        # Verificar espacio disponible (simplificado)
        try:
            free_space = shutil.disk_usage(self.parent_dir).free
            if project_size > free_space:
                print_status("❌ No hay suficiente espacio en disco para el backup", "ERROR")
                return False
        except:
            print_status("⚠️  No se pudo verificar el espacio en disco", "WARNING")
        
        # Crear backup
        if not self.copy_with_exclusions(self.project_path, self.backup_path):
            print_status("❌ Falló la creación del backup", "ERROR")
            return False
        
        # Crear archivo de información
        self.create_backup_info()
        
        # Verificar backup
        backup_size = self.get_directory_size(self.backup_path)
        print_status(f"✅ Backup creado exitosamente", "SUCCESS")
        print_status(f"📊 Tamaño backup: {self.format_size(backup_size)}", "SUCCESS")
        print_status(f"📁 Ubicación: {self.backup_path}", "SUCCESS")
        
        return True
    
    def list_existing_backups(self):
        """Lista los backups existentes del proyecto"""
        backup_pattern = f"{self.project_name}_backup_*"
        existing_backups = list(self.parent_dir.glob(backup_pattern))
        
        if not existing_backups:
            print_status("📭 No se encontraron backups existentes", "INFO")
            return []
        
        print_status(f"📚 Backups existentes ({len(existing_backups)}):", "INFO")
        backup_info = []
        
        for backup_dir in sorted(existing_backups, reverse=True):
            try:
                backup_size = self.get_directory_size(backup_dir)
                backup_time = backup_dir.stat().st_mtime
                backup_date = datetime.fromtimestamp(backup_time).strftime("%Y-%m-%d %H:%M:%S")
                
                print_status(f"  📁 {backup_dir.name} - {self.format_size(backup_size)} - {backup_date}", "INFO")
                backup_info.append({
                    'path': backup_dir,
                    'size': backup_size,
                    'date': backup_date
                })
            except Exception as e:
                print_status(f"  ❌ {backup_dir.name} - Error: {e}", "WARNING")
        
        return backup_info
    
    def cleanup_old_backups(self, keep_last=5):
        """Elimina backups antiguos manteniendo solo los más recientes"""
        existing_backups = self.list_existing_backups()
        
        if len(existing_backups) <= keep_last:
            print_status(f"📚 Manteniendo todos los {len(existing_backups)} backups (límite: {keep_last})", "INFO")
            return
        
        backups_to_delete = existing_backups[keep_last:]
        print_status(f"🗑️  Eliminando {len(backups_to_delete)} backups antiguos...", "INFO")
        
        for backup in backups_to_delete:
            try:
                shutil.rmtree(backup['path'])
                print_status(f"  ✅ Eliminado: {backup['path'].name}", "SUCCESS")
            except Exception as e:
                print_status(f"  ❌ Error eliminando {backup['path'].name}: {e}", "ERROR")

def main():
    """Función principal"""
    if len(sys.argv) > 1:
        project_path = sys.argv[1]
    else:
        project_path = "C:/02_Repositorio/Mapa"
    
    backup = ProjectBackup(project_path)
    
    # Mostrar backups existentes
    backup.list_existing_backups()
    
    # Crear nuevo backup
    success = backup.create_backup()
    
    if success:
        # Limpiar backups antiguos
        backup.cleanup_old_backups(keep_last=3)
        
        print_status("=" * 60, "INFO")
        print_status("🎉 BACKUP COMPLETADO EXITOSAMENTE", "SUCCESS")
        print_status("=" * 60, "INFO")
        
        return 0
    else:
        print_status("=" * 60, "INFO")
        print_status("❌ BACKUP FALLÓ", "ERROR")
        print_status("=" * 60, "INFO")
        
        return 1

if __name__ == "__main__":
    sys.exit(main())
