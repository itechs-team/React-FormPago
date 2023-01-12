import React from "react";
import axios, { AxiosError } from "axios";
import { data } from "autoprefixer";
//server

//server gratuito
const BaseUrl = "http://apiadapli.itechs.mx/";

//ruta api local
//const BaseUrl = "http://localhost:5124/";

// ver clave
export async function SaldaAbonoWeb(dataClave) {
  try {
    const importePago = dataClave.importe_pago;
    const metodoPago = dataClave.MetodoPago;
    const fecha = dataClave.fecha;
    const Clave = dataClave.clave;
    const cuentaBeneficiaria = dataClave.cuentaBeneficiaria;
    const notas = dataClave.notas;

    const empresa = dataClave.ClaveEmpresa[2];

    const response = await axios({
      url: `${BaseUrl}api/PagoEnLinea/SaldaAbonoWeb/${importePago}/${metodoPago}/${fecha}/${Clave}/${cuentaBeneficiaria}/${notas}/${empresa}`,
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
