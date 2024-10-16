import React, { useEffect, useState } from 'react';
import '../estilos/Lista.css';

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [editandoProducto, setEditandoProducto] = useState(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');

  useEffect(() => {
    const fetchProductos = async () => {
      const response = await fetch('http://localhost/BACKEND-ACCOEFI/backend/controllers/ProductoController.php');
      const data = await response.json();
      setProductos(data);
    };
    fetchProductos();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost/BACKEND-ACCOEFI/backend/controllers/ProductoController.php`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      setProductos(productos.filter((producto) => producto.id !== id));
    }
  };

  const handleEdit = (producto) => {
    setEditandoProducto(producto.id);
    setNombre(producto.nombre);
    setDescripcion(producto.descripcion);
    setPrecio(producto.precio);
    setCantidad(producto.cantidad);
  };

  const handleUpdate = async (id) => {
    const response = await fetch(`http://localhost/BACKEND-ACCOEFI/backend/controllers/ProductoController.php`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, nombre, descripcion, precio, cantidad }),
    });

    if (response.ok) {
      setProductos(
        productos.map((producto) =>
          producto.id === id ? { ...producto, nombre, descripcion, precio, cantidad } : producto
        )
      );
      setEditandoProducto(null);
    }
  };

  return (
    <div className="lista-container">
      <h2>Lista de Productos</h2>
      <ul className="lista">
        {productos.map((producto) => (
          <li key={producto.id}>
            {editandoProducto === producto.id ? (
              <div>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Nombre"
                />
                <input
                  type="text"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Descripción"
                />
                <input
                  type="number"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  placeholder="Precio"
                />
                <input
                  type="number"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  placeholder="Cantidad"
                />
                <button onClick={() => handleUpdate(producto.id)}>Guardar</button>
              </div>
            ) : (
              <div>
                <p><strong>Nombre:</strong> {producto.nombre}</p>
                <p><strong>Descripción:</strong> {producto.descripcion}</p>
                <p><strong>Precio:</strong> ${producto.precio}</p>
                <p><strong>Cantidad:</strong> {producto.cantidad}</p>
                <button onClick={() => handleEdit(producto)}>Editar</button>
                <button onClick={() => handleDelete(producto.id)}>Eliminar</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaProductos;
