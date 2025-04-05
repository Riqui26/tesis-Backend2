// routes/session.routes.js

import { Router } from 'express';
import passport from 'passport';
import { login, register, current, logout } from '../controllers/session.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', register); // Registro de usuario
router.post('/login', passport.authenticate('login', { session: false }), login); // Login de usuario
router.get('/current', authenticateJWT, current); // Current - Obtener usuario actual
router.get('/logout', logout); // Logout

export default router;