import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/styles/RegisterForm.css';
import logo from '../../assets/img/logologo.png';

const RegisterForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('http://localhost/BACKEND-ACCOEFI/backend/controllers/UsuarioController.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'REGISTER',  email, password }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        navigate('/login');
      } else {
        alert(data.message || 'Ocurrió un error al registrarse');
      }
    } catch (error) {
      console.error('Error en el fetch o al procesar la respuesta:', error);
      alert('Ocurrió un problema durante el registro.');
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <img src={logo} alt="ACCOEFI LOGO" className="nav-brand" />
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingrese su email"
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme su contraseña"
            required
          />
        </div>
        <button type="submit">Registrar</button>
        <div className="login-link">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm; 