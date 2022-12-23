import axios, { AxiosError } from "axios";

const BaseUrl = "http://localhost:5124/";

export async function ImagenUpload(dataImage) {
  try {
    const image = dataImage.image;
    const clave = dataImage.clave;

    const formDataDet = new FormData();
    formDataDet.append("image", image);
    formDataDet.append("clave", clave);
    const responsesDet = await axios({
      headers: { "Content-Type": "application/json" },
      url: `${BaseUrl}api/ImageUpload`,
      method: "POST",
      data: formDataDet,
    });
    return responsesDet;
  } catch (e) {
    if (e.response) {
      const badRequest = e.response.data;
      throw new SyntaxError(badRequest);
    }

    if (e.response.status >= 500) {
      throw new SyntaxError("Intenta más tarde");
    }
  }
}
