const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

const eventoRoutes = require('./routes/eventoRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

app.use('/api/eventos', eventoRoutes);
app.use('/api/tickets', ticketRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Servidor en puerto ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('❌ Error de conexión:', err));
