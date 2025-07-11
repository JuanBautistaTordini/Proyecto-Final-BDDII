const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  eventoId: { type: mongoose.Schema.Types.ObjectId, ref: "Evento" },
  comprador: {
    nombre: String,
    email: String
  },
  tipoTicket: String,
  precio: Number,
  fechaCompra: { type: Date, default: Date.now },
  codigoQR: String,
  usado: { type: Boolean, default: false },
  fechaUso: Date
});

module.exports = mongoose.model("Ticket", TicketSchema);
