// middlewares/auth.middleware.js

import passport from 'passport';

export function authenticateJWT(req, res, next) {
  passport.authenticate('current', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    
    if (!user) {
      return res.status(401).json({ message: 'No autorizado' });
    }
    
    req.user = user;
    return next();
  })(req, res, next);
}

export function checkRole(roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'No autorizado' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }
    
    return next();
  };
}