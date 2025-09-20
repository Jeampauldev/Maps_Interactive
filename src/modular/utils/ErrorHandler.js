/**
 * MANEJO DE ERRORES CENTRALIZADO
 * TODO: Implementar try-catch robusto que falta en script.js
 */

export class ErrorHandler {
    static handle(error, context = 'Unknown') {
        console.error(`❌ Error en ${context}:`, error);
        // TODO: Implementar logging, notificaciones al usuario, etc.
    }
    
    static async withErrorHandling(asyncFn, context) {
        try {
            return await asyncFn();
        } catch (error) {
            this.handle(error, context);
            throw error;
        }
    }
    
    // TODO: Más funciones de manejo de errores
}