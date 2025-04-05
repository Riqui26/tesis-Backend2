import CartDAO from '../dao/cart.dao.js';

const cartDAO = new CartDAO();

export default class CartRepository {
  async getCartById(id) {
    return await cartDAO.getById(id);
  }

  async createCart(data) {
    return await cartDAO.create(data);
  }

  async updateCart(id, data) {
    return await cartDAO.update(id, data);
  }

  async deleteCart(id) {
    return await cartDAO.delete(id);
  }

  async updateCartProducts(cid, products) {
    return await cartDAO.updateProducts(cid, products);
  }
}
