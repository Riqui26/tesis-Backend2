// services/product.service.js

import { productModel } from '../models/Product.js';

class ProductService {
  async getAll() {
    return await productModel.find();
  }

  async getById(id) {
    return await productModel.findById(id);
  }

  async getByCode(code) {
    return await productModel.findOne({ code });
  }

  async create(data) {
    return await productModel.create(data);
  }

  async update(id, data) {
    return await productModel.updateOne({ _id: id }, data);
  }

  async deleteOne(id) {
    return await productModel.deleteOne({ _id: id });
  }
}

export default new ProductService();
