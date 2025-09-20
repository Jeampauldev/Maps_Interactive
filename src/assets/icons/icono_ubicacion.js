// Los datos JSON siguen siendo los mismos.
const pinData = {
  "id": "PC-001",
  "type": "checkpoint",
  "location": {
    "latitude": 10.7765,
    "longitude": -74.9568
  },
  "status": "active"
};

/**
 * Función para actualizar el texto del pin SVG con datos del JSON.
 * @param {object} data - El objeto JSON con la información del pin.
 */
function updateMapPin(data) {
    // 1. Selecciona el elemento de texto dentro del SVG usando su ID.
    const pinTextElement = document.getElementById('pin-text');

    // 2. Si el elemento existe, actualiza su contenido.
    if (pinTextElement) {
        pinTextElement.textContent = data.id;
    } else {
        console.error('No se encontró el elemento de texto del pin.');
    }
}

// Llama a la función al cargar la página para actualizar el pin.
document.addEventListener('DOMContentLoaded', () => {
    updateMapPin(pinData);
});