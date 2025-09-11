#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Sistema de Coordinación entre Agentes
EduMap Barranquilla - Gestión de Turnos y Estados

Este script facilita la coordinación entre el Revisor de Código Fullstack Senior
y el Artesano de Código, evitando cruces y optimizando el flujo de trabajo.
"""

import json
import os
from datetime import datetime
from typing import Dict, List, Optional

class CoordinadorAgentes:
    def __init__(self, archivo_estado: str = "Metodolygy_Process/estado_coordinacion.json"):
        self.archivo_estado = archivo_estado
        self.estado = self.cargar_estado()
    
    def cargar_estado(self) -> Dict:
        """Carga el estado actual de coordinación"""
        try:
            if os.path.exists(self.archivo_estado):
                with open(self.archivo_estado, 'r', encoding='utf-8') as f:
                    return json.load(f)
        except Exception as e:
            print(f"⚠️ Error cargando estado: {e}")
        
        # Estado por defecto
        return {
            "proyecto": "EduMap Barranquilla",
            "estado_actual": {
                "fase": "inicial",
                "agente_activo": "ninguno",
                "estado": "disponible"
            }
        }
    
    def guardar_estado(self):
        """Guarda el estado actual"""
        try:
            self.estado["ultima_actualizacion"] = datetime.now().isoformat()
            
            # Crear directorio si no existe
            os.makedirs(os.path.dirname(self.archivo_estado), exist_ok=True)
            
            with open(self.archivo_estado, 'w', encoding='utf-8') as f:
                json.dump(self.estado, f, indent=2, ensure_ascii=False)
            
            print(f"✅ Estado guardado: {self.archivo_estado}")
        except Exception as e:
            print(f"❌ Error guardando estado: {e}")
    
    def cambiar_agente(self, nuevo_agente: str, fase: str, notas: str = ""):
        """Cambia el agente activo y actualiza el estado"""
        agentes_validos = ["revisor_fullstack_senior", "artesano_ux_ui_expert", "usuario"]
        
        if nuevo_agente not in agentes_validos:
            print(f"❌ Agente no válido: {nuevo_agente}")
            return False
        
        # Registrar cambio en historial
        if "historial_trabajo" not in self.estado:
            self.estado["historial_trabajo"] = []
        
        self.estado["historial_trabajo"].append({
            "timestamp": datetime.now().isoformat(),
            "agente_anterior": self.estado["estado_actual"].get("agente_activo", "ninguno"),
            "agente_nuevo": nuevo_agente,
            "fase": fase,
            "notas": notas
        })
        
        # Actualizar estado actual
        self.estado["estado_actual"].update({
            "agente_activo": nuevo_agente,
            "fase": fase,
            "estado": "en_proceso"
        })
        
        self.guardar_estado()
        print(f"🔄 Cambio de agente: {nuevo_agente} - Fase: {fase}")
        return True
    
    def marcar_completado(self, descripcion: str, archivos_afectados: List[str] = None):
        """Marca una tarea como completada"""
        if archivos_afectados is None:
            archivos_afectados = []
        
        if "historial_trabajo" not in self.estado:
            self.estado["historial_trabajo"] = []
        
        self.estado["historial_trabajo"].append({
            "timestamp": datetime.now().isoformat(),
            "agente": self.estado["estado_actual"].get("agente_activo", "desconocido"),
            "accion": descripcion,
            "resultado": "completado",
            "archivos_afectados": archivos_afectados
        })
        
        self.estado["estado_actual"]["estado"] = "completado"
        self.guardar_estado()
        print(f"✅ Tarea completada: {descripcion}")
    
    def obtener_estado_actual(self) -> Dict:
        """Retorna el estado actual del sistema"""
        return self.estado["estado_actual"]
    
    def mostrar_estado(self):
        """Muestra el estado actual de forma legible"""
        estado = self.estado["estado_actual"]
        print("\n" + "="*50)
        print("🤝 ESTADO DE COORDINACIÓN ENTRE AGENTES")
        print("="*50)
        print(f"📋 Proyecto: {self.estado.get('proyecto', 'N/A')}")
        print(f"👤 Agente Activo: {estado.get('agente_activo', 'N/A')}")
        print(f"🔄 Fase Actual: {estado.get('fase', 'N/A')}")
        print(f"📊 Estado: {estado.get('estado', 'N/A')}")
        
        if "siguiente_accion" in self.estado:
            print(f"➡️ Siguiente Acción: {self.estado['siguiente_accion'].get('descripcion', 'N/A')}")
        
        print("="*50 + "\n")
    
    def generar_mensaje_transicion(self, agente_destino: str) -> str:
        """Genera mensaje de transición para el usuario"""
        mensajes = {
            "revisor_fullstack_senior": {
                "titulo": "🔵 CAMBIO DE AGENTE REQUERIDO",
                "mensaje": "He completado la organización y coordinación. Ahora necesitas cambiar al REVISOR DE CÓDIGO FULLSTACK SENIOR para realizar la revisión técnica completa del proyecto.",
                "accion": "Cambiar a agente: Revisor de Código Fullstack Senior"
            },
            "artesano_ux_ui_expert": {
                "titulo": "🎨 LISTO PARA MEJORAS UX/UI",
                "mensaje": "La revisión técnica está completa. Cambiar al ARTESANO UX/UI EXPERT para implementar mejoras de interfaz, experiencia de usuario y diseño.",
                "accion": "Cambiar a agente: Artesano UX/UI Expert"
            },
            "usuario": {
                "titulo": "✅ TRABAJO COMPLETADO",
                "mensaje": "El trabajo ha sido completado exitosamente. Revisar resultados y decidir próximos pasos.",
                "accion": "Revisar trabajo completado"
            }
        }
        
        if agente_destino in mensajes:
            msg = mensajes[agente_destino]
            return f"\n{msg['titulo']}\n{'-'*50}\n{msg['mensaje']}\n\n🎯 {msg['accion']}\n"
        
        return f"\n🔄 Cambio requerido a: {agente_destino}\n"

def main():
    """Función principal para testing del coordinador"""
    coordinador = CoordinadorAgentes()
    
    print("🚀 Sistema de Coordinación de Agentes - EduMap Barranquilla")
    coordinador.mostrar_estado()
    
    # Ejemplo de uso
    coordinador.marcar_completado(
        "Organización de documentos MD completada",
        ["Metodolygy_Process/README.md", "Metodolygy_Process/SISTEMA_COORDINACION_AGENTES.md"]
    )
    
    # Generar mensaje de transición
    mensaje = coordinador.generar_mensaje_transicion("revisor_fullstack_senior")
    print(mensaje)

if __name__ == "__main__":
    main()