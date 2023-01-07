import axios from "axios";
//server

//server gratuito
const BaseUrl = "http://apiadapli.itechs.mx/";

//ruta api local
//const BaseUrl = "http://localhost:5124/";

export async function UrlLogin(ruta) {
  try {
    const formData = new FormData();
    formData.append("Nick", "UserApi"); //corr
    formData.append("Password", "Tangamanga1#"); //corr//corr
    formData.append("ClaveEmpresa", ruta); //corr
    const response = await axios({
      url: `${BaseUrl}api/validar/login`,
      method: "POST",
      data: formData,
    });
    return response;
  } catch (e) {
    if (e.response.status >= 500) {
      throw new SyntaxError("Intenta más tarde");
    }
    if (e.response) {
      const badRequest = e.response.data;
      throw new SyntaxError(badRequest);
    }
  }
}
