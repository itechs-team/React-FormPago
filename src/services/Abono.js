import React from "react";
import axios from "axios";

const BaseUrl = "http://localhost:5124/";

//registrar Abono
export async function postAbono(AbonoData) {
    try {
      const formDataAbono = new FormData();
      formDataAbono.append("Imppago", AbonoData.importe_pago);
      formDataAbono.append("Cargo", 160144); //
      formDataAbono.append("Fecha", AbonoData.fecha);
      formDataAbono.append("Formapago", AbonoData.FormaPago);
      formDataAbono.append("Cobrador", AbonoData.ResultPostDoctoscc.data.idUsuario);
      formDataAbono.append("Referencia", "");
      formDataAbono.append("Comentarios", "");
      formDataAbono.append("IdIngreso",AbonoData.ResultPostIngreso.data.idIngreso);
      formDataAbono.append("NumParcialidad", 1); 
      formDataAbono.append("SaldoAnt",AbonoData.resGetDataClave.data.importePago);
      formDataAbono.append("TipoCambioFac", 0);
      formDataAbono.append( "UserCreator", AbonoData.ResultPostDoctoscc.data.idUsuario);
      const responsesAbono = await axios({
        headers: { "Content-Type": "application/json" },
        url: `${BaseUrl}api/Ingreso/Abono/Registrar`,
        method: "POST",
        data: formDataAbono,
      });
      return responsesAbono;
    } catch (e) {
      throw new SyntaxError("Error al realizar el registro, intenta más tarde");
    }
  }