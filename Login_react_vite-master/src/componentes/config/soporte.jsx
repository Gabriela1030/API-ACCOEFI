import React from 'react';
import '../../assets/styles/soporte.css';

const Soporte = () => {
  return (
    <div className="soporte-container">
      <h2>Soporte Técnico</h2>
      <p>Si tienes algún problema o duda, no dudes en contactarnos. Nuestro equipo de soporte está aquí para ayudarte.</p>
      <div className="soporte-opciones">
        <div className="soporte-opcion">
          <h3>Email</h3>
          <p>soporte@accoefi.com</p>
        </div>
        <div className="soporte-opcion">
          <h3>Teléfono</h3>
          <p>320 456 7890</p>
        </div>
      </div>
    </div>
  );
};

export default Soporte;
