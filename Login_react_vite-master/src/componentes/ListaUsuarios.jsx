import React, { useState, useEffect } from 'react';

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch('http://localhost/BACKEND-ACCOEFI/usuarios.php', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const eliminarUsuario = (id) => {
    fetch('http://localhost/BACKEND-ACCOEFI/usuarios.php', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Usuario eliminado.') {
          alert('Usuario eliminado exitosamente');
          // Actualizar la lista de usuarios
          setUsuarios(usuarios.filter(usuario => usuario.id !== id));
        } else {
          alert('Error al eliminar usuario');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            {usuario.nombre} - {usuario.email} 
            <button onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaUsuarios;
