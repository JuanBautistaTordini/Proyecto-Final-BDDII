const Evento = require('../models/Evento');
const Ticket = require('../models/Ticket');
const QRCode = require('qrcode');
const crypto = require('crypto');

exports.comprarTicket = async (req, res) => {
  const { eventoId, tipoTicket, comprador } = req.body;

  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) return res.status(404).json({ mensaje: "Evento no encontrado" });

    const tipo = evento.tiposTicket.find(t => t.nombre === tipoTicket);
    if (!tipo) return res.status(400).json({ mensaje: "Tipo de ticket inválido" });

    if (tipo.vendidos >= tipo.cantidad) {
      return res.status(400).json({ mensaje: "Tickets agotados" });
    }

    tipo.vendidos += 1;
    await evento.save();

    const codigoQR = crypto.randomBytes(8).toString("hex");

    const nuevoTicket = new Ticket({
      eventoId,
      comprador,
      tipoTicket,
      precio: tipo.precio,
      codigoQR
    });

    await nuevoTicket.save();

    const qrDataUrl = await QRCode.toDataURL(codigoQR);

    res.status(201).json({
      mensaje: "Compra exitosa",
      ticket: nuevoTicket,
      qrCodeImage: qrDataUrl
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.validarTicket = async (req, res) => {
  try {
    const { codigoQR } = req.params;
    const ticket = await Ticket.findOne({ codigoQR });

    if (!ticket) return res.status(404).json({ mensaje: "Ticket no encontrado" });
    if (ticket.usado) return res.status(400).json({ mensaje: "Ticket ya fue usado" });

    ticket.usado = true;
    ticket.fechaUso = new Date();
    await ticket.save();

    res.json({ mensaje: "Ticket validado con éxito", ticket });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
