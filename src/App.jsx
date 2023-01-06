import FormularioPago from "./componentes/FormularioPago";
import ObtenerRutaFormulario from "./services/ConexionBdPorEmpresa";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";

import React from "react";

function App() {
  return (
    <main className="p-5">
      <div className="container  bg-white shadow  text-white rounded-3   ">
        <HashRouter>
          {/* {<FormularioPago />} */}
          <div>
            <Routes>
              <Route path="/prueba" element={<FormularioPago />}></Route>
              <Route path="/CCU951214BQ5" element={<FormularioPago />} />
              <Route path="/armhe" element={<FormularioPago />} />
              <Route path="/POTODEMO" element={<FormularioPago />} /> //hay 3
              claves para la bd altamirano
              <Route path="/ascorp" element={<FormularioPago />} />
              <Route path="/RENE" element={<FormularioPago />} /> //hay 3 claves
              para la bd renelomeli
              <Route path="/mariposablanca" element={<FormularioPago />} />
              <Route path="/gloria" element={<FormularioPago />} /> //hay 2
              claves para la bd gloria
              <Route path="/grupo" element={<FormularioPago />} />
              <Route path="/express" element={<FormularioPago />} />
              <Route path="/jd" element={<FormularioPago />} />
              <Route path="/jdtm" element={<FormularioPago />} />
              <Route path="/jdtmservicios" element={<FormularioPago />} />
              <Route path="/hercas" element={<FormularioPago />} />
              <Route path="/sanluis" element={<FormularioPago />} />
              <Route path="/TLC" element={<FormularioPago />} />
              <Route path="/TOLS8708147E6" element={<FormularioPago />} />
              <Route path="/itechs" element={<FormularioPago />} /> //HAY MUCHAS
              CLAVES CON LA BD ITECHS
              <Route path="/VAEJ890318DK8" element={<FormularioPago />} />
            </Routes>
          </div>
        </HashRouter>
      </div>
    </main>
  );
}

export default App;
