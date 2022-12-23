import axios from "axios";
const BaseUrl = "http://localhost:5124/";

function ObtenerRutaFormulario() {
  var params = window.location.pathname;
  const borrarDiagonal = params.slice(1);
  return borrarDiagonal;
}
export default ObtenerRutaFormulario;

// export function verificarClaveEmpresa(ruta) {
//   try {
//     const newRuta = ruta;
//     const response = axios({
//       url: `${BaseUrl}api/EmpresasBdCfdi/ExisteEmpresa/${newRuta}`,
//       method: "GET",
//     });
//     // return console.log(response);
//     return response;
//   } catch (e) {
//     console.log(e);
//   }
// }
