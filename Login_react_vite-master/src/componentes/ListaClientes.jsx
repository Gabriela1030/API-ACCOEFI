import React, { useState, useEffect } from 'react';
import '../estilos/Lista.css';

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch('http://localhost/BACKEND-ACCOEFI/backend/models/ClienteController.php');
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
            {cliente.nombre} - {cliente.direccion} - {cliente.telefono} - {cliente.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaClientes;
