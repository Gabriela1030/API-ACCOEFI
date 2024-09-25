import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './componentes/routes/routes.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <AppRoutes />  {/* Usamos las rutas importadas desde Routes.js */}
      </div>
    </Router>
  );
}

export default App;

