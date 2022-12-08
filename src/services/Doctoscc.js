import React from "react";
import axios from "axios";

const BaseUrl = "http://localhost:5124/";

//ver doctoscc con el id factura
export async function getDoctoscc(dataIdFactura) {
    try {
      const idFacturaUser = dataIdFactura;
      const response = await axios({
        url: `${BaseUrl}api/Ingreso/Doctoscc/Ver/${idFacturaUser}`,
        method: "GET",
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  }
  
  
  //ultimo folio Doctoscc
  export async function getFolioDoctoscc(FolioDocData) {
    try {
      const tipo = FolioDocData.resGetDoctoscc.data.tipo;
      const responseFolio = await axios({
        url: `${BaseUrl}api/Doctoscc/Ver/${tipo}`,
        method: "GET",
      });
      return responseFolio;
    } catch (e) {
      console.log(e);
    }
  }

  // registrar Doctoscc
export async function postDoctoscc(DoctosccData) {
    try {
      const formDataDoc = new FormData();
      formDataDoc.append("UserCreator",DoctosccData.ResultGetDoctoscc.data.idUsuario);
      formDataDoc.append("Cliente", DoctosccData.ResultGetDoctoscc.data.cliente);
      formDataDoc.append("Folio", DoctosccData.folioIncrementado); 
      formDataDoc.append("IdEmpresa", DoctosccData.ResultGetDoctoscc.data.idEmpresa);
      formDataDoc.append("FechaFactura", DoctosccData.fecha);
      formDataDoc.append("IdUsuario", DoctosccData.ResultGetDoctoscc.data.idUsuario);
      formDataDoc.append("Tipo", 12);
      formDataDoc.append("Moneda", DoctosccData.ResultGetDoctoscc.data.moneda); //corregir esto, moneda 2
      formDataDoc.append("Vendedor", DoctosccData.ResultGetDoctoscc.data.idUsuario);
      formDataDoc.append("Metodopago", DoctosccData.FormaPago);
      formDataDoc.append("FechaHoraGenerado", DoctosccData.fecha);
      formDataDoc.append("UserLastUpdater",DoctosccData.ResultGetDoctoscc.data.idUsuario);
      formDataDoc.append("DateLastUpdate", DoctosccData.fecha);
      formDataDoc.append("FechaPago", DoctosccData.fecha);
      formDataDoc.append("IdSucursal",DoctosccData.ResultGetDoctoscc.data.idSucursal);
      formDataDoc.append("Almacen", DoctosccData.ResultGetDoctoscc.data.almacen); //dato obligatorio por FK, checar esto!! no deja registrar null
      const responsesDocc = await axios({
        headers: { "Content-Type": "application/json" },
        url: `${BaseUrl}api/Ingreso/Doctoscc/Registrar`,
        method: "POST",
        data: formDataDoc,
      });
      return responsesDocc;
    } catch (e) {
      throw new SyntaxError("Error al realizar el registro, intenta más tarde");
    }
  }