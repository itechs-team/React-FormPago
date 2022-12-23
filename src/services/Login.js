import axios from "axios";

const BaseUrl = "http://localhost:5124/";

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
    // return console.log(response);
    return response;
  } catch (e) {
    if (e.response.status >= 500) {
      throw new SyntaxError("Intenta m�s tarde");
    }
    if (e.response) {
      const badRequest = e.response.data;
      throw new SyntaxError(badRequest);
    }
  }
}
