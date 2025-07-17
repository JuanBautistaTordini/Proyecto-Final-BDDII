import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { eventoService, ticketService } from '../services/api';

function ComprarTicket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tipoPreseleccionado = queryParams.get('tipo');

  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    tipoTicket: tipoPreseleccionado || ''
  });
  const [comprando, setComprando] = useState(false);
  const [ticketComprado, setTicketComprado] = useState(null);

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const response = await eventoService.getEventosProximos();
        const eventoEncontrado = response.data.find(e => e._id === id);
        
        if (eventoEncontrado) {
          setEvento(eventoEncontrado);
          if (!tipoPreseleccionado && eventoEncontrado.tiposTicket.length > 0) {
            setFormData(prev => ({
              ...prev,
              tipoTicket: eventoEncontrado.tiposTicket[0].nombre
            }));
          }
        } else {
          setError('Evento no encontrado');
        }
        setLoading(false);
      } catch (err) {
        setError('Error al cargar el evento');
        setLoading(false);
      }
    };

    fetchEvento();
  }, [id, tipoPreseleccionado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setComprando(true);
    setError(null);

    try {
      const ticketData = {
        eventoId: id,
        tipoTicket: formData.tipoTicket,
        comprador: {
          nombre: formData.nombre,
          email: formData.email
        }
      };

      const response = await ticketService.comprarTicket(ticketData);
      setTicketComprado(response.data);
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al procesar la compra');
    } finally {
      setComprando(false);
    }
  };

  if (loading) return <div className="text-center">Cargando información del evento...</div>;
  if (error && !ticketComprado) return <div className="alert alert-danger">{error}</div>;
  if (!evento) return <div className="alert alert-warning">Evento no encontrado</div>;

  // Si el ticket ya fue comprado, mostrar la información
  if (ticketComprado) {
    return (
      <div className="text-center">
        <div className="alert alert-success mb-4">
          <h4>¡Compra exitosa!</h4>
          <p>Tu ticket ha sido generado correctamente.</p>
        </div>
        
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Información del Ticket</h5>
            <p><strong>Evento:</strong> {evento.nombre}</p>
            <p><strong>Tipo de Ticket:</strong> {ticketComprado.ticket.tipoTicket}</p>
            <p><strong>Precio:</strong> ${ticketComprado.ticket.precio}</p>
            <p><strong>Comprador:</strong> {ticketComprado.ticket.comprador.nombre}</p>
            <p><strong>Email:</strong> {ticketComprado.ticket.comprador.email}</p>
            <p><strong>Código QR:</strong> {ticketComprado.ticket.codigoQR}</p>
          </div>
        </div>

        {ticketComprado.qrCodeImage && (
          <div className="mb-4">
            <h5>Código QR para validación</h5>
            <img 
              src={ticketComprado.qrCodeImage} 
              alt="Código QR del ticket" 
              className="img-fluid" 
              style={{ maxWidth: '250px' }} 
            />
          </div>
        )}

        <div className="mt-4">
          <button 
            className="btn btn-primary me-2" 
            onClick={() => navigate(`/evento/${id}`)}
          >
            Volver al evento
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={() => navigate('/')}
          >
            Ir a eventos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-4">Comprar Ticket</h1>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{evento.nombre}</h5>
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
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Formulario de Compra</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="tipoTicket" className="form-label">Tipo de Ticket</label>
              <select 
                id="tipoTicket" 
                name="tipoTicket" 
                className="form-select" 
                value={formData.tipoTicket} 
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un tipo de ticket</option>
                {evento.tiposTicket.map((tipo, index) => (
                  <option 
                    key={index} 
                    value={tipo.nombre}
                    disabled={tipo.vendidos >= tipo.cantidad}
                  >
                    {tipo.nombre} - ${tipo.precio} 
                    ({tipo.cantidad - tipo.vendidos} disponibles)
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre Completo</label>
              <input 
                type="text" 
                className="form-control" 
                id="nombre" 
                name="nombre" 
                value={formData.nombre} 
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={comprando}
            >
              {comprando ? 'Procesando...' : 'Comprar Ticket'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ComprarTicket;