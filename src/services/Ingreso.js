import React from "react";
import axios from "axios";

const BaseUrl = "http://localhost:5124/";

//ultimo folio Ingreso
export async function getFolioIngreso(FolioIngresoData) {
    try {
      //folio constante o variable
      const tipo = FolioIngresoData.resGetDataClave.data.tipo; // el tipo debe ser 1??? varibale o constante //el tipo es el mismo que en doctoscc que al de ingreso?
      const idEmpresa = FolioIngresoData.statusDoctoscc.data.idEmpresa;
      const responseFolio = await axios({
        url: `${BaseUrl}api/Ingreso/VerFolio/${tipo}/${idEmpresa}`,
        method: "GET",
      });
      return responseFolio;
    } catch (e) {
      console.log(e);
    }
  }
  //registrar ingreso
  export async function postIngreso(IngresoData) {
    try {
      const formDataIngreso = new FormData();
      formDataIngreso.append("Folio", IngresoData.folioIncrementadoIngreso); //corregido "creo"
      formDataIngreso.append("UserCreator",IngresoData.ResultGetDoctoscc.data.idUsuario);
      formDataIngreso.append("DateLastUpdate", IngresoData.fecha);
      formDataIngreso.append("UserLastUpdater", IngresoData.ResultGetDoctoscc.data.idUsuario);
      formDataIngreso.append("IdCliente",IngresoData.ResultGetDoctoscc.data.cliente);
      formDataIngreso.append("Tipo", IngresoData.ResultGetDoctoscc.data.tipo);// cambia el tipo??? que tipo va?
      formDataIngreso.append("IdEmpresa",IngresoData.ResultGetDoctoscc.data.idEmpresa);
      formDataIngreso.append("Fecha", IngresoData.fecha);
      formDataIngreso.append("ImportePago", IngresoData.importe_pago);
      formDataIngreso.append("FormaPago", IngresoData.FormaPago);
      formDataIngreso.append("Banco", IngresoData.ResultGetBancos.data.idBanco);
      formDataIngreso.append("Notas", IngresoData.notas);
      formDataIngreso.append("Moneda", IngresoData.ResultGetBancos.data.moneda); //corregir esto moneda 2
      formDataIngreso.append("IdDeposito", IngresoData.statusTransbancaria.data.idTransbancaria);
      // formDataIngreso.append("IdAlmacen", IngresoData.ResultGetDoctoscc.data.idAlmacen); //checar esto. el campo esta null y me marca error
      formDataIngreso.append("IdIngresoComprobante",IngresoData.ResultPostIngresoComprobante.data.idIngresoComprobante);
      const responsesIng = await axios({
        headers: { "Content-Type": "application/json" },
        url: `${BaseUrl}api/Ingreso/Registrar`,
        method: "POST",
        data: formDataIngreso,
      });
      return responsesIng;
    } catch (e) {
      throw new SyntaxError("Error al realizar el registro, intenta más tarde");
    }
  }