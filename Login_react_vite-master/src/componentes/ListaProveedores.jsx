import React, { useState, useEffect } from 'react';
import '../estilos/Lista.css';

const ListaProveedores = () => {
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    const fetchProveedores = async () => {
      const response = await fetch('http://localhost/BACKEND-ACCOEFI/backend/models/Proveedor.php');
      const data = await response.json();
      setProveedores(data);
    };

    fetchProveedores();
  }, []);

  return (
    <div className="lista-container">
      <h2>Lista de Proveedores</h2>
      <ul className="lista">
        {proveedores.map((proveedor) => (
          <li key={proveedor.id}>
            {proveedor.nombre} - {proveedor.direccion} - {proveedor.telefono} - {proveedor.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaProveedores;