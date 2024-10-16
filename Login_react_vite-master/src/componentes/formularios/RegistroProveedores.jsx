import React, { useState } from 'react';
import '../../estilos/RegisterForm.css';

const RegistroProveedores = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [mensaje, setMensaje] = useState('');  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !email || !telefono || !direccion) {
      setMensaje('Por favor, complete todos los campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost/BACKEND-ACCOEFI/backend/controllers/ProveedorController.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email, telefono, direccion }),
      });

      if (response.ok) {
        setMensaje('Proveedor registrado exitosamente');
        setNombre('');
        setEmail('');
        setTelefono('');
        setDireccion('');
      } else {
        const errorData = await response.json();
        setMensaje(errorData.message || 'Error al registrar el proveedor');
      }
    } catch (error) {
      setMensaje('Error de conexión con el servidor.');
    }
  };

  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Registro de Proveedores</h2>
        {mensaje && <p className="mensaje">{mensaje}</p>}
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
        <button type="submit">Registrar Proveedor</button>
      </form>
    </div>
  );
};

export default RegistroProveedores;
