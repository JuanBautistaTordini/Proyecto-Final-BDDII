//routes/eventoRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/eventoController");

router.post("/", controller.crearEvento);
router.get("/proximos", controller.eventosProximos);
router.get("/:id/reporte", controller.reporteVentas);
router.delete("/:id", controller.eliminarEventoPorId);

module.exports = router;
