import UserModel from '../models/User.js';

export default class UserDAO {
  async getById(id) {
    return await UserModel.findById(id);
  }

  async getAll() {
    return await UserModel.find();
  }

  async getByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async create(data) {
    return await UserModel.create(data);
  }

  async update(id, data) {
    return await UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await UserModel.findByIdAndDelete(id);
  }
}
