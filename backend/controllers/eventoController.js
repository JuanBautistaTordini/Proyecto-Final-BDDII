//controllers/eventoController.js
const Evento = require('../models/Evento');

exports.crearEvento = async (req, res) => {
  try {
    const evento = new Evento(req.body);
    const guardado = await evento.save();
    res.status(201).json(guardado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.eventosProximos = async (req, res) => {
  try {
    const eventos = await Evento.find({ fecha: { $gte: new Date() } });
    res.json(eventos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.reporteVentas = async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id);
    if (!evento) return res.status(404).json({ mensaje: "Evento no encontrado" });

    const resumen = evento.tiposTicket.map(t => ({
      tipo: t.nombre,
      vendidos: t.vendidos,
      total: t.vendidos * t.precio
    }));

    const total = resumen.reduce((a, b) => a + b.total, 0);
    res.json({ resumen, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.eliminarEventoPorId = async (req, res) => {
  try {
    const evento = await Evento.findByIdAndDelete(req.params.id);
    if (!evento) return res.status(404).json({ mensaje: "Evento no encontrado" });
    res.json({ mensaje: "Evento eliminado exitosamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
