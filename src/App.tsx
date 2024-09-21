import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TrakeoAlimentosNaturales from "./ListaDescargas";
import Login from "./Login"; // Puedes crear un componente Home si lo necesitas

const App: React.FC = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/trakeo" element={<TrakeoAlimentosNaturales />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
