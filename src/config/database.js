// config/database.js

import mongoose from 'mongoose';

export async function connectToDatabase() {
  try {
    const connectionString = process.env.MONGODB_URI || 'mongodb+srv://fede:123@cluster0.qyeiope.mongodb.net/test';
    
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Conectado exitosamente a MongoDB');
    
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1); // Salir del proceso con error
  }
}

export async function disconnectFromDatabase() {
  try {
    await mongoose.disconnect();
    console.log('Desconectado de MongoDB');
  } catch (error) {
    console.error('Error al desconectar de MongoDB:', error.message);
  }
}