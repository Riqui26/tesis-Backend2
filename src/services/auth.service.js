// services/auth.service.js

import userService from './user.service.js';
import { generateToken, verifyToken } from '../utils/jwt.utils.js';
import { hashPassword, comparePassword } from '../utils/bcrypt.utils.js';
import { ApiError } from '../middlewares/error.middleware.js';

class AuthService {
  async register(userData) {
    try {
      // Verificar si el usuario ya existe
      const existingUser = await userService.getByEmail(userData.email);
      if (existingUser) {
        throw ApiError.badRequest('El email ya está registrado');
      }
      
      // Hashear la contraseña
      userData.password = await hashPassword(userData.password);
      
      // Crear el usuario
      const newUser = await userService.create(userData);
      
      // Generar el token
      const token = generateToken(newUser);
      
      return {
        user: {
          id: newUser._id,
          email: newUser.email,
          role: newUser.role
        },
        token
      };
    } catch (error) {
      throw error;
    }
  }

  async login(email, password) {
    try {
      // Buscar el usuario
      const user = await userService.getByEmail(email);
      if (!user) {
        throw ApiError.unauthorized('Credenciales inválidas');
      }
      
      // Verificar la contraseña
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw ApiError.unauthorized('Credenciales inválidas');
      }
      
      // Generar el token
      const token = generateToken(user);
      
      return {
        user: {
          id: user._id,
          email: user.email,
          role: user.role
        },
        token
      };
    } catch (error) {
      throw error;
    }
  }

  async validateToken(token) {
    try {
      const decoded = verifyToken(token);
      if (!decoded) {
        throw ApiError.unauthorized('Token inválido o expirado');
      }
      
      const user = await userService.getById(decoded.id);
      if (!user) {
        throw ApiError.unauthorized('Usuario no encontrado');
      }
      
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();