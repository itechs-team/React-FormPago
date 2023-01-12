import axios from "axios";

export function ObtenerRuta() {
  var arrayParametros = window.location.hash.split("/");
  return arrayParametros;
}

export function ObtenerRutaFormularioTarea() {
  var arrayParametrosTarea = window.location.hash.split("/");
  return arrayParametrosTarea;
}
