import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EventoDetalle from './pages/EventoDetalle';
import ComprarTicket from './pages/ComprarTicket';
import ValidarTicket from './pages/ValidarTicket';
import ReporteVentas from './pages/ReporteVentas';
import HistorialEventos from './pages/HistorialEventos';
import CrearEvento from './pages/CrearEvento';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crear" element={<CrearEvento />} />
          <Route path="/historial" element={<HistorialEventos />} />
          <Route path="/evento/:id" element={<EventoDetalle />} />
          <Route path="/comprar/:id" element={<ComprarTicket />} />
          <Route path="/validar" element={<ValidarTicket />} />
          <Route path="/reporte/:id" element={<ReporteVentas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;