import TicketModel from '../models/Ticket.js';

export default class TicketDAO {
  async create(data) {
    return await TicketModel.create(data);
  }

  async getById(id) {
    return await TicketModel.findById(id);
  }

  async getAll() {
    return await TicketModel.find();
  }
}
