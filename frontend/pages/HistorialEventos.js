// src/components/HistorialEventos.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { eventoService } from '../services/api';

function HistorialEventos() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarEventos = async () => {
      try {
        const response = await eventoService.getEventosProximos(); 
        setEventos(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los eventos");
        setLoading(false);
      }
    };

    cargarEventos();
  }, []);

  const hoy = new Date();

  const eventosActivos = eventos.filter(e => new Date(e.fecha) >= hoy);
  const eventosExpirados = eventos.filter(e => new Date(e.fecha) < hoy);

  if (loading) return <div className="text-center">Cargando historial de eventos...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Historial de Eventos</h2>

      <h4 className="text-success mt-4">Eventos Activos</h4>
      <ul className="list-group mb-4">
        {eventosActivos.map(evento => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={evento._id}>
            <div>
              <strong>{evento.nombre}</strong> — {new Date(evento.fecha).toLocaleDateString()}
            </div>
            <div>
              <Link to={`/evento/${evento._id}`} className="btn btn-sm btn-outline-primary me-2">Ver</Link>
              <Link to={`/reporte/${evento._id}`} className="btn btn-sm btn-outline-success">Reporte</Link>
            </div>
          </li>
        ))}
      </ul>

      <h4 className="text-muted mt-4">Eventos Expirados</h4>
      <ul className="list-group">
        {eventosExpirados.map(evento => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={evento._id}>
            <div>
              <strong>{evento.nombre}</strong> — {new Date(evento.fecha).toLocaleDateString()}
            </div>
            <div>
              <Link to={`/evento/${evento._id}`} className="btn btn-sm btn-outline-secondary me-2">Ver</Link>
              <Link to={`/reporte/${evento._id}`} className="btn btn-sm btn-outline-dark">Reporte</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistorialEventos;
