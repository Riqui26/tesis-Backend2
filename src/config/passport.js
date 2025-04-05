// config/passport.config.js

import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import userService from '../services/user.service.js';

// Configuración de estrategia local
passport.use('login', new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await userService.getByEmail(email);
      
      if (!user) {
        return done(null, false, { message: 'Usuario no encontrado' });
      }
      
      const isValidPassword = await userService.validatePassword(password, user.password);
      
      if (!isValidPassword) {
        return done(null, false, { message: 'Contraseña incorrecta' });
      }
      
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Configuración de estrategia JWT
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies['jwt'];
      }
      return token;
    }
  ]),
  secretOrKey: process.env.JWT_SECRET || 'secret_key'
};

passport.use('jwt', new JwtStrategy(
  jwtOptions,
  async (jwtPayload, done) => {
    try {
      const user = await userService.getById(jwtPayload.id);
      
      if (!user) {
        return done(null, false);
      }
      
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }
));

// Estrategia 'current' para extraer el usuario de la cookie
passport.use('current', new JwtStrategy(
  jwtOptions,
  async (jwtPayload, done) => {
    try {
      const user = await userService.getById(jwtPayload.id);
      
      if (!user) {
        return done(null, false);
      }
      
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }
));

export default passport;