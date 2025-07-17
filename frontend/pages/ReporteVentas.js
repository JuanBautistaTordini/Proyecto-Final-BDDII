import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { eventoService } from '../services/api';

function ReporteVentas() {
  const { id } = useParams();
  const [reporte, setReporte] = useState(null);
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener información del evento
        const eventosResponse = await eventoService.getEventosProximos();
        const eventoEncontrado = eventosResponse.data.find(e => e._id === id);
        
        if (eventoEncontrado) {
          setEvento(eventoEncontrado);
          
          // Obtener reporte de ventas
          const reporteResponse = await eventoService.getReporteVentas(id);
          setReporte(reporteResponse.data);
        } else {
          setError('Evento no encontrado');
        }
        setLoading(false);
      } catch (err) {
        setError('Error al cargar el reporte de ventas');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="text-center">Cargando reporte de ventas...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!evento || !reporte) return <div className="alert alert-warning">No se pudo cargar la información</div>;

  return (
    <div>
      <h1 className="mb-4">Reporte de Ventas</h1>
      
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{evento.nombre}</h5>
          <p className="card-text">
            <strong>Fecha:</strong> {new Date(evento.fecha).toLocaleDateString('es-ES', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric'
            })}
          </p>
          <p className="card-text"><strong>Ubicación:</strong> {evento.ubicacion}</p>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Resumen de Ventas</h5>
          <table className="table">
            <thead>
              <tr>
                <th>Tipo de Ticket</th>
                <th>Cantidad Vendida</th>
                <th>Precio Unitario</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {reporte.resumen.map((item, index) => (
                <tr key={index}>
                  <td>{item.tipo}</td>
                  <td>{item.vendidos}</td>
                  <td>
                    ${item.vendidos > 0 ? (item.total / item.vendidos).toFixed(2) : "0.00"}
                  </td>
                  <td>${item.total}</td>
                </tr>
              ))}
              <tr className="table-active">
                <td colSpan="3"><strong>Total General</strong></td>
                <td><strong>${reporte.total}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Link to={`/evento/${id}`} className="btn btn-secondary">
        Volver al evento
      </Link>
    </div>
  );
}

export default ReporteVentas;