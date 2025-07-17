import React, { useState } from 'react';
import { ticketService } from '../services/api';

function ValidarTicket() {
  const [codigoQR, setCodigoQR] = useState('');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);
  const [validando, setValidando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!codigoQR.trim()) return;

    setValidando(true);
    setError(null);
    setResultado(null);

    try {
      const response = await ticketService.validarTicket(codigoQR);
      setResultado(response.data);
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al validar el ticket');
    } finally {
      setValidando(false);
    }
  };

  return (
    <div>
      <h1 className="mb-4">Validar Ticket</h1>
      
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Ingresa el código QR</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Código QR del ticket" 
                value={codigoQR} 
                onChange={(e) => setCodigoQR(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={validando}
            >
              {validando ? 'Validando...' : 'Validar Ticket'}
            </button>
          </form>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger">
          <h5>Error</h5>
          <p>{error}</p>
        </div>
      )}

      {resultado && (
        <div className="alert alert-success">
          <h5>Ticket Validado Correctamente</h5>
          <p><strong>Mensaje:</strong> {resultado.mensaje}</p>
          <p><strong>Tipo de Ticket:</strong> {resultado.ticket.tipoTicket}</p>
          <p><strong>Comprador:</strong> {resultado.ticket.comprador.nombre}</p>
          <p><strong>Email:</strong> {resultado.ticket.comprador.email}</p>
          <p><strong>Fecha de Compra:</strong> {new Date(resultado.ticket.fechaCompra).toLocaleDateString('es-ES')}</p>
          <p><strong>Fecha de Uso:</strong> {new Date(resultado.ticket.fechaUso).toLocaleString('es-ES')}</p>
        </div>
      )}
    </div>
  );
}

export default ValidarTicket;