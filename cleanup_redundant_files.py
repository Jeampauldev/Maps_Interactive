#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para limpiar archivos redundantes después de la optimización
Elimina archivos KML y XML ya que tenemos el GeoJSON optimizado
"""

import os
import shutil
from pathlib import Path

def cleanup_redundant_files():
    """
    Limpia archivos redundantes del directorio de datos
    """
    data_dir = Path("src/data")
    
    # Archivos a eliminar (redundantes)
    files_to_remove = [
        "Barrios_de_Barranquilla_según_POT_20250910.kml",
        "Barrios_de_Barranquilla_según_POT_20250910.xml",
        "Barrios_de_Barranquilla_según_POT_20250910.geojson"  # El original sin nombres optimizados
    ]
    
    # Crear backup antes de eliminar
    backup_dir = Path("backup_data")
    if not backup_dir.exists():
        backup_dir.mkdir()
        print(f"📁 Directorio de backup creado: {backup_dir}")
    
    removed_files = []
    backed_up_files = []
    
    for filename in files_to_remove:
        file_path = data_dir / filename
        if file_path.exists():
            # Crear backup
            backup_path = backup_dir / filename
            try:
                shutil.copy2(file_path, backup_path)
                backed_up_files.append(filename)
                print(f"💾 Backup creado: {filename} -> {backup_path}")
                
                # Eliminar archivo original
                file_path.unlink()
                removed_files.append(filename)
                print(f"🗑️  Archivo eliminado: {filename}")
                
            except Exception as e:
                print(f"❌ Error procesando {filename}: {e}")
        else:
            print(f"⚠️  Archivo no encontrado: {filename}")
    
    # Mostrar resumen
    print("\n" + "="*50)
    print("📊 RESUMEN DE LIMPIEZA")
    print("="*50)
    print(f"✅ Archivos respaldados: {len(backed_up_files)}")
    print(f"🗑️  Archivos eliminados: {len(removed_files)}")
    
    if backed_up_files:
        print("\n📋 Archivos respaldados:")
        for file in backed_up_files:
            print(f"  - {file}")
    
    if removed_files:
        print("\n🗑️  Archivos eliminados:")
        for file in removed_files:
            print(f"  - {file}")
    
    # Verificar archivos restantes
    remaining_files = list(data_dir.glob("*"))
    print(f"\n📁 Archivos restantes en {data_dir}: {len(remaining_files)}")
    for file in remaining_files:
        if file.is_file():
            size_mb = file.stat().st_size / (1024 * 1024)
            print(f"  - {file.name} ({size_mb:.2f} MB)")
    
    print("\n✨ ¡Limpieza completada!")
    print("\n📝 Próximos pasos:")
    print("1. Verificar que la aplicación funciona correctamente")
    print("2. Probar la carga de barrios con nombres")
    print("3. Si todo funciona bien, eliminar el directorio backup_data")

def main():
    """
    Función principal
    """
    print("🧹 LIMPIEZA DE ARCHIVOS REDUNDANTES")
    print("="*40)
    print("Este script eliminará archivos KML y XML redundantes")
    print("después de crear el GeoJSON optimizado.\n")
    
    # Confirmar antes de proceder
    response = input("¿Continuar con la limpieza? (s/N): ").lower().strip()
    
    if response in ['s', 'si', 'sí', 'y', 'yes']:
        cleanup_redundant_files()
    else:
        print("❌ Limpieza cancelada por el usuario.")
        print("💡 Los archivos permanecen sin cambios.")

if __name__ == "__main__":
    main()