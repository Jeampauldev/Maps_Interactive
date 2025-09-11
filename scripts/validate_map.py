#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🛡️ SCRIPT DE VALIDACIÓN AUTOMÁTICA - EduMap Barranquilla
Verifica la integridad del mapa y datos antes/después de modificaciones
"""

import os
import json
import sys
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

class MapValidator:
    def __init__(self, project_path="C:/02_Repositorio/Mapa"):
        self.project_path = Path(project_path)
        self.errors = []
        self.warnings = []
        self.success_count = 0
        
    def validate_critical_files(self):
        """Verifica que todos los archivos críticos existan"""
        print_status("Verificando archivos críticos...", "INFO")
        
        critical_files = [
            "index.html",
            "manifest.json",
            "sw.js",
            "src/components/script.js",
            "src/styles/styles.css",
            "src/assets/icons/icons.js",
            "src/data/barrios_optimizado.geojson",
            "src/assets/logos/Alcaldia_Original.png"
        ]
        
        for file_path in critical_files:
            full_path = self.project_path / file_path
            if full_path.exists():
                self.success_count += 1
                print_status(f"✅ {file_path}", "SUCCESS")
            else:
                self.errors.append(f"❌ Archivo crítico faltante: {file_path}")
                print_status(f"❌ {file_path} - FALTANTE", "ERROR")
    
    def validate_geojson_integrity(self):
        """Valida la integridad del archivo GeoJSON"""
        print_status("Validando datos GeoJSON...", "INFO")
        
        geojson_path = self.project_path / "src/data/barrios_optimizado.geojson"
        
        if not geojson_path.exists():
            self.errors.append("❌ Archivo GeoJSON principal faltante")
            return
            
        try:
            with open(geojson_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            # Verificar estructura básica
            if 'features' not in data:
                self.errors.append("❌ GeoJSON: Falta propiedad 'features'")
                return
                
            features_count = len(data['features'])
            print_status(f"✅ GeoJSON válido con {features_count} features", "SUCCESS")
            self.success_count += 1
            
            # Verificar features tienen geometría
            invalid_features = 0
            for i, feature in enumerate(data['features']):
                if 'geometry' not in feature or 'properties' not in feature:
                    invalid_features += 1
            
            if invalid_features > 0:
                self.warnings.append(f"⚠️  {invalid_features} features con estructura incompleta")
            else:
                print_status("✅ Todas las features tienen estructura válida", "SUCCESS")
                
        except json.JSONDecodeError as e:
            self.errors.append(f"❌ Error parsing GeoJSON: {str(e)}")
        except Exception as e:
            self.errors.append(f"❌ Error leyendo GeoJSON: {str(e)}")
    
    def validate_manifest_json(self):
        """Valida el archivo manifest.json"""
        print_status("Validando PWA manifest...", "INFO")
        
        manifest_path = self.project_path / "manifest.json"
        
        if not manifest_path.exists():
            self.errors.append("❌ Archivo manifest.json faltante")
            return
            
        try:
            with open(manifest_path, 'r', encoding='utf-8') as f:
                manifest = json.load(f)
            
            required_fields = ['name', 'short_name', 'start_url', 'display']
            missing_fields = [field for field in required_fields if field not in manifest]
            
            if missing_fields:
                self.errors.append(f"❌ Manifest: faltan campos {missing_fields}")
            else:
                print_status("✅ Manifest.json estructura válida", "SUCCESS")
                self.success_count += 1
            
            # Verificar iconos existen
            if 'icons' in manifest:
                for icon in manifest['icons']:
                    icon_path = self.project_path / icon['src'].lstrip('./')
                    if not icon_path.exists():
                        self.warnings.append(f"⚠️  Icono PWA faltante: {icon['src']}")
                        
        except json.JSONDecodeError as e:
            self.errors.append(f"❌ Error parsing manifest.json: {str(e)}")
        except Exception as e:
            self.errors.append(f"❌ Error leyendo manifest.json: {str(e)}")
    
    def validate_html_references(self):
        """Verifica que las referencias en index.html sean válidas"""
        print_status("Validando referencias en HTML...", "INFO")
        
        html_path = self.project_path / "index.html"
        
        if not html_path.exists():
            self.errors.append("❌ Archivo index.html faltante")
            return
            
        try:
            with open(html_path, 'r', encoding='utf-8') as f:
                html_content = f.read()
            
            # Referencias críticas que deben existir
            references = [
                ('src/styles/styles.css', 'CSS principal'),
                ('src/components/script.js', 'JavaScript principal'),
                ('manifest.json', 'PWA manifest'),
                ('sw.js', 'Service Worker')
            ]
            
            for ref_path, description in references:
                if ref_path in html_content:
                    file_path = self.project_path / ref_path
                    if file_path.exists():
                        print_status(f"✅ {description} referenciado y existe", "SUCCESS")
                        self.success_count += 1
                    else:
                        self.errors.append(f"❌ {description} referenciado pero archivo faltante: {ref_path}")
                else:
                    self.warnings.append(f"⚠️  {description} no referenciado en HTML")
                    
        except Exception as e:
            self.errors.append(f"❌ Error leyendo index.html: {str(e)}")
    
    def check_duplicate_files(self):
        """Identifica archivos duplicados potencialmente problemáticos"""
        print_status("Buscando archivos duplicados...", "INFO")
        
        # Archivos que podrían estar duplicados
        potential_duplicates = [
            ('styles.css', ['styles.css', 'src/styles/styles.css']),
            ('script.js', ['script.js', 'src/components/script.js']),
            ('icons.js', ['icons.js', 'src/assets/icons/icons.js'])
        ]
        
        for file_type, paths in potential_duplicates:
            existing_paths = []
            for path in paths:
                full_path = self.project_path / path
                if full_path.exists():
                    existing_paths.append(path)
            
            if len(existing_paths) > 1:
                self.warnings.append(f"⚠️  {file_type} duplicado en: {', '.join(existing_paths)}")
            elif len(existing_paths) == 1:
                print_status(f"✅ {file_type} en ubicación única: {existing_paths[0]}", "SUCCESS")
                self.success_count += 1
    
    def validate_service_worker(self):
        """Verifica el service worker"""
        print_status("Validando Service Worker...", "INFO")
        
        sw_path = self.project_path / "sw.js"
        
        if not sw_path.exists():
            self.errors.append("❌ Service Worker (sw.js) faltante")
            return
            
        try:
            with open(sw_path, 'r', encoding='utf-8') as f:
                sw_content = f.read()
            
            # Verificar que cache assets críticos
            if 'index.html' in sw_content and 'styles.css' in sw_content:
                print_status("✅ Service Worker contiene assets básicos", "SUCCESS")
                self.success_count += 1
            else:
                self.warnings.append("⚠️  Service Worker podría no cachear assets críticos")
                
        except Exception as e:
            self.errors.append(f"❌ Error leyendo Service Worker: {str(e)}")
    
    def run_validation(self):
        """Ejecuta todas las validaciones"""
        print_status("=" * 60, "INFO")
        print_status("🛡️  INICIANDO VALIDACIÓN DE MAPA", "INFO")
        print_status("=" * 60, "INFO")
        
        self.validate_critical_files()
        self.validate_geojson_integrity()
        self.validate_manifest_json()
        self.validate_html_references()
        self.check_duplicate_files()
        self.validate_service_worker()
        
        # Reporte final
        print_status("=" * 60, "INFO")
        print_status("📊 REPORTE DE VALIDACIÓN", "INFO")
        print_status("=" * 60, "INFO")
        
        print_status(f"✅ Validaciones exitosas: {self.success_count}", "SUCCESS")
        
        if self.warnings:
            print_status(f"⚠️  Advertencias: {len(self.warnings)}", "WARNING")
            for warning in self.warnings:
                print_status(warning, "WARNING")
        
        if self.errors:
            print_status(f"❌ Errores críticos: {len(self.errors)}", "ERROR")
            for error in self.errors:
                print_status(error, "ERROR")
            print_status("🚨 EL MAPA PODRÍA NO FUNCIONAR CORRECTAMENTE", "ERROR")
            return False
        else:
            if self.warnings:
                print_status("✅ MAPA FUNCIONAL CON ADVERTENCIAS MENORES", "WARNING")
            else:
                print_status("🎉 MAPA COMPLETAMENTE VÁLIDO", "SUCCESS")
            return True

def main():
    """Función principal"""
    if len(sys.argv) > 1:
        project_path = sys.argv[1]
    else:
        project_path = "C:/02_Repositorio/Mapa"
    
    validator = MapValidator(project_path)
    is_valid = validator.run_validation()
    
    # Exit code para scripts
    sys.exit(0 if is_valid else 1)

if __name__ == "__main__":
    main()
