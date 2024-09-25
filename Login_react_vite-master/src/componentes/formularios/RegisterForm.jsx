import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import '../../estilos/RegisterForm.css'; 
import logo from '../../img/logologo.png'; 

const RegisterForm = () => {
  // Estados para almacenar datos del formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); // Hook para redireccionar

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevenir el envío por defecto

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return; // Salir si no coinciden
    }

    try {
      // Enviar datos a la API
      const response = await fetch('http://localhost/BACKEND-ACCOEFI/backend/controllers/UsuarioController.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'REGISTER', nombre, email, password }),
      });

      const data = await response.json(); // Procesar respuesta

      // Verificar éxito del registro
      if (data.success) {
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        navigate('/login'); // Redirigir a inicio de sesión
      } else {
        alert(data.message || 'Ocurrió un error al registrarse');
      }
    } catch (error) {
      console.error('Error en el fetch:', error);
      alert('Ocurrió un problema durante el registro.'); // Manejar errores
    }
  };

  // Renderizar formulario
  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <img src={logo} alt="ACCOEFI LOGO" className="nav-brand" />
        {/* Campos del formulario con validación */}
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <button type="submit">Registrar</button>
        <Link to="/login">Inicia Sesión</Link>
      </form>
    </div>
  );
};

export default RegisterForm; // Exportar componente
