const mongoose = require("mongoose");

const TipoTicketSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  cantidad: Number,
  vendidos: { type: Number, default: 0 }
});

const EventoSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  fecha: Date,
  ubicacion: String,
  capacidadMaxima: Number,
  tiposTicket: [TipoTicketSchema],
  estado: { type: String, default: "activo" }
});

module.exports = mongoose.model("Evento", EventoSchema);
