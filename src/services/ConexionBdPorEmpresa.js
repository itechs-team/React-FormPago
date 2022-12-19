import axios from "axios";
const BaseUrl = "http://localhost:5124/";

function ObtenerRutaFormulario() {
    var params = window.location.pathname;
    const borrarDiagonal = params.slice(1);
  return borrarDiagonal;
}
export default ObtenerRutaFormulario;


export async function getBdEmpresa (ruta){
  try {

    const newRuta = ruta;
    const response = await axios({
      url: `${BaseUrl}api/EmpresasBdCfdi/${newRuta}`,
      method: "GET",
    });
    return console.log(response);
  } catch (e) {
    console.log(e);
  }
}
