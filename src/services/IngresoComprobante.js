import React from "react";
import axios from "axios";

const BaseUrl = "http://localhost:5124/";

//registrar ingresoComprobante
export async function postIngresoComprobante(ingresoComprobanteData) {
    try {
      const formDataIngComp = new FormData();
      formDataIngComp.append("IdDoctoscc",ingresoComprobanteData.ResultPostDoctoscc.data.idFactura);
      const responsesIngComp = await axios({
        headers: { "Content-Type": "application/json" },
        url: `${BaseUrl}api/Ingreso/IngComprobante/Registrar`,
        method: "POST",
        data: formDataIngComp,
      });
      return responsesIngComp;
    } catch (e) {
      throw new SyntaxError("Error al realizar el registro, intenta más tarde");
    }
  }
//Actualizar ingresoComprobante
export async function putIngresoComprobante(ingresoComprobanteData) {
    try {
      const idIngComprobante =ingresoComprobanteData.ResultPostIngresoComprobante.data.idIngresoComprobante;
      const formDataPutIngComp = new FormData();
      formDataPutIngComp.append("IdDoctoscc",ingresoComprobanteData.ResultPostDoctoscc.data.idFactura);
      formDataPutIngComp.append("DateRecord", ingresoComprobanteData.fecha);
      formDataPutIngComp.append("FechaPago", ingresoComprobanteData.fecha);
      formDataPutIngComp.append("FormaPago", ingresoComprobanteData.FormaPago);
      formDataPutIngComp.append("Moneda", 2); //corregir esto
      formDataPutIngComp.append("TipoCambio", 0); //corregir esto
      formDataPutIngComp.append("Monto", ingresoComprobanteData.importe_pago);
      formDataPutIngComp.append("BancoBeneficiario",ingresoComprobanteData.cuentaBeneficiara );
      const responsesPutIngComp = await axios({
        headers: { "Content-Type": "application/json" },
        url: `${BaseUrl}api/Ingreso/IngresoComprobante/Actualizar/${idIngComprobante}`,
        method: "PUT",
        data: formDataPutIngComp,
      });
      return responsesPutIngComp;
    } catch (e) {
      throw new SyntaxError("Error al realizar el registro, intenta más tarde");
    }
  }
  