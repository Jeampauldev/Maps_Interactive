/**
 * INTERFACE BASE PARA MÓDULOS
 * Define el contrato que deben cumplir todos los módulos
 */

export class IModule {
    constructor() {
        if (this.constructor === IModule) {
            throw new Error('IModule es una interface, no se puede instanciar directamente');
        }
    }
    
    // Métodos que deben implementar todos los módulos
    async initialize() {
        throw new Error('Método initialize() debe ser implementado');
    }
    
    destroy() {
        throw new Error('Método destroy() debe ser implementado');
    }
    
    getStatus() {
        return 'initialized';
    }
}