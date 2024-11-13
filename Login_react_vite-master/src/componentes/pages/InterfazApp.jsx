import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaUser,
  FaBox,
  FaUsers,
  FaCog,
  FaLifeRing,
  FaSignOutAlt,
} from 'react-icons/fa';
import '../../assets/styles/InterfazApp.css';

const InterfazApp = () => {
  const navigate = useNavigate();

  // Estado para almacenar los datos
  const [data, setData] = useState({
    totalInventario: 0,
    clientesActivos: 0,
    proveedores: 0,
  });

  // Función para obtener los datos de las listas
  const fetchData = async () => {
    try {
      // Obtener la lista de clientes
      const clientesResponse = await fetch('http://localhost/BACKEND-ACCOEFI/backend/controllers/ClienteController.php');
      const clientesData = await clientesResponse.json();

      // Obtener la lista de proveedores
      const proveedoresResponse = await fetch('http://localhost/BACKEND-ACCOEFI/backend/controllers/ProveedorController.php');
      const proveedoresData = await proveedoresResponse.json();

      // Obtener la lista de productos (inventario)
      const productosResponse = await fetch('http://localhost/BACKEND-ACCOEFI/backend/controllers/ProductoController.php');
      const productosData = await productosResponse.json();

      // Actualizar el estado con los datos obtenidos
      setData({
        totalInventario: productosData.length,
        clientesActivos: clientesData.length,
        proveedores: proveedoresData.length,
      });
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  // Llamar a la función fetchData cuando el componente se monta
  useEffect(() => {
    fetchData();
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    navigate('/login');
  };

  // Elementos del menú
  const menuItems = [
    { label: 'Inicio', path: '/', icon: <FaHome /> },
    { label: 'Registro de Clientes', path: '/registro-clientes', icon: <FaUser /> },
    { label: 'Registro de Proveedores', path: '/registro-proveedores', icon: <FaUsers /> },
    { label: 'Registro de Productos', path: '/registro-productos', icon: <FaBox /> },
    { label: 'Lista de Clientes', path: '/clientes', icon: <FaUser /> },
    { label: 'Lista de Proveedores', path: '/proveedores', icon: <FaUsers /> },
    { label: 'Lista de Productos', path: '/productos', icon: <FaBox /> },
    { label: 'Configuración', path: '/configuracion', icon: <FaCog /> },
    { label: 'Soporte', path: '/soporte', icon: <FaLifeRing /> },
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
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterfazApp;
