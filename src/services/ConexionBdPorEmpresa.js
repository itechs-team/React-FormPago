import axios from "axios";
const BaseUrl = "http://localhost:5124/";

function ObtenerRutaFormulario() {
  var params = window.location.hash;
  const borrarDiagonal = params.slice(2);
  return borrarDiagonal;
}
export default ObtenerRutaFormulario;
