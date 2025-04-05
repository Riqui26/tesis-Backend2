import { cartModel } from '../models/Cart.js';
import { productModel } from '../models/Product.js';
import { userModel } from '../models/User.js';
import { generateUniqueCode } from '../utils/codeGenerator.js';
import TicketRepository from '../repositories/ticket.repository.js';

const ticketRepository = new TicketRepository();

class CartService {
  async purchaseCart(cartId) {
    const cart = await cartModel.findById(cartId).populate('products.product').populate('user');

    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    const purchased = [];
    const rejected = [];
    let totalAmount = 0;

    for (const item of cart.products) {
      const product = item.product;
      const quantity = item.quantity;

      if (product.stock >= quantity) {
        product.stock -= quantity;
        await product.save();

        totalAmount += product.price * quantity;

        purchased.push({
          product: product._id,
          title: product.title,
          quantity,
        });
      } else {
        rejected.push({
          product: product._id,
          title: product.title,
          requested: quantity,
          available: product.stock,
        });
      }
    }

    cart.products = cart.products.filter(item =>
      rejected.find(r => r.product.toString() === item.product._id.toString())
    );
    await cart.save();

    let ticket = null;

    if (purchased.length > 0) {
      const code = generateUniqueCode();
      const purchaser = cart.user?.email || 'no-email';

      ticket = await ticketRepository.createTicket({
        code,
        amount: totalAmount,
        purchaser,
      });
    }

    return {
      ticket,
      purchased,
      rejected,
    };
  }
}

export default new CartService();
