// services/ticket.service.js
import { ticketModel } from '../models/Ticket.js';

class TicketService {
  async getAll() {
    return await ticketModel.find();
  }

  async getById(id) {
    return await ticketModel.findById(id);
  }

  async getByCode(code) {
    return await ticketModel.findOne({ code });
  }

  async create(data) {
    return await ticketModel.create(data);
  }

  async update(id, data) {
    return await ticketModel.updateOne({ _id: id }, data);
  }

  async deleteOne(id) {
    return await ticketModel.deleteOne({ _id: id });
  }
}

export default new TicketService();