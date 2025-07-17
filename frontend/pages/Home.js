import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { eventoService } from '../services/api';

function Home() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await eventoService.getEventosProximos();
        setEventos(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los eventos');
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  if (loading) return <div className="text-center">Cargando eventos...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h1 className="mb-4">Próximos Eventos</h1>
      <div className="row">
        {eventos.length > 0 ? (
          eventos.map(evento => (
            <div className="col-md-4 mb-4" key={evento._id}>
              <div className="card evento-card h-100">
                <div className="card-body">
                  <h5 className="card-title">{evento.nombre}</h5>
                  <p className="card-text">{evento.descripcion}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      {new Date(evento.fecha).toLocaleDateString('es-ES', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </small>
                  </p>
                  <p className="card-text">Ubicación: {evento.ubicacion}</p>
                  <Link to={`/evento/${evento._id}`} className="btn btn-primary me-2">
                    Ver detalles
                  </Link>
                  <Link to={`/comprar/${evento._id}`} className="btn btn-success">
                    Comprar tickets
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p>No hay eventos próximos disponibles.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;