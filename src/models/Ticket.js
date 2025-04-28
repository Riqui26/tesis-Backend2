// models/Ticket.js (corregido)
import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    purchase_datetime: {
        type: Date,
        required: true,
        default: Date.now,
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String,
        required: true,
    },
});

// Exportamos como ticketModel (en minúscula) para que coincida con la importación
export const ticketModel = mongoose.model('Ticket', ticketSchema);