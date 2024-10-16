import React, { useState } from 'react';
import '../../estilos/RegisterForm.css';

const RegisterProductos = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [proveedorId, setProveedorId] = useState(''); // Proveedor

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost/BACKEND-ACCOEFI/backend/controllers/ProductoController.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        nombre, 
        descripcion, 
        precio, 
        cantidad, 
        proveedor_id: proveedorId // Enviar ID de proveedor
      }),
    });

    if (response.ok) {
      alert('Producto registrado exitosamente');
    } else {
      alert('Error al registrar el producto');
    }
  };

  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Registro de Productos</h2>
        <div className="form-group">
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Descripción:</label>
          <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Precio:</label>
          <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Cantidad:</label>
          <input type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Proveedor ID:</label>
          <input type="number" value={proveedorId} onChange={(e) => setProveedorId(e.target.value)} required />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterProductos;
