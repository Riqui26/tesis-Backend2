// routes/views.routes.js

import { Router } from 'express';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = Router();

// Middleware para enviar el año actual a todas las vistas
router.use((req, res, next) => {
  res.locals.currentYear = new Date().getFullYear();
  next();
});

// Página de inicio
router.get('/', (req, res) => {
  res.render('home', {
    title: 'Inicio'
  });
});

// Página de login
router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Iniciar Sesión'
  });
});

// Página de registro
router.get('/register', (req, res) => {
  res.render('register', {
    title: 'Registro'
  });
});

// Página de perfil (protegida)
router.get('/profile', authenticateJWT, (req, res) => {
  const user = req.user.toObject ? req.user.toObject() : req.user;
  res.render('profile', {
    title: 'Perfil',
    user: req.user
  });
});

export default router;