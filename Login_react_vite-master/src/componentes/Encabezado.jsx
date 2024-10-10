import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../estilos/Navbar.css'; // Asegúrate de tener tu archivo CSS para los estilos

const Encabezado = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login'); // Redirige al formulario de inicio de sesión
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <ul className="navbar-menu">
          <li onClick={() => navigate('/')}>Inicio</li>
          
        </ul>
      </div>
      <div className="navbar-right">
        <button className="login-button" onClick={handleLogin}>
          Iniciar Sesión
        </button>
      </div>
    </nav>
  );
};

export default Encabezado;
