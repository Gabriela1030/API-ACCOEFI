import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaBox, FaUsers, FaCog, FaLifeRing, FaSignOutAlt } from 'react-icons/fa';
import '../../assets/styles/InterfazApp.css';

const InterfazApp = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    totalInventario: 0,
    clientesActivos: 0,
    proveedores: 0,
  });

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.tuservidor.com/estadisticas'); // URL de tu API
      const result = await response.json();
      setData({
        totalInventario: result.totalInventario,
        clientesActivos: result.clientesActivos,
        proveedores: result.proveedores,
      });
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  const menuItems = [
    { label: 'Inicio', path: '/', icon: <FaHome /> },
    { label: 'Registro de Clientes', path: '/registro-clientes', icon: <FaUser /> },
    { label: 'Registro de Proveedores', path: '/registro-proveedores', icon: <FaUsers /> },
    { label: 'Registro de Productos', path: '/registro-productos', icon: <FaBox /> },
    { label: 'Lista de Clientes', path: '/clientes', icon: <FaUser /> },
    { label: 'Lista de Proveedores', path: '/proveedores', icon: <FaUsers /> },
    { label: 'Lista de Productos', path: '/productos', icon: <FaBox /> },
    { label: 'Configuración', path: '/configuracion', icon: <FaCog /> },
    { label: 'Soporte', path: '/soporte', icon: <FaLifeRing /> }
  ];

  return (
    <div className="app-container">
      <nav className="sidebar">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path} onClick={() => navigate(item.path)}>
              {item.icon} <span>{item.label}</span>
            </li>
          ))}
          <div className="spacer"></div>
          <li className="logout" onClick={handleLogout}>
            <FaSignOutAlt /> <span>Cerrar Sesión</span>
          </li>
        </ul>
      </nav>
      <div className="main-content">
        <header className="top-bar">
          <input type="text" placeholder="Buscar..." className="search-bar" />
        </header>
        <div className="dashboard">
          <div className="card-container">
            <div className="card">
              <h3>Total Inventario</h3>
              <p>{data.totalInventario}</p>
              <span>+20% desde el último mes</span>
            </div>
            <div className="card">
              <h3>Clientes Activos</h3>
              <p>{data.clientesActivos}</p>
              <span>+5% desde el último mes</span>
            </div>
            <div className="card">
              <h3>Proveedores</h3>
              <p>{data.proveedores}</p>
              <span>+2 desde el último mes</span>
            </div>
          </div>
          <div className="activity">
            <h3>Actividad Reciente</h3>
            <p>Aquí se mostraría una lista o tabla con las actividades recientes relacionadas con inventario, clientes y proveedores.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterfazApp;
