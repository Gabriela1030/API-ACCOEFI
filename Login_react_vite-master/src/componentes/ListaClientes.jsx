import React, { useState, useEffect } from 'react';
import '../estilos/Lista.css';


const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      const response = await fetch('http://localhost/BACKEND-ACCOEFI/backend/models/Cliente.php');
      const data = await response.json();
      setClientes(data);
    };

    fetchClientes();
  }, []);

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