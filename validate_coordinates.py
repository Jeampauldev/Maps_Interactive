#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para validar coordenadas de puntos voluminosos en Barranquilla
"""

import json
import os

def validate_coordinates():
    """Valida las coordenadas de los puntos voluminosos"""
    
    # Cargar datos
    file_path = os.path.join('src', 'data', 'puntos_voluminosos.json')
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"❌ Error: No se encontró el archivo {file_path}")
        return
    except json.JSONDecodeError as e:
        print(f"❌ Error de JSON: {e}")
        return
    
    print("🔍 Validación de coordenadas para Barranquilla")
    print("📍 Rango válido - Latitud: 10.8 a 11.2, Longitud: -75.0 a -74.6")
    print("=" * 60)
    
    problemas = []
    
    for i, punto in enumerate(data):
        lat = punto.get('COORD_X')
        lng = punto.get('COORD_Y')
        punto_id = punto.get('ID', f'Punto_{i+1}')
        barrio = punto.get('BARRIO', 'Sin barrio')
        
        # Verificar que las coordenadas existan
        if lat is None or lng is None:
            problema = f"❌ {punto_id}: Coordenadas faltantes - {barrio}"
            print(problema)
            problemas.append(problema)
            continue
        
        # Validar rango de Barranquilla
        lat_valid = 10.8 <= lat <= 11.2
        lng_valid = -75.0 <= lng <= -74.6
        
        if lat_valid and lng_valid:
            print(f"✅ {punto_id}: Lat={lat}, Lng={lng} - {barrio}")
        else:
            problema = f"❌ {punto_id}: Lat={lat}, Lng={lng} - {barrio} (FUERA DE RANGO)"
            print(problema)
            problemas.append(problema)
            
            if not lat_valid:
                print(f"   ⚠️  Latitud {lat} fuera del rango 10.8-11.2")
            if not lng_valid:
                print(f"   ⚠️  Longitud {lng} fuera del rango -75.0 a -74.6")
    
    print("\n" + "=" * 60)
    print("📊 RESUMEN DE VALIDACIÓN:")
    total = len(data)
    valid_coords = len(data) - len(problemas)
    
    print(f"📍 Total de puntos: {total}")
    print(f"✅ Coordenadas válidas: {valid_coords}")
    print(f"❌ Coordenadas problemáticas: {len(problemas)}")
    
    if problemas:
        print("\n🚨 PROBLEMAS ENCONTRADOS:")
        for problema in problemas:
            print(f"  • {problema}")
        return False
    else:
        print("\n🎉 ¡Todas las coordenadas son válidas!")
        return True

def analyze_data_completeness():
    """Analiza la completitud de los datos"""
    
    file_path = os.path.join('src', 'data', 'puntos_voluminosos.json')
    
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    print("\n🔍 ANÁLISIS DE COMPLETITUD DE DATOS:")
    print("=" * 60)
    
    # Contar campos con "ND"
    campos_nd = {}
    total_puntos = len(data)
    
    for punto in data:
        for campo, valor in punto.items():
            if valor == "ND":
                if campo not in campos_nd:
                    campos_nd[campo] = 0
                campos_nd[campo] += 1
    
    print(f"📊 Campos con datos faltantes (ND):")
    for campo, count in sorted(campos_nd.items(), key=lambda x: x[1], reverse=True):
        porcentaje = (count / total_puntos) * 100
        print(f"  • {campo}: {count}/{total_puntos} ({porcentaje:.1f}%)")
    
    # Verificar campos críticos
    campos_criticos = ['COORD_X', 'COORD_Y', 'BARRIO', 'LOCALIDAD']
    print(f"\n✅ Campos críticos completos:")
    for campo in campos_criticos:
        completos = sum(1 for p in data if p.get(campo) and p[campo] != "ND")
        porcentaje = (completos / total_puntos) * 100
        print(f"  • {campo}: {completos}/{total_puntos} ({porcentaje:.1f}%)")

if __name__ == "__main__":
    print("🗺️  VALIDADOR DE PUNTOS VOLUMINOSOS - BARRANQUILLA")
    print("=" * 60)
    
    # Cambiar al directorio del proyecto
    if os.path.exists('src'):
        os.chdir('.')
    elif os.path.exists('../src'):
        os.chdir('..')
    
    # Ejecutar validaciones
    coords_valid = validate_coordinates()
    analyze_data_completeness()
    
    print("\n" + "=" * 60)
    if coords_valid:
        print("🎯 RESULTADO: Archivo listo para usar")
    else:
        print("⚠️  RESULTADO: Se requieren correcciones")