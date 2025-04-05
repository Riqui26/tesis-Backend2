// middlewares/error.middleware.js

// Middleware para capturar errores de rutas inexistentes
export function notFoundHandler(req, res, next) {
    res.status(404).json({
      status: 'error',
      message: `Ruta ${req.originalUrl} no encontrada`
    });
  }
  
  // Middleware para capturar errores generales
  export function errorHandler(err, req, res, next) {
    console.error('Error:', err.stack);
    
    const statusCode = err.statusCode || 500;
    
    res.status(statusCode).json({
      status: 'error',
      message: err.message || 'Error interno del servidor',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  }
  
  // Middleware para envolver controladores async y manejar errores automáticamente
  export function asyncHandler(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }
  
  // Clase personalizada para errores de la API
  export class ApiError extends Error {
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
    
    static badRequest(message) {
      return new ApiError(400, message);
    }
    
    static unauthorized(message) {
      return new ApiError(401, message);
    }
    
    static forbidden(message) {
      return new ApiError(403, message);
    }
    
    static notFound(message) {
      return new ApiError(404, message);
    }
    
    static internal(message) {
      return new ApiError(500, message);
    }
  }