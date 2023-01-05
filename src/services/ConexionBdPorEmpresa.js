import axios from "axios";
const BaseUrl = "http://localhost:5124/";

function ObtenerRutaFormulario() {
  var params = window.location.pathname;
  const borrarDiagonal = params.slice(1);
  return borrarDiagonal;
}
export default ObtenerRutaFormulario;
