import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { eventoService } from '../services/api';

function EventoDetalle() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await eventoService.getEventosProximos();
        const eventoEncontrado = response.data.find(e => e._id === id);
        
        if (eventoEncontrado) {
          setEvento(eventoEncontrado);
        } else {
          setError('Evento no encontrado');
        }
        setLoading(false);
      } catch (err) {
        setError('Error al cargar el evento');
        setLoading(false);
      }
    };

    fetchEventos();
  }, [id]);

  const handleEliminar = async () => {
    const confirmacion = window.confirm('¿Estás seguro que querés eliminar este evento? Esta acción no se puede deshacer.');
    if (!confirmacion) return;

    try {
      await eventoService.eliminarEvento(evento._id);
      alert('Evento eliminado correctamente');
      navigate('/');
    } catch (err) {
      alert('Hubo un error al intentar eliminar el evento');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center">Cargando detalles del evento...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!evento) return <div className="alert alert-warning">Evento no encontrado</div>;

  return (
    <div>
      <h1 className="mb-4">{evento.nombre}</h1>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Detalles del Evento</h5>
          <p className="card-text">{evento.descripcion}</p>
          <p className="card-text">
            <strong>Fecha:</strong> {new Date(evento.fecha).toLocaleDateString('es-ES', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
          <p className="card-text"><strong>Ubicación:</strong> {evento.ubicacion}</p>
          <p className="card-text"><strong>Capacidad:</strong> {evento.capacidadMaxima} personas</p>
        </div>
      </div>

      <h3>Tipos de Tickets Disponibles</h3>
      <div className="row">
        {evento.tiposTicket.map((tipo, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{tipo.nombre}</h5>
                <p className="card-text"><strong>Precio:</strong> ${tipo.precio}</p>
                <p className="card-text">
                  <strong>Disponibles:</strong> {tipo.cantidad - (tipo.vendidos || 0)} de {tipo.cantidad}
                </p>
                <Link to={`/comprar/${evento._id}?tipo=${tipo.nombre}`} className="btn btn-primary">
                  Comprar
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Link to="/" className="btn btn-secondary me-2">Volver a eventos</Link>
        <Link to={`/reporte/${evento._id}`} className="btn btn-info">Ver reporte de ventas</Link>
        <button className="btn btn-danger ms-2" onClick={handleEliminar}>
          Eliminar evento
        </button>

      </div>
    </div>
  );
}

export default EventoDetalle;