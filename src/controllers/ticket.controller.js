// controllers/ticket.controller.js

import ticketService from '../services/ticket.service.js';

export async function getAll(req, res) {
  try {
    const tickets = await ticketService.getAll();
    if (tickets.length > 0) {
      return res.status(200).json(tickets);
    }
    return res.status(200).json({ message: 'No se encontraron tickets' });
  } catch (error) {
    res.status(500).json({ error: 'Error al recuperar tickets' });
  }
}

export async function getById(req, res) {
  try {
    const { id } = req.params;
    const ticket = await ticketService.getById(id);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket no encontrado' });
    }

    return res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Error al recuperar el ticket' });
  }
}

export async function create(req, res) {
  try {
    const { code, amount, purchaser } = req.body;

    if (!code || !amount || !purchaser) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const existingTicket = await ticketService.getByCode(code);
    if (existingTicket) {
      return res.status(400).json({ message: 'El código ya está registrado' });
    }

    const newTicket = await ticketService.create(req.body);

    return res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el ticket' });
  }
}

export async function update(req, res) {
  try {
    const { id } = req.params;
    const { code, amount, purchaser } = req.body;

    if (!code || !amount || !purchaser) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const ticket = await ticketService.getById(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket no encontrado' });
    }

    await ticketService.update(id, req.body);
    return res.status(200).json({ message: 'Ticket actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el ticket' });
  }
}

export async function deleteOne(req, res) {
  try {
    const { id } = req.params;

    const ticket = await ticketService.getById(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket no encontrado' });
    }

    await ticketService.deleteOne(id);
    return res.status(200).json({ message: 'Ticket eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el ticket' });
  }
}
