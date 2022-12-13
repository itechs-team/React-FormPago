import React from "react";
import axios, { AxiosError } from "axios";
import { data } from "autoprefixer";

const BaseUrl = "http://localhost:5124/";

// ver clave
export async function SaldaAbonoWeb(dataClave) {
  try {
        const importePago = dataClave.importe_pago;
        const metodoPago = dataClave.MetodoPago;
        const fecha = dataClave.fecha;
        const Clave = dataClave.clave;
        const cuentaBeneficiaria=dataClave.cuentaBeneficiaria;
        const notas = dataClave.notas;

        const response = await axios({
          url: `${BaseUrl}api/PagoEnLinea/SaldaAbonoWeb/${importePago}/${metodoPago}/${fecha}/${Clave}/${cuentaBeneficiaria}/${notas}`,
          method: "GET",
        });
        return response;

  } catch (e) {
    if (e.response) {
    const badRequest = (e.response.data);
    throw new SyntaxError(badRequest);
    }
    
    if(e.response.status >= 500){
      throw new SyntaxError("Intenta más tarde");
    }
  }
}






