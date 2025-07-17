import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Plataforma de Eventos</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Eventos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/validar">Validar Ticket</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/historial">Historial</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/crear">Crear Evento</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;