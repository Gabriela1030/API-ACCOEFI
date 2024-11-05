import React, { useEffect, useState } from 'react';
import '../../assets/styles/Lista.css';

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [editandoProducto, setEditandoProducto] = useState(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoriaId, setCategoriaId] = useState(''); // Campo adicional
  const [proveedorId, setProveedorId] = useState(''); // Campo adicional
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost/BACKEND-ACCOEFI/backend/controllers/ProductoController.php');
        if (!response.ok) throw new Error('Error al obtener los productos');
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchProductos();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost/BACKEND-ACCOEFI/backend/controllers/ProductoController.php`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error('Error al eliminar el producto');
      setProductos(productos.filter((producto) => producto.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (producto) => {
    setEditandoProducto(producto.id);
    setNombre(producto.nombre);
    setDescripcion(producto.descripcion);
    setPrecio(producto.precio);
    setCantidad(producto.cantidad);
    setCategoriaId(producto.categoria_id); // Cargar categoría al editar
    setProveedorId(producto.proveedor_id); // Cargar proveedor al editar
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`http://localhost/BACKEND-ACCOEFI/backend/controllers/ProductoController.php`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          nombre,
          descripcion,
          precio,
          cantidad,
          categoria_id: categoriaId, // Enviar categoría al actualizar
          proveedor_id: proveedorId, // Enviar proveedor al actualizar
        }),
      });

      if (!response.ok) throw new Error('Error al actualizar el producto');
      
      setProductos(
        productos.map((producto) =>
          producto.id === id
            ? { ...producto, nombre, descripcion, precio, cantidad, categoria_id: categoriaId, proveedor_id: proveedorId }
            : producto
        )
      );
      setEditandoProducto(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="lista-container">
      <h2>Lista de Productos</h2>
      {error && <p className="error">{error}</p>} {/* Mostrar errores */}
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
                <input
                  type="text"
                  value={categoriaId}
                  onChange={(e) => setCategoriaId(e.target.value)}
                  placeholder="Categoría ID" // Campo adicional
                />
                <input
                  type="text"
                  value={proveedorId}
                  onChange={(e) => setProveedorId(e.target.value)}
                  placeholder="Proveedor ID" // Campo adicional
                />
                <button onClick={() => handleUpdate(producto.id)}>Guardar</button>
              </div>
            ) : (
              <div>
                <p><strong>Nombre:</strong> {producto.nombre}</p>
                <p><strong>Descripción:</strong> {producto.descripcion}</p>
                <p><strong>Precio:</strong> ${producto.precio}</p>
                <p><strong>Cantidad:</strong> {producto.cantidad}</p>
                <p><strong>Categoría ID:</strong> {producto.categoria_id}</p> {/* Mostrar categoría */}
                <p><strong>Proveedor ID:</strong> {producto.proveedor_id}</p> {/* Mostrar proveedor */}
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
