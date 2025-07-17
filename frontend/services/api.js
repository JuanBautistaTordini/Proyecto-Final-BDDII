import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const eventoService = {
  getEventosProximos: () => {
    return axios.get(`${API_URL}/eventos/proximos`);
  },
  getReporteVentas: (id) => {
    return axios.get(`${API_URL}/eventos/${id}/reporte`);
  },
  crearEvento: (eventoData) => {
    return axios.post(`${API_URL}/eventos`, eventoData);
  },
  eliminarEvento: (id) => {
    return axios.delete(`${API_URL}/eventos/${id}`);
  }
};

export const ticketService = {
  comprarTicket: (ticketData) => {
    return axios.post(`${API_URL}/tickets/comprar`, ticketData);
  },
  validarTicket: (codigoQR) => {
    return axios.get(`${API_URL}/tickets/validar/${codigoQR}`);
  }
};