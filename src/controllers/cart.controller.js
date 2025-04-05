import cartService from '../services/cart.service.js';

export async function purchaseCartController(req, res) {
  try {
    const { cid } = req.params;

    const result = await cartService.purchaseCart(cid);

    return res.status(200).json({
      message: 'Compra procesada',
      result,
    });
    
  } catch (error) {
    return res.status(500).json({
      message: 'Error al procesar la compra',
      error: error.message,
    });
  }
}
