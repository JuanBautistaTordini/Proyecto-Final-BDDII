const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // <-- importante, cargarlo arriba

dotenv.config();
const app = express();

// 🟢 Aplicar CORS ANTES de definir las rutas
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// 🧭 Rutas
const eventoRoutes = require('./routes/eventoRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

app.use('/api/eventos', eventoRoutes);
app.use('/api/tickets', ticketRoutes);

// 🛠 DB y servidor
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Servidor en puerto http://localhost:3001`);
    });
  })
  .catch(err => console.error('❌ Error de conexión:', err));
