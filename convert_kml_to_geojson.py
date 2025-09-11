#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para convertir KML a GeoJSON con nombres de barrios
Extrae los datos del archivo KML y los convierte a formato GeoJSON optimizado
"""

import xml.etree.ElementTree as ET
import json
import re
from typing import Dict, List, Any

def parse_coordinates(coord_string: str) -> List[List[List[float]]]:
    """
    Parsea las coordenadas del formato KML a formato GeoJSON
    """
    # Limpiar y dividir coordenadas
    coords = coord_string.strip().split()
    polygon_coords = []
    
    for coord in coords:
        if coord.strip():
            try:
                lon, lat = coord.split(',')
                polygon_coords.append([float(lon), float(lat)])
            except ValueError:
                continue
    
    # Formato MultiPolygon para GeoJSON
    return [[polygon_coords]]

def convert_kml_to_geojson(kml_file: str, output_file: str) -> None:
    """
    Convierte archivo KML a GeoJSON con estructura optimizada
    """
    # Parsear el archivo KML
    tree = ET.parse(kml_file)
    root = tree.getroot()
    
    # Namespace para KML
    ns = {'kml': 'http://www.opengis.net/kml/2.2'}
    
    features = []
    
    # Buscar todos los Placemark
    for placemark in root.findall('.//kml:Placemark', ns):
        # Extraer datos extendidos
        extended_data = placemark.find('kml:ExtendedData', ns)
        properties = {}
        
        if extended_data is not None:
            for data in extended_data.findall('kml:Data', ns):
                name = data.get('name')
                value_elem = data.find('kml:value', ns)
                if value_elem is not None:
                    properties[name] = value_elem.text
        
        # Extraer geometría
        multigeometry = placemark.find('.//kml:MultiGeometry', ns)
        if multigeometry is not None:
            polygon = multigeometry.find('kml:Polygon', ns)
            if polygon is not None:
                outer_boundary = polygon.find('.//kml:outerBoundaryIs/kml:LinearRing/kml:coordinates', ns)
                if outer_boundary is not None:
                    coordinates = parse_coordinates(outer_boundary.text)
                    
                    # Crear feature GeoJSON
                    feature = {
                        "type": "Feature",
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": coordinates
                        },
                        "properties": {
                            "id": properties.get('id', '0'),
                            "nombre": properties.get('nombre', ''),
                            "localidad": properties.get('localidad', ''),
                            "pieza_urba": properties.get('pieza_urba', ''),
                            # Agregar campos adicionales para mejor funcionalidad
                            "nombre_normalizado": properties.get('nombre', '').upper().strip(),
                            "area_aproximada": None,  # Se puede calcular después
                            "centroide": None  # Se puede calcular después
                        }
                    }
                    features.append(feature)
    
    # Crear estructura GeoJSON
    geojson = {
        "type": "FeatureCollection",
        "name": "Barrios de Barranquilla según POT",
        "crs": {
            "type": "name",
            "properties": {
                "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
            }
        },
        "features": features
    }
    
    # Guardar archivo GeoJSON
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(geojson, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Conversión completada: {len(features)} barrios procesados")
    print(f"📁 Archivo guardado: {output_file}")
    
    # Mostrar algunos ejemplos
    if features:
        print("\n📋 Primeros 3 barrios encontrados:")
        for i, feature in enumerate(features[:3]):
            props = feature['properties']
            print(f"  {i+1}. {props['nombre']} - {props['localidad']} ({props['pieza_urba']})")

def main():
    """
    Función principal
    """
    kml_file = "src/data/Barrios_de_Barranquilla_según_POT_20250910.kml"
    output_file = "src/data/barrios_optimizado.geojson"
    
    try:
        convert_kml_to_geojson(kml_file, output_file)
        print("\n🎉 ¡Conversión exitosa!")
        print("\n📝 Próximos pasos:")
        print("1. Revisar el archivo generado: barrios_optimizado.geojson")
        print("2. Actualizar script.js para usar el nuevo archivo")
        print("3. Eliminar archivos redundantes (KML y XML)")
        
    except Exception as e:
        print(f"❌ Error durante la conversión: {e}")
        print("\n🔍 Verificar:")
        print("- Que el archivo KML existe y es válido")
        print("- Permisos de escritura en el directorio")
        print("- Estructura del archivo KML")

if __name__ == "__main__":
    main()