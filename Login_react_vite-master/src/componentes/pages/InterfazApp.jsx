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

  // Estado para almacenar los datos principales
  const [data, setData] = useState({
    totalInventario: 0,
    clientesActivos: 0,
    proveedores: 0,
  });

  // Estado para la búsqueda
  const [searchQuery, setSearchQuery] = useState('');

  // Estado para las actividades recientes
  const [recentActivities, setRecentActivities] = useState([]);

  // Función para obtener los datos principales
  const fetchData = async () => {
    try {
      const clientesResponse = await fetch(
        'http://localhost/BACKEND-ACCOEFI/backend/controllers/ClienteController.php'
      );
      const clientesData = await clientesResponse.json();

      const proveedoresResponse = await fetch(
        'http://localhost/BACKEND-ACCOEFI/backend/controllers/ProveedorController.php'
      );
      const proveedoresData = await proveedoresResponse.json();

      const productosResponse = await fetch(
        'http://localhost/BACKEND-ACCOEFI/backend/controllers/ProductoController.php'
      );
      const productosData = await productosResponse.json();

      setData({
        totalInventario: productosData.length,
        clientesActivos: clientesData.length,
        proveedores: proveedoresData.length,
      });
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  // Función para obtener actividades recientes
  const fetchRecentActivities = async () => {
    try {
      const activitiesResponse = await fetch(
        'http://localhost/BACKEND-ACCOEFI/backend/controllers/ActivityController.php'
      );
      const activitiesData = await activitiesResponse.json();
      setRecentActivities(activitiesData);
    } catch (error) {
      console.error('Error al obtener las actividades recientes:', error);
    }
  };

  // Llamar a las funciones al montar el componente
  useEffect(() => {
    fetchData();
    fetchRecentActivities();
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
    { label: 'Soporte', path: '/soporte', icon: <FaLifeRing /> },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <nav className="sidebar">
        <ul>
          {filteredMenuItems.map((item) => (
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
          <input
            type="text"
            placeholder="Buscar..."
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </header>
        <div className="dashboard">
          <div className="card-container">
            <div className="card">
              <h3>Total Inventario</h3>
              <p>{data.totalInventario}</p>
              <span>+2% desde el último mes</span>
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
            {recentActivities.length > 0 ? (
              <ul>
                {recentActivities.map((activity, index) => (
                  <li key={index}>{activity.description}</li>
                ))}
              </ul>
            ) : (
              <p>No hay actividades recientes.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterfazApp;
