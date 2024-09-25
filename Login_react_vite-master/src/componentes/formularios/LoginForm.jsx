import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import '../../estilos/LoginForm.css'; 
import logo from '../../img/logologo.png'; 

const LoginForm = () => {
  // Estados para almacenar email y contraseña
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook para redireccionar

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevenir el envío por defecto

    try {
      // Enviar datos a la API para iniciar sesión
      const response = await fetch('http://localhost/BACKEND-ACCOEFI/backend/controllers/UsuarioController.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'LOGIN', email, password }), // Enviar email y contraseña
      });

      const data = await response.json(); // Obtener respuesta como JSON

      // Verificar éxito del inicio de sesión
      if (data.success) {
        alert('Inicio de sesión exitoso.'); // Mensaje de éxito
        navigate('/interfaz'); // Redirigir a la interfaz después de iniciar sesión
      } else {
        alert(data.message || 'Ocurrió un error al iniciar sesión'); // Manejo de errores
      }
    } catch (error) {
      console.error('Error en el fetch:', error); // Mostrar error en consola
      alert('Ocurrió un problema durante el inicio de sesión.'); // Mensaje de error
    }
  };

  // Renderizar formulario de inicio de sesión
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <img src={logo} alt="ACCOEFI LOGO" className="nav-brand" />
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Actualizar estado
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
            onChange={(e) => setPassword(e.target.value)} // Actualizar estado
            placeholder="Ingrese su contraseña"
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button> {/* Botón para enviar */}
        <div className="register-link">
          ¿No tienes una cuenta? <Link to="/register">Regístrate</Link> {/* Enlace a registro */}
        </div>
      </form>
    </div>
  );
};

export default LoginForm; // Exportar componente
