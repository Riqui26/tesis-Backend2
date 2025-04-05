// utils/bcrypt.utils.js

import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * Hashea una contraseña utilizando bcrypt
 * @param {string} password - Contraseña en texto plano
 * @returns {Promise<string>} - Contraseña hasheada
 */
export async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error('Error al hashear la contraseña');
  }
}

/**
 * Hashea una contraseña utilizando bcrypt (versión sincrónica)
 * @param {string} password - Contraseña en texto plano
 * @returns {string} - Contraseña hasheada
 */
export function hashPasswordSync(password) {
  try {
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    return bcrypt.hashSync(password, salt);
  } catch (error) {
    throw new Error('Error al hashear la contraseña');
  }
}

/**
 * Compara una contraseña en texto plano con una contraseña hasheada
 * @param {string} password - Contraseña en texto plano
 * @param {string} hashedPassword - Contraseña hasheada
 * @returns {Promise<boolean>} - True si coinciden, false si no
 */
export async function comparePassword(password, hashedPassword) {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error('Error al comparar contraseñas');
  }
}

/**
 * Compara una contraseña en texto plano con una contraseña hasheada (versión sincrónica)
 * @param {string} password - Contraseña en texto plano
 * @param {string} hashedPassword - Contraseña hasheada
 * @returns {boolean} - True si coinciden, false si no
 */
export function comparePasswordSync(password, hashedPassword) {
  try {
    return bcrypt.compareSync(password, hashedPassword);
  } catch (error) {
    throw new Error('Error al comparar contraseñas');
  }
}