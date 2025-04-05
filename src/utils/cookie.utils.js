// utils/cookie.utils.js

/**
 * Establece una cookie HTTP en la respuesta
 * @param {object} res - Objeto de respuesta Express
 * @param {string} name - Nombre de la cookie
 * @param {string} value - Valor de la cookie
 * @param {object} options - Opciones de la cookie
 */
export function setCookie(res, name, value, options = {}) {
    const defaultOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 horas por defecto
    };
    
    res.cookie(name, value, { ...defaultOptions, ...options });
  }
  
  /**
   * Obtiene el valor de una cookie por su nombre
   * @param {object} req - Objeto de solicitud Express
   * @param {string} name - Nombre de la cookie
   * @returns {string|null} - Valor de la cookie o null si no existe
   */
  export function getCookie(req, name) {
    if (!req.cookies) {
      return null;
    }
    
    return req.cookies[name] || null;
  }
  
  /**
   * Elimina una cookie
   * @param {object} res - Objeto de respuesta Express
   * @param {string} name - Nombre de la cookie
   * @param {object} options - Opciones para eliminar la cookie
   */
  export function clearCookie(res, name, options = {}) {
    const defaultOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    };
    
    res.clearCookie(name, { ...defaultOptions, ...options });
  }
  
  /**
   * Extrae el token JWT de las cookies, headers o query params
   * @param {object} req - Objeto de solicitud Express
   * @returns {string|null} - Token JWT o null si no existe
   */
  export function extractToken(req) {
    if (req.cookies && req.cookies.jwt) {
      return req.cookies.jwt;
    }
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      return req.headers.authorization.split(' ')[1];
    }
    
    if (req.query && req.query.token) {
      return req.query.token;
    }
    
    return null;
  }