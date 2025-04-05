// services/user.service.js

import { userModel } from '../models/User.js';
import bcrypt from 'bcrypt';

class UserService {
    async getAll() {
        return await userModel.find();
    }

    async getById(id) {
        return await userModel.findById(id);
    }

    async getByEmail(email) {
        return await userModel.findOne({ email });
    }

    async create(userData) {
        const hashedPassword = bcrypt.hashSync(userData.password, 10);
        
        const newUser = {
            ...userData,
            password: hashedPassword
        };
        
        return await userModel.create(newUser);
    }

    async update(id, userData) {
        if (userData.password) {
            userData.password = bcrypt.hashSync(userData.password, 10);
        }
        
        return await userModel.updateOne({ _id: id }, userData);
    }

    async deleteOne(id) {
        return await userModel.deleteOne({ _id: id });
    }
    
    async validatePassword(plainPassword, hashedPassword) {
        return bcrypt.compareSync(plainPassword, hashedPassword);
    }
}

export default new UserService();