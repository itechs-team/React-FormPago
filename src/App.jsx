import FormularioPago from "./componentes/FormularioPago";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import FormularioTareas from "./componentes/FormularioTareas";
import React from "react";

function App() {
  return (
    <main className="p-5">
      <div className="container  bg-white shadow  text-white rounded-3   ">
        <HashRouter>
          <div>
            <Routes>
              //ruta de prueba
              <Route path="/3/prueba" element={<FormularioPago />} />
              //ruta Tareas
              <Route path="/Tareas/POTODEMO" element={<FormularioTareas />} />
              //rutas registro pago
              <Route path="/3/APRENDERE" element={<FormularioPago />} />
              <Route path="/2019/transportista" element={<FormularioPago />} />
              <Route path="/1015/POTODEMO" element={<FormularioPago />} />
              <Route path="/1/armhe" element={<FormularioPago />} />
              <Route path="/ascorp" element={<FormularioPago />} />
              <Route path="/RENE" element={<FormularioPago />} />
              <Route path="/mariposablanca" element={<FormularioPago />} />
              <Route path="/gloria" element={<FormularioPago />} />
              <Route path="/grupo" element={<FormularioPago />} />
              <Route path="/express" element={<FormularioPago />} />
              <Route path="/jd" element={<FormularioPago />} />
              <Route path="/jdtm" element={<FormularioPago />} />
              <Route path="/jdtmservicios" element={<FormularioPago />} />
              <Route path="/hercas" element={<FormularioPago />} />
              <Route path="/sanluis" element={<FormularioPago />} />
              <Route path="/TLC" element={<FormularioPago />} />
              <Route path="/TOLS8708147E6" element={<FormularioPago />} />
              <Route path="/itechs" element={<FormularioPago />} />
              <Route path="/VAEJ890318DK8" element={<FormularioPago />} />
              // faltan
              <Route path="/CCU951214BQ5" element={<FormularioPago />} />
            </Routes>
          </div>
        </HashRouter>
      </div>
    </main>
  );
}

export default App;
