// dao/ticket.dao.js
import { ticketModel } from '../models/Ticket.js';

export default class TicketDAO {
  async create(data) {
    return await ticketModel.create(data);
  }

  async getById(id) {
    return await ticketModel.findById(id);
  }

  async getAll() {
    return await ticketModel.find();
  }

  async update(id, data) {
    return await ticketModel.updateOne({ _id: id }, data);
  }

  async delete(id) {
    return await ticketModel.deleteOne({ _id: id });
  }
}