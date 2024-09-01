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
          {/* Botón de Inicio en la parte superior */}
          <li onClick={() => navigate('/')}>Inicio</li>
          
          {/* Funcionalidades principales */}
          <li onClick={() => navigate('/registro-clientes')}>Registro de Clientes</li>
          <li onClick={() => navigate('/clientes')}>Lista de Clientes</li>
          <li onClick={() => navigate('/registro-proveedores')}>Registro de Proveedores</li>
          <li onClick={() => navigate('/proveedores')}>Lista de Proveedores</li>
          <li onClick={() => navigate('/registro-productos')}>Registro de Productos</li>
          <li onClick={() => navigate('/productos')}>Inventario</li>
          
          {/* Espaciado para mover los elementos abajo */}
          <div className="spacer"></div>
          
          {/* Opciones en la parte inferior */}
          <li onClick={() => navigate('/configuracion')}>Configuración</li>
          <li onClick={() => navigate('/soporte')}>Soporte</li>
          <li className="logout" onClick={handleLogout}>Cerrar Sesión</li>
        </ul>
      </nav>
      <div className="main-content">
        <div className="icon-container">
          <div className="icon-item" onClick={() => navigate('/registro-clientes')}>
            <i className="fas fa-users"></i>
            <p>Registro de Clientes</p>
          </div>
          <div className="icon-item" onClick={() => navigate('/clientes')}>
            <i className="fas fa-list"></i>
            <p>Lista de Clientes</p>
          </div>
          <div className="icon-item" onClick={() => navigate('/registro-proveedores')}>
            <i className="fas fa-truck"></i>
            <p>Registro de Proveedores</p>
          </div>
          <div className="icon-item" onClick={() => navigate('/proveedores')}>
            <i className="fas fa-list"></i>
            <p>Lista de Proveedores</p>
          </div>
          <div className="icon-item" onClick={() => navigate('/registro-productos')}>
            <i className="fas fa-boxes"></i>
            <p>Registro de Productos</p>
          </div>
          <div className="icon-item" onClick={() => navigate('/productos')}>
            <i className="fas fa-list"></i>
            <p>Inventario</p>
          </div>
          {/* Iconos adicionales */}
          <div className="icon-item" onClick={() => navigate('/configuracion')}>
            <i className="fas fa-cog"></i>
            <p>Configuración</p>
          </div>
          <div className="icon-item" onClick={() => navigate('/soporte')}>
            <i className="fas fa-life-ring"></i>
            <p>Soporte</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterfazApp;