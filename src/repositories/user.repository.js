import UserDAO from '../dao/user.dao.js';

const userDAO = new UserDAO();

export default class UserRepository {
  async getUserById(id) {
    return await userDAO.getById(id);
  }

  async getUserByEmail(email) {
    return await userDAO.getByEmail(email);
  }

  async getAllUsers() {
    return await userDAO.getAll();
  }

  async createUser(data) {
    return await userDAO.create(data);
  }

  async updateUser(id, data) {
    return await userDAO.update(id, data);
  }

  async deleteUser(id) {
    return await userDAO.delete(id);
  }
}
