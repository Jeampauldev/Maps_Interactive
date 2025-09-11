#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para optimizar el archivo GeoJSON de barrios de Barranquilla
Reducir tamaño de ~2.5MB a <700KB mediante:
- Reducción de precisión decimal (6 -> 4 decimales)
- Simplificación de geometrías
- Eliminación de propiedades innecesarias
"""

import json
import os
from typing import Dict, List, Any

def round_coordinates(coords: List, precision: int = 4) -> List:
    """
    Redondea las coordenadas a la precisión especificada
    """
    if isinstance(coords[0], list):
        return [round_coordinates(coord, precision) for coord in coords]
    else:
        return [round(coord, precision) for coord in coords]

def simplify_properties(properties: Dict[str, Any]) -> Dict[str, Any]:
    """
    Mantiene solo las propiedades esenciales
    """
    essential_props = {
        'NOMBRE': properties.get('NOMBRE', ''),
        'CODIGO': properties.get('CODIGO', ''),
        'LOCALIDAD': properties.get('LOCALIDAD', ''),
        'AREA': properties.get('AREA', 0)
    }
    
    # Eliminar valores vacíos o nulos
    return {k: v for k, v in essential_props.items() if v is not None and v != ''}

def optimize_geojson(input_file: str, output_file: str, precision: int = 4) -> None:
    """
    Optimiza un archivo GeoJSON reduciendo su tamaño
    """
    print(f"Optimizando {input_file}...")
    
    # Leer archivo original
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    original_size = os.path.getsize(input_file)
    print(f"Tamaño original: {original_size / 1024 / 1024:.2f} MB")
    
    # Optimizar cada feature
    optimized_features = []
    
    for feature in data['features']:
        # Optimizar geometría
        geometry = feature['geometry']
        if geometry['type'] == 'MultiPolygon':
            geometry['coordinates'] = round_coordinates(geometry['coordinates'], precision)
        elif geometry['type'] == 'Polygon':
            geometry['coordinates'] = round_coordinates(geometry['coordinates'], precision)
        
        # Simplificar propiedades
        properties = simplify_properties(feature['properties'])
        
        optimized_feature = {
            'type': feature['type'],
            'geometry': geometry,
            'properties': properties
        }
        
        optimized_features.append(optimized_feature)
    
    # Crear GeoJSON optimizado
    optimized_data = {
        'type': 'FeatureCollection',
        'crs': data.get('crs', {'type': 'name', 'properties': {'name': 'urn:ogc:def:crs:OGC:1.3:CRS84'}}),
        'features': optimized_features
    }
    
    # Guardar archivo optimizado
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(optimized_data, f, ensure_ascii=False, separators=(',', ':'))
    
    # Mostrar resultados
    optimized_size = os.path.getsize(output_file)
    reduction = ((original_size - optimized_size) / original_size) * 100
    
    print(f"Tamaño optimizado: {optimized_size / 1024 / 1024:.2f} MB")
    print(f"Reducción: {reduction:.1f}%")
    print(f"Archivo guardado: {output_file}")

if __name__ == '__main__':
    input_file = 'src/data/barrios_optimizado.geojson'
    output_file = 'src/data/barrios_ultra_optimizado.geojson'
    
    if os.path.exists(input_file):
        optimize_geojson(input_file, output_file, precision=4)
        print("\n✅ Optimización completada")
        print("\n📝 Próximos pasos:")
        print("1. Verificar que el archivo optimizado funciona correctamente")
        print("2. Actualizar script.js para usar el nuevo archivo")
        print("3. Eliminar el archivo anterior si todo funciona bien")
    else:
        print(f"❌ Error: No se encontró el archivo {input_file}")
        print("Verifica la ruta del archivo GeoJSON")