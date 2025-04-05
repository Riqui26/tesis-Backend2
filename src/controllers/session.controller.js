// controllers/session.controller.js

import userService from '../services/user.service.js';
import jwt from 'jsonwebtoken';
import UserDTO from '../dto/user.dto.js';


const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

export async function register(req, res) {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    
    if (!first_name || !last_name || !email || !age || !password) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }
    
    const existingUser = await userService.getByEmail(email);
    
    if (existingUser) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }
    
    const newUser = await userService.create(req.body);
    
    return res.status(201).json({ 
      message: 'Usuario registrado correctamente',
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role
      }
    });
    
  } catch (error) {
    return res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
  }
}

export async function login(req, res) {
  try {
    const user = req.user;
    
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    });
    
    // Si es una petición API, devolver JSON
    if (req.headers['content-type'] === 'application/json') {
      return res.status(200).json({
        message: 'Login exitoso',
        user: {
          id: user._id,
          email: user.email,
          role: user.role
        }
      });
    }
    
    // Si no, redirigir a la página de perfil
    return res.redirect('/profile');
    
  } catch (error) {
    return res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
}

export async function current(req, res) {
  const userDTO = new UserDTO(req.user);
  return res.status(200).json({ user: userDTO });
}

export async function logout(req, res) {
  try {
    res.clearCookie('jwt');
    
    // Si es una petición API, devolver JSON
    if (req.headers['content-type'] === 'application/json') {
      return res.status(200).json({ message: 'Logout exitoso' });
    }
    
    // Si no, redirigir a la página de inicio
    return res.redirect('/');
    
  } catch (error) {
    return res.status(500).json({ message: 'Error al cerrar sesión', error: error.message });
  }
}

