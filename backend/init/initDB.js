//init/initDB.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Evento = require('../models/Evento');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Base de datos conectada");

    const eventos = [
      {
        nombre: "Concierto Rock 2025",
        descripcion: "Evento de rock con bandas nacionales",
        fecha: new Date("2025-09-01"),
        ubicacion: "Estadio Luna Park",
        capacidadMaxima: 5000,
        tiposTicket: [
          { nombre: "General", precio: 5000, cantidad: 3000 },
          { nombre: "VIP", precio: 10000, cantidad: 500 }
        ]
      }
    ];

    await Evento.deleteMany({});
    await Evento.insertMany(eventos);

    console.log("🎉 Datos iniciales insertados");
    process.exit();
  })
  .catch(err => {
    console.error("❌ Error al inicializar:", err);
    process.exit(1);
  });
