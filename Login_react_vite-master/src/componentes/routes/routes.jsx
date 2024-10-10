import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PagWeb from '../PagWeb';
import LoginForm from '../formularios/LoginForm';
import RegisterForm from '../formularios/RegisterForm';
import InterfazApp from '../InterfazApp';
import ListaClientes from '../ListaClientes';
import ListaProductos from '../ListaProductos';
import ListaProveedores from '../ListaProveedores';
import RegistroClientes from '../formularios/RegistroClientes';
import RegistroProductos from '../formularios/RegistroProductos';
import RegistroProveedores from '../formularios/RegistroProveedores';

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
    </Routes>
  );
};

export default AppRoutes;
