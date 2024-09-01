import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Encabezado from './componentes/Encabezado';
import PagWeb from './componentes/PagWeb';
import LoginForm from './componentes/formularios/LoginForm';
import RegisterForm from './componentes/formularios/RegisterForm';
import InterfazApp from './componentes/InterfazApp';
import ListaClientes from './componentes/ListaClientes';
import ListaProductos from './componentes/ListaProductos';
import ListaProveedores from './componentes/ListaProveedores';
import RegistroClientes from './componentes/formularios/RegistroClientes';
import RegistroProductos from './componentes/formularios/RegistroProductos';
import RegistroProveedores from './componentes/formularios/RegistroProveedores';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Encabezado />
                <PagWeb />
              </>
            }
          />
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
      </div>
    </Router>
  );
}

export default App;