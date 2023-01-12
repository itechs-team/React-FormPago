import React from "react";
import axios from "axios";
//server

//server gratuito
const BaseUrl = "http://apiadapli.itechs.mx/";

//ruta api local
//const BaseUrl = "http://localhost:5124/";

//ver todos los bancos
export async function ListaBancos(ruta) {
  try {
    const empresa = ruta[2];
    const idSucursal = ruta[1];
    const response = await axios({
      url: `${BaseUrl}api/Banco/VerBanco/${idSucursal}/${empresa}`,
      method: "GET",
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}

//ver formaPago
export async function getMetodopagoList(rutaClave) {
  try {
    const empresa = rutaClave[2];
    // const token = data;
    const response = await axios({
      url: `${BaseUrl}api/MetodoPago/VerMetodoPago/${empresa}`,
      method: "GET",
      // Authorization: `Bearer ${token}`,
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}

//ver bancos con el id del cliente
export async function getBanco(DataBanco) {
  try {
    const idClienteUser = DataBanco;
    const response = await axios({
      url: `${BaseUrl}api/Banco/Ver/${idClienteUser}`,
      method: "GET",
      // Authorization: `Bearer ${token}`,
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}
