import React, { useEffect, useState } from 'react';
import '../estilos/Lista.css';
const ListaProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const response = await fetch('http://localhost/BACKEND-ACCOEFI/backend/models/Producto.php');
      const data = await response.json();
      setProductos(data);
    };
    fetchProductos();
  }, []);

  return (
    <div className="lista-container">
      <h2>Lista de Productos</h2>
      <ul className="lista">
        {productos.map((producto) => (
          <li key={producto.id}>
            <p><strong>Nombre:</strong> {producto.nombre}</p>
            <p><strong>Descripción:</strong> {producto.descripcion}</p>
            <p><strong>Precio:</strong> ${producto.precio}</p>
            <p><strong>Cantidad:</strong> {producto.cantidad}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaProductos;