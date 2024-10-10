import React, { useState } from 'react';
import '../../estilos/RegisterForm.css';

const RegistroClientes = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [mensaje, setMensaje] = useState('');  // Estado para el mensaje de éxito o error

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación simple para asegurarse de que no falten datos
    if (!nombre || !email || !telefono || !direccion) {
      setMensaje('Por favor, complete todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost/BACKEND-ACCOEFI/backend/controllers/ClienteController.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email, telefono, direccion }),
      });

      if (response.ok) {
        setMensaje('Cliente registrado exitosamente');
        // Limpiar los campos del formulario
        setNombre('');
        setEmail('');
        setTelefono('');
        setDireccion('');
      } else {
        const errorData = await response.json();
        setMensaje(errorData.message || 'Error al registrar el cliente');
      }
    } catch (error) {
      setMensaje('Error de conexión con el servidor.');
    }
  };

  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Registro de Clientes</h2>
        {mensaje && <p className="mensaje">{mensaje}</p>} {/* Mostrar mensaje de éxito o error */}
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Teléfono:</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Dirección:</label>
          <input
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrar Cliente</button>
      </form>
    </div>
  );
};

export default RegistroClientes;
