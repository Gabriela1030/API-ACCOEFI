import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/InterfazApp.css';

const InterfazApp = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
   
    navigate('/login');
  };

  return (
    <div className="app-container">
      <nav className="sidebar">
        <ul>
          <li>Inicio</li>
          <li>Informes</li>
          <li>Transacciones</li>
          <li className="logout" onClick={handleLogout}>Cerrar Sesión</li>
        </ul>
      </nav>
      <div className="main-content">
        <div className="icon-container">
          <div className="icon-item">
            <i className="fas fa-users"></i>
            <p>Registro de Clientes</p>
          </div>
          <div className="icon-item">
            <i className="fas fa-truck"></i>
            <p>Registro de Proveedores</p>
          </div>
          <div className="icon-item">
            <i className="fas fa-user-tie"></i>
            <p>Registrar Gasto</p>
          </div>
          <div className="icon-item">
            <i className="fas fa-shopping-cart"></i>
            <p>Registrar compra</p>
          </div>
          <div className="icon-item">
            <i className="fas fa-arrow-down"></i>
            <p>Registrar ingresos</p>
          </div>
          <div className="icon-item">
            <i className="fas fa-file-invoice"></i>
            <p>Crear Factura</p>
          </div>
          <div className="icon-item">
            <i className="fas fa-boxes"></i>
            <p>Control de Inventario</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterfazApp;
