import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/InterfazApp.css';

const InterfazApp = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí podrías agregar lógica para limpiar el estado de autenticación si es necesario.
    navigate('/login');
  };

  // Define un array con las rutas y nombres para evitar repetición
  const menuItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Registro de Clientes', path: '/registro-clientes' },
    { label: 'Registro de Proveedores', path: '/registro-proveedores' },
    { label: 'Registro de Productos', path: '/registro-productos' },
    { label: 'Lista de Clientes', path: '/clientes' },
    { label: 'Lista de Proveedores', path: '/proveedores' },
    { label: 'Lista de Productos', path: '/productos' },

  ];

  return (
    <div className="app-container">
      <nav className="sidebar">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path} onClick={() => navigate(item.path)}>
              {item.label}
            </li>
          ))}
          <div className="spacer"></div>
          <li className="logout" onClick={handleLogout}>Cerrar Sesión</li>
        </ul>
      </nav>
      <div className="main-content">
        <div className="icon-container">
          {menuItems.slice(1).map((item, index) => (
            <div className="icon-item" key={item.path} onClick={() => navigate(item.path)}>
              <i className={`fas fa-${index === 0 ? 'users' : index === 1 ? 'truck' : index === 2 ? 'boxes' : 'list'}`}></i>
              <p>{item.label}</p>
            </div>
          ))}
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
