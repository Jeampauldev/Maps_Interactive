#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🤝 SCRIPT DE COORDINACIÓN ENTRE AGENTES - EduMap Barranquilla
Gestiona handoffs, estado de archivos y sincronización entre Backend y UI/UX
"""

import os
import json
import sys
from datetime import datetime
from pathlib import Path

# Colores para output
class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    PURPLE = '\033[95m'
    CYAN = '\033[96m'
    BOLD = '\033[1m'
    END = '\033[0m'

def print_status(message, status="INFO"):
    colors = {
        "SUCCESS": Colors.GREEN,
        "ERROR": Colors.RED,
        "WARNING": Colors.YELLOW,
        "INFO": Colors.BLUE,
        "HANDOFF": Colors.PURPLE,
        "BACKEND": Colors.CYAN,
        "UIUX": Colors.PURPLE
    }
    print(f"{colors.get(status, '')}{Colors.BOLD}[{status}]{Colors.END} {message}")

class AgentCoordinator:
    def __init__(self, project_path="C:/02_Repositorio/Mapa"):
        self.project_path = Path(project_path)
        self.coordination_file = self.project_path / ".coordination.json"
        self.handoff_dir = self.project_path / "handoffs"
        self.handoff_dir.mkdir(exist_ok=True)
        
        # Archivos críticos por categoría
        self.critical_files = {
            "backend": [
                "src/data/barrios_optimizado.geojson",
                "src/components/script.js",
                "sw.js",
                "manifest.json"
            ],
            "uiux": [
                "src/styles/styles.css",
                "index.html",
                "src/assets/icons/icons.js",
                "src/assets/images/",
                "src/assets/logos/"
            ],
            "shared": [
                "index.html",  # Ambos pueden modificar
                "manifest.json"  # Coordinación necesaria
            ]
        }
        
        self.load_coordination_state()
    
    def load_coordination_state(self):
        """Carga el estado de coordinación actual"""
        if self.coordination_file.exists():
            try:
                with open(self.coordination_file, 'r', encoding='utf-8') as f:
                    self.state = json.load(f)
            except:
                self.state = self.create_default_state()
        else:
            self.state = self.create_default_state()
    
    def create_default_state(self):
        """Crea el estado de coordinación por defecto"""
        return {
            "agents": {
                "backend": {
                    "status": "available",  # available, working, blocked
                    "current_task": "",
                    "eta": "",
                    "last_update": datetime.now().isoformat()
                },
                "uiux": {
                    "status": "available",
                    "current_task": "",
                    "eta": "",
                    "last_update": datetime.now().isoformat()
                }
            },
            "file_locks": {},  # {file_path: {owner: agent, locked_at: timestamp}}
            "active_handoffs": [],
            "task_queue": [],
            "last_backup": "",
            "project_version": "1.0.0"
        }
    
    def save_coordination_state(self):
        """Guarda el estado de coordinación"""
        try:
            with open(self.coordination_file, 'w', encoding='utf-8') as f:
                json.dump(self.state, f, indent=2, ensure_ascii=False)
            return True
        except Exception as e:
            print_status(f"Error guardando estado: {e}", "ERROR")
            return False
    
    def update_agent_status(self, agent, status, task="", eta=""):
        """Actualiza el estado de un agente"""
        if agent not in ["backend", "uiux"]:
            print_status("Agente debe ser 'backend' o 'uiux'", "ERROR")
            return False
        
        self.state["agents"][agent].update({
            "status": status,
            "current_task": task,
            "eta": eta,
            "last_update": datetime.now().isoformat()
        })
        
        self.save_coordination_state()
        print_status(f"Agente {agent} actualizado: {status}", "SUCCESS")
        return True
    
    def lock_file(self, file_path, agent):
        """Bloquea un archivo para un agente específico"""
        if agent not in ["backend", "uiux"]:
            print_status("Agente debe ser 'backend' o 'uiux'", "ERROR")
            return False
        
        # Verificar si el archivo ya está bloqueado
        if file_path in self.state["file_locks"]:
            current_owner = self.state["file_locks"][file_path]["owner"]
            if current_owner != agent:
                print_status(f"Archivo {file_path} ya está bloqueado por {current_owner}", "WARNING")
                return False
        
        self.state["file_locks"][file_path] = {
            "owner": agent,
            "locked_at": datetime.now().isoformat()
        }
        
        self.save_coordination_state()
        print_status(f"Archivo {file_path} bloqueado por {agent}", "SUCCESS")
        return True
    
    def unlock_file(self, file_path, agent):
        """Desbloquea un archivo"""
        if file_path not in self.state["file_locks"]:
            print_status(f"Archivo {file_path} no está bloqueado", "WARNING")
            return False
        
        current_owner = self.state["file_locks"][file_path]["owner"]
        if current_owner != agent:
            print_status(f"Solo {current_owner} puede desbloquear {file_path}", "ERROR")
            return False
        
        del self.state["file_locks"][file_path]
        self.save_coordination_state()
        print_status(f"Archivo {file_path} desbloqueado", "SUCCESS")
        return True
    
    def create_handoff(self, from_agent, to_agent, description, files_modified=None):
        """Crea un nuevo handoff entre agentes"""
        if from_agent not in ["backend", "uiux"] or to_agent not in ["backend", "uiux"]:
            print_status("Agentes deben ser 'backend' o 'uiux'", "ERROR")
            return False
        
        handoff_id = f"{from_agent}_to_{to_agent}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        
        handoff_data = {
            "id": handoff_id,
            "from_agent": from_agent,
            "to_agent": to_agent,
            "description": description,
            "files_modified": files_modified or [],
            "created_at": datetime.now().isoformat(),
            "status": "pending",  # pending, accepted, completed
            "notes": []
        }
        
        # Crear archivo de handoff
        handoff_file = self.handoff_dir / f"{handoff_id}.json"
        try:
            with open(handoff_file, 'w', encoding='utf-8') as f:
                json.dump(handoff_data, f, indent=2, ensure_ascii=False)
        except Exception as e:
            print_status(f"Error creando handoff: {e}", "ERROR")
            return False
        
        # Agregar a handoffs activos
        self.state["active_handoffs"].append(handoff_id)
        self.save_coordination_state()
        
        print_status(f"Handoff creado: {handoff_id}", "HANDOFF")
        print_status(f"De {from_agent} hacia {to_agent}", "INFO")
        print_status(f"Descripción: {description}", "INFO")
        
        return handoff_id
    
    def accept_handoff(self, handoff_id, agent):
        """Acepta un handoff"""
        handoff_file = self.handoff_dir / f"{handoff_id}.json"
        
        if not handoff_file.exists():
            print_status(f"Handoff {handoff_id} no encontrado", "ERROR")
            return False
        
        try:
            with open(handoff_file, 'r', encoding='utf-8') as f:
                handoff_data = json.load(f)
        except Exception as e:
            print_status(f"Error leyendo handoff: {e}", "ERROR")
            return False
        
        if handoff_data["to_agent"] != agent:
            print_status(f"Solo {handoff_data['to_agent']} puede aceptar este handoff", "ERROR")
            return False
        
        handoff_data["status"] = "accepted"
        handoff_data["accepted_at"] = datetime.now().isoformat()
        
        try:
            with open(handoff_file, 'w', encoding='utf-8') as f:
                json.dump(handoff_data, f, indent=2, ensure_ascii=False)
        except Exception as e:
            print_status(f"Error actualizando handoff: {e}", "ERROR")
            return False
        
        print_status(f"Handoff {handoff_id} aceptado por {agent}", "SUCCESS")
        return True
    
    def complete_handoff(self, handoff_id, agent, notes=""):
        """Completa un handoff"""
        handoff_file = self.handoff_dir / f"{handoff_id}.json"
        
        if not handoff_file.exists():
            print_status(f"Handoff {handoff_id} no encontrado", "ERROR")
            return False
        
        try:
            with open(handoff_file, 'r', encoding='utf-8') as f:
                handoff_data = json.load(f)
        except Exception as e:
            print_status(f"Error leyendo handoff: {e}", "ERROR")
            return False
        
        if handoff_data["to_agent"] != agent:
            print_status(f"Solo {handoff_data['to_agent']} puede completar este handoff", "ERROR")
            return False
        
        handoff_data["status"] = "completed"
        handoff_data["completed_at"] = datetime.now().isoformat()
        if notes:
            handoff_data["notes"].append({
                "timestamp": datetime.now().isoformat(),
                "agent": agent,
                "note": notes
            })
        
        try:
            with open(handoff_file, 'w', encoding='utf-8') as f:
                json.dump(handoff_data, f, indent=2, ensure_ascii=False)
        except Exception as e:
            print_status(f"Error actualizando handoff: {e}", "ERROR")
            return False
        
        # Remover de handoffs activos
        if handoff_id in self.state["active_handoffs"]:
            self.state["active_handoffs"].remove(handoff_id)
            self.save_coordination_state()
        
        print_status(f"Handoff {handoff_id} completado por {agent}", "SUCCESS")
        return True
    
    def show_status(self):
        """Muestra el estado actual de coordinación"""
        print_status("=" * 60, "INFO")
        print_status("🤝 ESTADO DE COORDINACIÓN - EduMap", "INFO")
        print_status("=" * 60, "INFO")
        
        # Estado de agentes
        print_status("👥 ESTADO DE AGENTES", "INFO")
        for agent_name, agent_data in self.state["agents"].items():
            status_color = "SUCCESS" if agent_data["status"] == "available" else "WARNING"
            print_status(f"🔧 {agent_name.upper()}: {agent_data['status']}", status_color)
            if agent_data["current_task"]:
                print_status(f"   📋 Tarea: {agent_data['current_task']}", "INFO")
            if agent_data["eta"]:
                print_status(f"   ⏰ ETA: {agent_data['eta']}", "INFO")
        
        print()
        
        # Archivos bloqueados
        if self.state["file_locks"]:
            print_status("🔒 ARCHIVOS BLOQUEADOS", "WARNING")
            for file_path, lock_info in self.state["file_locks"].items():
                print_status(f"   📁 {file_path} → {lock_info['owner']}", "WARNING")
        else:
            print_status("✅ No hay archivos bloqueados", "SUCCESS")
        
        print()
        
        # Handoffs activos
        if self.state["active_handoffs"]:
            print_status("📤 HANDOFFS ACTIVOS", "HANDOFF")
            for handoff_id in self.state["active_handoffs"]:
                handoff_file = self.handoff_dir / f"{handoff_id}.json"
                if handoff_file.exists():
                    try:
                        with open(handoff_file, 'r', encoding='utf-8') as f:
                            handoff_data = json.load(f)
                        print_status(f"   🔄 {handoff_data['from_agent']} → {handoff_data['to_agent']}", "HANDOFF")
                        print_status(f"      {handoff_data['description'][:50]}...", "INFO")
                        print_status(f"      Estado: {handoff_data['status']}", "INFO")
                    except:
                        print_status(f"   ❌ Error leyendo {handoff_id}", "ERROR")
        else:
            print_status("✅ No hay handoffs activos", "SUCCESS")
    
    def check_conflicts(self, agent, files_to_modify):
        """Verifica conflictos antes de que un agente modifique archivos"""
        conflicts = []
        
        for file_path in files_to_modify:
            # Verificar si está bloqueado por otro agente
            if file_path in self.state["file_locks"]:
                lock_owner = self.state["file_locks"][file_path]["owner"]
                if lock_owner != agent:
                    conflicts.append(f"Archivo {file_path} bloqueado por {lock_owner}")
            
            # Verificar si es un archivo compartido
            if file_path in self.critical_files["shared"]:
                other_agent = "uiux" if agent == "backend" else "backend"
                if self.state["agents"][other_agent]["status"] == "working":
                    conflicts.append(f"Archivo compartido {file_path} - {other_agent} está trabajando")
        
        return conflicts

def main():
    """Función principal"""
    if len(sys.argv) < 2:
        print_status("Uso: python coordination.py <comando> [opciones]", "INFO")
        print_status("Comandos disponibles:", "INFO")
        print_status("  status - Mostrar estado actual", "INFO")
        print_status("  update-agent <backend|uiux> <status> [tarea] [eta]", "INFO")
        print_status("  lock-file <archivo> <backend|uiux>", "INFO")
        print_status("  unlock-file <archivo> <backend|uiux>", "INFO")
        print_status("  create-handoff <de> <hacia> <descripción>", "INFO")
        print_status("  accept-handoff <handoff_id> <agente>", "INFO")
        print_status("  complete-handoff <handoff_id> <agente> [notas]", "INFO")
        return 1
    
    coordinator = AgentCoordinator()
    command = sys.argv[1].lower()
    
    if command == "status":
        coordinator.show_status()
    
    elif command == "update-agent":
        if len(sys.argv) < 4:
            print_status("Uso: update-agent <backend|uiux> <status> [tarea] [eta]", "ERROR")
            return 1
        
        agent = sys.argv[2]
        status = sys.argv[3]
        task = sys.argv[4] if len(sys.argv) > 4 else ""
        eta = sys.argv[5] if len(sys.argv) > 5 else ""
        
        coordinator.update_agent_status(agent, status, task, eta)
    
    elif command == "lock-file":
        if len(sys.argv) < 4:
            print_status("Uso: lock-file <archivo> <backend|uiux>", "ERROR")
            return 1
        
        file_path = sys.argv[2]
        agent = sys.argv[3]
        
        coordinator.lock_file(file_path, agent)
    
    elif command == "unlock-file":
        if len(sys.argv) < 4:
            print_status("Uso: unlock-file <archivo> <backend|uiux>", "ERROR")
            return 1
        
        file_path = sys.argv[2]
        agent = sys.argv[3]
        
        coordinator.unlock_file(file_path, agent)
    
    elif command == "create-handoff":
        if len(sys.argv) < 5:
            print_status("Uso: create-handoff <de> <hacia> <descripción>", "ERROR")
            return 1
        
        from_agent = sys.argv[2]
        to_agent = sys.argv[3]
        description = sys.argv[4]
        
        coordinator.create_handoff(from_agent, to_agent, description)
    
    elif command == "accept-handoff":
        if len(sys.argv) < 4:
            print_status("Uso: accept-handoff <handoff_id> <agente>", "ERROR")
            return 1
        
        handoff_id = sys.argv[2]
        agent = sys.argv[3]
        
        coordinator.accept_handoff(handoff_id, agent)
    
    elif command == "complete-handoff":
        if len(sys.argv) < 4:
            print_status("Uso: complete-handoff <handoff_id> <agente> [notas]", "ERROR")
            return 1
        
        handoff_id = sys.argv[2]
        agent = sys.argv[3]
        notes = sys.argv[4] if len(sys.argv) > 4 else ""
        
        coordinator.complete_handoff(handoff_id, agent, notes)
    
    else:
        print_status(f"Comando desconocido: {command}", "ERROR")
        return 1
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
