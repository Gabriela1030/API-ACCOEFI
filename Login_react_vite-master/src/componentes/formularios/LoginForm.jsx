import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../estilos/LoginForm.css';
import logo from '../../img/logologo.png';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost/BACKEND-ACCOEFI/backend/models/Usuario.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    
    if (data.success) {
      navigate('/interfaz');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <img src={logo} alt="ACCOEFI LOGO" className="nav-brand" />
        <div className="form-group">
          <label htmlFor="username">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingrese su nombre de usuario"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese su contraseña"
            required
          />
        </div>
        <div className="forgot-password">¿Olvidó su contraseña?</div>
        <button type="submit">Iniciar Sesión</button>
        <div className="register-link">
          ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;