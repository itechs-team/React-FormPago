import axios from "axios";

function ObtenerRutaFormulario() {
  var params = window.location.hash;
  const borrarDiagonal = params.slice(2);
  return borrarDiagonal;
}
export default ObtenerRutaFormulario;
