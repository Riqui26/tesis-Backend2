import ProductDAO from '../dao/product.dao.js';

const productDAO = new ProductDAO();

export default class ProductRepository {
  async getProductById(id) {
    return await productDAO.getById(id);
  }

  async getAllProducts() {
    return await productDAO.getAll();
  }

  async createProduct(data) {
    return await productDAO.create(data);
  }

  async updateProduct(id, data) {
    return await productDAO.update(id, data);
  }

  async deleteProduct(id) {
    return await productDAO.delete(id);
  }
}
