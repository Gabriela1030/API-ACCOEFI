import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PagWeb from '../pages/PagWeb';
import LoginForm from '../forms/LoginForm';
import RegisterForm from '../forms/RegisterForm';
import InterfazApp from '../pages/InterfazApp';
import ListaClientes from '../list/ListaClientes';
import ListaProductos from '../list/ListaProductos';
import ListaProveedores from '../list/ListaProveedores';
import RegistroClientes from '../forms/RegistroClientes';
import RegistroProductos from '../forms/RegistroProductos';
import RegistroProveedores from '../forms/RegistroProveedores';
import Configuracion from '../config/configuracion';
import Soporte from '../config/soporte';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PagWeb />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/interfaz" element={<InterfazApp />} />
      <Route path="/clientes" element={<ListaClientes />} />
      <Route path="/productos" element={<ListaProductos />} />
      <Route path="/proveedores" element={<ListaProveedores />} />
      <Route path="/registro-clientes" element={<RegistroClientes />} />
      <Route path="/registro-productos" element={<RegistroProductos />} />
      <Route path="/registro-proveedores" element={<RegistroProveedores />} />
      <Route path="/configuracion" element={<Configuracion />} /> {/* Nueva ruta */}
      <Route path="/soporte" element={<Soporte />} />             {/* Nueva ruta */}
    </Routes>
  );
};

export default AppRoutes;
