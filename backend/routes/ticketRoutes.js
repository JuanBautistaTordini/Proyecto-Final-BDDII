// routes/// ticketRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/ticketController");

router.post("/comprar", controller.comprarTicket);
router.get("/validar/:codigoQR", controller.validarTicket);

module.exports = router;
