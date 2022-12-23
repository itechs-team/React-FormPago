import FormularioPago from "./componentes/FormularioPago";
import ObtenerRutaFormulario from "./services/ConexionBdPorEmpresa";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import React from "react";

function App() {
  return (
    <main className="p-5">
      <div className="container  bg-white shadow  text-white rounded-3   ">
        <BrowserRouter>
          <div>
            <Routes>
              <Route path="/_transportes" element={<FormularioPago />} />
              <Route path="/itechs" element={<FormularioPago />} />
              <Route path="/POTODEMO" element={<FormularioPago />} />
              <Route path="/TRANSPORTESSADECV" element={<FormularioPago />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </main>
  );
}

export default App;
