import React, { useState } from 'react';
import '../../assets/styles/configuracion.css';

const Configuracion = () => {
  const [modoOscuro, setModoOscuro] = useState(false);

  const toggleModoOscuro = () => {
    setModoOscuro(!modoOscuro);
    document.body.classList.toggle('modo-oscuro', !modoOscuro);
  };

  return (
    <div className={`configuracion-container ${modoOscuro ? 'oscuro' : ''}`}>
      <h2>Configuración</h2>
      <div className="opciones">
        <div className="opcion">
          <label>Modo Oscuro</label>
          <button onClick={toggleModoOscuro}>
            {modoOscuro ? 'Desactivar' : 'Activar'}
          </button>
        </div>
        <div className="opcion">
          <label>Notificaciones</label>
          <input type="checkbox" />
        </div>
        
      </div>
    </div>
  );
};

export default Configuracion;
