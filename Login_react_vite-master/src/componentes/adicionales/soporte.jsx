import React from 'react';
import '../estilos/Soporte.css'; 

const Soporte = () => {
  return (
    <div className="soporte-container">
      <h2>Soporte Técnico</h2>
      <p>Si tienes problemas, contáctanos a través de:</p>
      <ul>
        <li>Email: soporte@tuapp.com</li>
        <li>Teléfono: +1 234 567 890</li>
        <li>Chat en vivo: Disponible en la esquina inferior derecha</li>
      </ul>
    </div>
  );
};

export default Soporte;
