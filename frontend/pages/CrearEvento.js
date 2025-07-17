import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventoService } from '../services/api';

function CrearEvento() {
  const navigate = useNavigate();
  const [evento, setEvento] = useState({
    nombre: '',
    descripcion: '',
    fecha: '',
    ubicacion: '',
    capacidad: ''
  });
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setEvento({ ...evento, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);

    try {
      await eventoService.crearEvento({
        ...evento,
        capacidad: parseInt(evento.capacidad) // Nos aseguramos de que sea un número
      });
      setMensaje('Evento creado exitosamente');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError('Error al crear el evento');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Crear Nuevo Evento</h2>
      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre del Evento</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={evento.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            name="descripcion"
            value={evento.descripcion}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha y Hora</label>
          <input
            type="datetime-local"
            className="form-control"
            name="fecha"
            value={evento.fecha}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Ubicación</label>
          <input
            type="text"
            className="form-control"
            name="ubicacion"
            value={evento.ubicacion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Cantidad de Personas</label>
          <input
            type="number"
            className="form-control"
            name="capacidad"
            value={evento.capacidad}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Crear Evento</button>
      </form>
    </div>
  );
}

export default CrearEvento;
