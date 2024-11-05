import React, { useState, useEffect } from 'react';
import '../../assets/styles/Lista.css';

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch('http://localhost/BACKEND-ACCOEFI/backend/controllers/ClienteController.php');
        if (!response.ok) {
          throw new Error('Error en la solicitud a la API');
        }
        const data = await response.json();
        setClientes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  const handleEdit = (id) => {
    
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost/BACKEND-ACCOEFI/backend/controllers/ClienteController.php`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      setClientes(clientes.filter(cliente => cliente.id !== id)); // Actualiza el estado para eliminar el cliente de la lista
    } else {
      console.error('Error al eliminar el cliente');
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="lista-container">
      <h2>Lista de Clientes</h2>
      <ul className="lista">
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            <div className="info">
              {cliente.nombre} - {cliente.direccion} - {cliente.telefono} - {cliente.email}
            </div>
            <div className="acciones">
              <button className="btn-editar" onClick={() => handleEdit(cliente.id)}>Editar</button>
              <button className="btn-eliminar" onClick={() => handleDelete(cliente.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaClientes;
