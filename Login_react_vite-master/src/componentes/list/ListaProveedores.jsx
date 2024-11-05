import React, { useState, useEffect } from 'react'; 
import '../../assets/styles/Lista.css';

const ListaProveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [editandoProveedor, setEditandoProveedor] = useState(null);
  const [mensaje, setMensaje] = useState(''); // Estado para mensajes de error o carga
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');

  // Obtener proveedores al cargar el componente
  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await fetch('http://localhost/BACKEND-ACCOEFI/backend/controllers/ProveedorController.php');
        if (!response.ok) {
          throw new Error('Error al obtener los proveedores');
        }
        const data = await response.json();
        setProveedores(data);
      } catch (error) {
        setMensaje('Hubo un problema al cargar los proveedores.');
      }
    };

    fetchProveedores();
  }, []);

  // Eliminar proveedor
  const eliminarProveedor = async (id) => {
    try {
      const response = await fetch(`http://localhost/BACKEND-ACCOEFI/backend/controllers/ProveedorController.php?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProveedores(proveedores.filter((proveedor) => proveedor.id !== id));
        setMensaje('Proveedor eliminado exitosamente');
      } else {
        setMensaje('Error al eliminar el proveedor');
      }
    } catch (error) {
      setMensaje('Error de conexión con el servidor.');
    }
  };

  // Editar proveedor
  const iniciarEdicion = (proveedor) => {
    setEditandoProveedor(proveedor.id);
    setNombre(proveedor.nombre);
    setEmail(proveedor.email);
    setTelefono(proveedor.telefono);
    setDireccion(proveedor.direccion);
  };

  const guardarCambios = async (id) => {
    try {
      const response = await fetch(`http://localhost/BACKEND-ACCOEFI/backend/controllers/ProveedorController.php?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email, telefono, direccion }),
      });

      if (response.ok) {
        // Actualizar la lista de proveedores
        setProveedores(proveedores.map((proveedor) =>
          proveedor.id === id ? { ...proveedor, nombre, email, telefono, direccion } : proveedor
        ));
        setEditandoProveedor(null); // Terminar la edición
        setMensaje('Proveedor actualizado exitosamente');
      } else {
        setMensaje('Error al actualizar el proveedor');
      }
    } catch (error) {
      setMensaje('Error de conexión con el servidor.');
    }
  };

  return (
    <div className="lista-container">
      <h2>Lista de Proveedores</h2>
      {mensaje && <p className="mensaje-error">{mensaje}</p>} {/* Mostrar mensaje en caso de error */}

      {proveedores.length > 0 ? (
        <ul className="lista">
          {proveedores.map((proveedor) => (
            <li key={proveedor.id}>
              {editandoProveedor === proveedor.id ? (
                <>
                  {/* Modo edición */}
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="Teléfono"
                  />
                  <input
                    type="text"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    placeholder="Dirección"
                  />
                  <button onClick={() => guardarCambios(proveedor.id)}>Guardar</button>
                  <button onClick={() => setEditandoProveedor(null)}>Cancelar</button>
                </>
              ) : (
                <>
                  {/* Modo visualización */}
                  <span>
                    <strong>{proveedor.nombre}</strong> - {proveedor.direccion} - {proveedor.telefono} - {proveedor.email}
                  </span>
                  <span>
                    <button onClick={() => iniciarEdicion(proveedor)}>Editar</button>
                    <button onClick={() => eliminarProveedor(proveedor.id)}>Eliminar</button>
                  </span>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay proveedores disponibles.</p>
      )}
    </div>
  );
};

export default ListaProveedores;
