import axios from "axios";
import React from "react";

const BaseUrl = "http://localhost:5124/";

export async function TipoTareas(rutaClave) {
  try {
    const empresa = rutaClave[2];
    const response = await axios({
      url: `${BaseUrl}api/TipoTareas/VerTipoTarea/${empresa}`,
      method: "GET",
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function RegistrarTarea(Data) {
  try {
    const RFC = Data.RFC;
    const Fecha = Data.Fecha;
    const Tipo = Data.Tipo;
    const Descripcion = Data.Descripcion;

    const empresa = Data.ClaveEmpresa[2];

    const response = await axios({
      url: `${BaseUrl}api/Tarea/RegistrarTareas/${RFC}/${Fecha}/${Tipo}/${Descripcion}/${empresa}`,
      method: "GET",
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
