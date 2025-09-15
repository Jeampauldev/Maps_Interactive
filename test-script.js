// Script de prueba simple
console.log('🧪 Script de prueba iniciado');

try {
    // Verificar si CONFIG está definido
    if (typeof CONFIG !== 'undefined') {
        console.log('✅ CONFIG disponible en script de prueba');
    } else {
        console.log('❌ CONFIG no disponible en script de prueba');
    }
    
    // Verificar si BarranquillaEduMap está definido
    if (typeof BarranquillaEduMap !== 'undefined') {
        console.log('✅ BarranquillaEduMap disponible en script de prueba');
    } else {
        console.log('❌ BarranquillaEduMap no disponible en script de prueba');
    }
    
    // Intentar crear una instancia simple
    console.log('🔄 Intentando crear instancia de BarranquillaEduMap...');
    const testMap = new BarranquillaEduMap();
    console.log('✅ Instancia creada exitosamente:', testMap);
    
} catch (error) {
    console.error('🚨 Error en script de prueba:', error);
    console.error('Stack trace:', error.stack);
}

console.log('🧪 Script de prueba finalizado');