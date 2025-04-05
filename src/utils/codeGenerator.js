//! Generador de códigos únicos

export default function codeGenerator(prefix = '', length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
  
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  
    // ? Ejemplo de salida: "TICKET-8FJ29DK3"
    return `${prefix}${prefix ? '-' : ''}${code}`;
}
  