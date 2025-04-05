// server.js

import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import dotenv from 'dotenv';
import cors from 'cors';
import { engine as handlebars } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración de __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
import './config/passport.js';
import { connectToDatabase } from './config/database.js';

// Rutas 
import userRouter from './routes/user.routes.js';
import sessionRouter from './routes/session.routes.js';
import viewsRouter from './routes/views.routes.js';
import cartRouter from './routes/cart.routes.js';


// Middlewares
import { notFoundHandler, errorHandler } from './middlewares/error.middleware.js';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de Handlebars
app.engine('handlebars', handlebars({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  extname: '.handlebars'
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middlewares generales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : 'http://localhost:3000',
  credentials: true
}));

// Inicializar Passport
app.use(passport.initialize());

// Rutas de vistas
app.use('/', viewsRouter);

// Rutas API
app.use('/api/users', userRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/carts', cartRouter);


// Middleware para manejar rutas no encontradas
app.use(notFoundHandler);

// Middleware para manejar errores
app.use(errorHandler);

// Conectar a la base de datos y luego iniciar el servidor
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  });