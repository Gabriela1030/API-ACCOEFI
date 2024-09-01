import React from 'react';
import '../estilos/PagWeb.css';

const PagWeb = () => {
  return (
    <div className="container">
      <header className="showcase">
        
      </header>
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
        <div className="flash-card">
          <div className="flash-card-inner">
            <div className="flash-card-front">
              <h3>Gestión de Proveedores</h3>
            </div>
            <div className="flash-card-back">
              <p>Permite gestionar de manera eficiente a los proveedores de tu empresa.</p>
            </div>
          </div>
        </div>
        <div className="flash-card">
          <div className="flash-card-inner">
            <div className="flash-card-front">
              <h3>Gestión de Clientes</h3>
            </div>
            <div className="flash-card-back">
              <p>Facilita el manejo de la información y relaciones con los clientes.</p>
            </div>
          </div>
        </div>
        <div className="flash-card">
          <div className="flash-card-inner">
            <div className="flash-card-front">
              <h3>Gestión de Compras</h3>
            </div>
            <div className="flash-card-back">
              <p>Controla de manera efectiva el proceso de compras de la empresa.</p>
            </div>
          </div>
        </div>
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
  );
};

export default PagWeb;

