import ProductModel from '../models/Product.js';

export default class ProductDAO {
  async getById(id) {
    return await ProductModel.findById(id);
  }

  async getAll() {
    return await ProductModel.find();
  }

  async create(data) {
    return await ProductModel.create(data);
  }

  async update(id, data) {
    return await ProductModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await ProductModel.findByIdAndDelete(id);
  }
}
