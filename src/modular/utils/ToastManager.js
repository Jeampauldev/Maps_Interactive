/**
 * ===== SISTEMA DE NOTIFICACIONES TOAST =====
 * Archivo: src/modular/utils/ToastManager.js
 * 
 * Propósito: Manejo centralizado de notificaciones tipo toast
 * Estado: ✅ COPIADO desde script.js líneas 1430-1442 (ORIGINAL INTACTO)
 * 
 * FUENTE: src/components/script.js showToast() método
 * Copiado el: 20 Septiembre 2025
 */

/**
 * Clase para gestionar notificaciones toast
 */
export class ToastManager {
    
    /**
     * Muestra una notificación toast
     * COPIADO desde script.js líneas 1430-1442 SIN MODIFICAR ORIGINAL
     */
    static showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) {
            console.warn('⚠️ ToastManager: Contenedor toast-container no encontrado');
            // Fallback: usar console para debugging
            console.log(`🔔 Toast [${type}]: ${message}`);
            return;
        }
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        container.appendChild(toast);
        
        // Auto-remover después de 3 segundos
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 3000);
    }
    
    /**
     * Muestra toast de éxito
     */
    static success(message) {
        this.showToast(message, 'success');
    }
    
    /**
     * Muestra toast de error
     */
    static error(message) {
        this.showToast(message, 'error');
    }
    
    /**
     * Muestra toast de advertencia
     */
    static warning(message) {
        this.showToast(message, 'warning');
    }
    
    /**
     * Muestra toast de información
     */
    static info(message) {
        this.showToast(message, 'info');
    }
    
    /**
     * Limpiar todos los toasts visibles
     */
    static clearAll() {
        const container = document.getElementById('toast-container');
        if (container) {
            container.innerHTML = '';
        }
    }
    
    /**
     * Mostrar toast con duración personalizada
     */
    static showToastWithDuration(message, type = 'info', duration = 3000) {
        const container = document.getElementById('toast-container');
        if (!container) {
            console.warn('⚠️ ToastManager: Contenedor toast-container no encontrado');
            return;
        }
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        container.appendChild(toast);
        
        // Auto-remover después de duración especificada
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, duration);
    }
}

/**
 * Función de conveniencia para compatibilidad con código existente
 * Permite usar showToast() directamente como en el original
 */
export const showToast = ToastManager.showToast.bind(ToastManager);

/**
 * NOTAS DE IMPLEMENTACIÓN:
 * 
 * ✅ COMPLETADO:
 * - showToast() copiado exactamente desde original
 * - Métodos de conveniencia agregados (success, error, etc.)
 * - Validación de contenedor mejorada
 * - Compatibilidad con código existente
 * - Fallback console.log si no hay contenedor DOM
 * 
 * 🔄 PRÓXIMOS PASOS:
 * 1. Testear desde consola: ToastManager.success('Test')
 * 2. Usar en otros módulos cuando estén listos
 * 3. MANTENER original intacto hasta validar módulos
 * 
 * ⚠️ IMPORTANTE:
 * - El método original showToast() en script.js NO se ha modificado
 * - Esta es una COPIA independiente mejorada
 * - Ambos sistemas pueden coexistir
 */