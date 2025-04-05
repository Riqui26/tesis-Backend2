import { Router } from 'express';
import * as cartController from '../controllers/cart.controller.js';
import { authenticateJWT, checkRole } from '../middlewares/auth.middleware.js';

const router = Router();

// ⚡ Ruta protegida para realizar la compra del carrito
router.post(
  '/:cid/purchase',
  authenticateJWT,
  checkRole(['user']),
  cartController.purchaseCartController
);

export default router;
