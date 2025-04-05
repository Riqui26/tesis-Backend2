import CartModel from '../models/Cart.js';

export default class CartDAO {
  async getById(id) {
    return await CartModel.findById(id).populate('products.product');
  }

  async create(data = { products: [] }) {
    return await CartModel.create(data);
  }

  async update(id, data) {
    return await CartModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await CartModel.findByIdAndDelete(id);
  }

  async updateProducts(cid, products) {
    return await CartModel.findByIdAndUpdate(cid, { products }, { new: true });
  }
}
