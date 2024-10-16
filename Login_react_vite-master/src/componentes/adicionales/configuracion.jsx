import React from 'react';
import '../estilos/Configuracion.css'; // Asegúrate de importar el archivo CSS

const Configuracion = () => {
  return (
    <div className="configuracion-container">
      <h2>Configuración</h2>
      <form className="config-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input type="text" id="nombre" placeholder="Ingresa tu nombre" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Ingresa tu email" />
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default Configuracion;
