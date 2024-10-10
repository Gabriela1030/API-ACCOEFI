import React from 'react';
import Encabezado from './Encabezado'; // Importamos Encabezado
import '../estilos/PagWeb.css';

const PagWeb = () => {
  return (
    <>
      <Encabezado /> {/* Solo aquí se renderiza el encabezado */}
      <div className="container">
        <header className="showcase"></header>
        <section className="planes-precios">
          <h2>Planes y Precios</h2>
          <div className="plan">
            <h3>Plan Básico</h3>
            <p>Acceso limitado a informes</p>
            <p>Creación de clientes y proveedores</p>
            <p>$600.000/año</p>
          </div>
          <div className="plan">
            <h3>Plan Premium</h3>
            <p>Acceso ilimitado a todas las distintas funcionalidades disponibles</p>
            <p>$1.000.000/año</p>
          </div>
        </section>
        <section className="funcionalidades">
          <h2>Funcionalidades</h2>
          {/* Aquí puedes añadir más contenido */}
        </section>
        <section className="contacto">
          <h2>Contacto</h2>
          <p>Puedes contactarnos en:</p>
          <ul>
            <li>Email: info@accoefi.com</li>
            <li>Teléfono: +57 1234567890</li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default PagWeb;
