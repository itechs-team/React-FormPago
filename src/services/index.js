import React from "react";
import axios from "axios";

const BaseUrl = "http://localhost:5124/";

// ver clave
export async function getClave(dataClave) {
  try {
    let claveUser = dataClave.clave;
    const apiClave = await axios({
      method: "GET",
      url: `${BaseUrl}api/Clave/Ver/${claveUser}`,
    });
    return apiClave;
  } catch (e) {
    console.log(e);
  }
}

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

//ver todos los bancos 
export async function getBancoSinID() {
  try {
    const response = await axios({
      url: `${BaseUrl}api/Banco/Ver`,
      method: "GET",
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
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}
//ver formaPago
export async function getFormaPagoList() {
  try {
    const response = await axios({
      url: `${BaseUrl}api/FormaPago/Ver`,
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

//registrar transBancaria
export async function postTransbancaria(transbData) {
  try {
    const formDataTrans = new FormData();
    if (transbData.FormaPago != 1) {
      formDataTrans.append("Cuenta", transbData.cuentaBeneficiara); //corregido... por ahora
      formDataTrans.append("Referencia", "");
      formDataTrans.append("Qty", transbData.importe_pago);
      formDataTrans.append("Formapago", transbData.FormaPago);
      formDataTrans.append("Fecha", transbData.fecha);
      formDataTrans.append("Daterecord", transbData.fecha);
      formDataTrans.append("Status", 0);
      formDataTrans.append("IdEmpros", transbData.resGetDoctoscc.data.cliente);
      formDataTrans.append("IdSucursal",transbData.resGetDoctoscc.data.idSucursal);
      formDataTrans.append("Tipo", transbData.resGetDoctoscc.data.tipo);
      formDataTrans.append("UserCreator",transbData.resGetDoctoscc.data.idUsuario);
      formDataTrans.append("DateLastUpdate", transbData.fecha);
      formDataTrans.append("UserLastUpdater",transbData.resGetDoctoscc.data.idUsuario);
    } else {
      if (transbData.FormaPago == 1) {
        formDataTrans.append("Cuenta", 2088); //corregir esto, cuenta definida es caso de que el pago se haga efectivo
        formDataTrans.append("Referencia", "");
        formDataTrans.append("Qty", transbData.importe_pago);
        formDataTrans.append("Formapago", transbData.FormaPago);
        formDataTrans.append("Fecha", transbData.fecha);
        formDataTrans.append("Status", 0);
        formDataTrans.append("Daterecord", transbData.fecha);
        formDataTrans.append("IdEmpros",transbData.resGetDoctoscc.data.cliente);
        formDataTrans.append("IdSucursal",transbData.resGetDoctoscc.data.idSucursal);
        formDataTrans.append("Tipo", transbData.resGetDoctoscc.data.tipo);
        formDataTrans.append("UserCreator",transbData.resGetDoctoscc.data.idUsuario);
        formDataTrans.append("DateLastUpdate", transbData.fecha);
        formDataTrans.append("UserLastUpdater",transbData.resGetDoctoscc.data.idUsuario);
      }
    }
    const responsesTrans = await axios({
      headers: { "Content-Type": "application/json" },
      url: `${BaseUrl}api/Ingreso/TransBancaria/Registrar`,
      method: "POST",
      data: formDataTrans,
    });
    return responsesTrans;
  } catch (e) {
    console.log(e);
  }
}
// registrar Doctoscc
export async function postDoctoscc(DoctosccData) {
  try {
    const formDataDoc = new FormData();
    formDataDoc.append("UserCreator",DoctosccData.resGetDoctoscc.data.idUsuario);
    formDataDoc.append("Cliente", DoctosccData.resGetDoctoscc.data.cliente);
    formDataDoc.append("Folio", DoctosccData.folioIncrementado); 
    formDataDoc.append("IdEmpresa", DoctosccData.resGetDoctoscc.data.idEmpresa);
    formDataDoc.append("FechaFactura", DoctosccData.fecha);
    formDataDoc.append("IdUsuario", DoctosccData.resGetDoctoscc.data.idUsuario);
    formDataDoc.append("Tipo", 12);
    formDataDoc.append("Moneda", DoctosccData.resGetDoctoscc.data.moneda); //corregir esto, moneda 2
    formDataDoc.append("Vendedor", DoctosccData.resGetDoctoscc.data.idUsuario);
    formDataDoc.append("Metodopago", DoctosccData.FormaPago);
    formDataDoc.append("FechaHoraGenerado", DoctosccData.fecha);
    formDataDoc.append("UserLastUpdater",DoctosccData.resGetDoctoscc.data.idUsuario);
    formDataDoc.append("DateLastUpdate", DoctosccData.fecha);
    formDataDoc.append("FechaPago", DoctosccData.fecha);
    formDataDoc.append("IdSucursal",DoctosccData.resGetDoctoscc.data.idSucursal);
    formDataDoc.append("Almacen", DoctosccData.resGetDoctoscc.data.almacen); //dato obligatorio por FK, checar esto!! no deja registrar null
    const responsesDocc = await axios({
      headers: { "Content-Type": "application/json" },
      url: `${BaseUrl}api/Ingreso/Doctoscc/Registrar`,
      method: "POST",
      data: formDataDoc,
    });
    return responsesDocc;
  } catch (e) {
    console.log(e);
  }
}
//registrar doctoscc_det
export async function postDoctosccDet(DoctosccDetData) {
  try {
    const formDataDet = new FormData();
    formDataDet.append("IdFactura",DoctosccDetData.statusDoctoscc.data.idFactura); 
    formDataDet.append("Cantidad", 1);
    formDataDet.append("Descripcion", "Pago");
    formDataDet.append("Preciou", 0);
    formDataDet.append("Idprodserv", 60071); //debe ser null //corregir esto 
    const responsesDet = await axios({
      headers: { "Content-Type": "application/json" },
      url: `${BaseUrl}api/Ingreso/Det/Registrar`,
      method: "POST",
      data: formDataDet,
    });
    return responsesDet;
  } catch (e) {
    console.log(e);
  }
}
//registrar ingresoComprobante
export async function postingresoComprobante(ingresoComprobanteData) {
  try {
    const formDataIngComp = new FormData();
    formDataIngComp.append("IdDoctoscc",ingresoComprobanteData.statusDoctoscc.data.idFactura);
    const responsesIngComp = await axios({
      headers: { "Content-Type": "application/json" },
      url: `${BaseUrl}api/Ingreso/IngComprobante/Registrar`,
      method: "POST",
      data: formDataIngComp,
    });
    return responsesIngComp;
  } catch (e) {
    console.log(e);
  }
}
//registrar ingreso
export async function postIngreso(IngresoData) {
  try {
    const formDataIngreso = new FormData();
    formDataIngreso.append("Folio", IngresoData.folioIncrementadoIngreso); //corregido "creo"
    formDataIngreso.append("UserCreator",IngresoData.resGetDoctoscc.data.idUsuario);
    formDataIngreso.append("DateLastUpdate", IngresoData.fecha);
    formDataIngreso.append("UserLastUpdater", IngresoData.resGetDoctoscc.data.idUsuario);
    formDataIngreso.append("IdCliente",IngresoData.resGetDoctoscc.data.cliente);
    formDataIngreso.append("Tipo", IngresoData.resGetDoctoscc.data.tipo);// cambia el tipo??? que tipo va?
    formDataIngreso.append("IdEmpresa",IngresoData.resGetDoctoscc.data.idEmpresa);
    formDataIngreso.append("Fecha", IngresoData.fecha);
    formDataIngreso.append("ImportePago", IngresoData.importe_pago);
    formDataIngreso.append("FormaPago", IngresoData.FormaPago);
    formDataIngreso.append("Banco", IngresoData.resGetBancos.data.idBanco);
    formDataIngreso.append("Notas", IngresoData.notas);
    formDataIngreso.append("Moneda", IngresoData.resGetBancos.data.moneda); //corregir esto moneda 2
    formDataIngreso.append("IdDeposito", IngresoData.statusTransbancaria.data.idTransbancaria);
    // formDataIngreso.append("IdAlmacen", IngresoData.resGetDoctoscc.data.idAlmacen); //checar esto. el campo esta null y me marca error
    formDataIngreso.append("IdIngresoComprobante",IngresoData.statusIngresoComprobante.data.idIngresoComprobante);
    const responsesIng = await axios({
      headers: { "Content-Type": "application/json" },
      url: `${BaseUrl}api/Ingreso/Registrar`,
      method: "POST",
      data: formDataIngreso,
    });
    return responsesIng;
  } catch (e) {
    console.log(e);
  }
}
//Actualizar ingresoComprobante
export async function putIngresoComprobante(ingresoComprobanteData) {
  try {
    const idIngComprobante =ingresoComprobanteData.statusIngresoComprobante.data.idIngresoComprobante;
    const formDataPutIngComp = new FormData();
    formDataPutIngComp.append("IdDoctoscc",ingresoComprobanteData.statusDoctoscc.data.idFactura);
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
    console.log(e);
  }
}
//registrar Abono
export async function postAbono(AbonoData) {
  try {
    const formDataAbono = new FormData();
    formDataAbono.append("Imppago", AbonoData.importe_pago);
    formDataAbono.append("Cargo", 160144); //aqui que va? NO SE A QUE VA VINCULADO
    formDataAbono.append("Fecha", AbonoData.fecha);
    formDataAbono.append("Formapago", AbonoData.FormaPago);
    formDataAbono.append("Cobrador", AbonoData.statusDoctoscc.data.idUsuario);
    formDataAbono.append("Referencia", "");
    formDataAbono.append("Comentarios", "");
    formDataAbono.append("IdIngreso",AbonoData.statusIngresoRegistro.data.idIngreso);
    formDataAbono.append("NumParcialidad", 1); //aqui que va?
    formDataAbono.append("SaldoAnt",AbonoData.resGetDataClave.data.importePago);
    formDataAbono.append("TipoCambioFac", 0);
    formDataAbono.append( "UserCreator", AbonoData.statusDoctoscc.data.idUsuario);
    const responsesAbono = await axios({
      headers: { "Content-Type": "application/json" },
      url: `${BaseUrl}api/Ingreso/Abono/Registrar`,
      method: "POST",
      data: formDataAbono,
    });
    return responsesAbono;
  } catch (e) {
    console.log(e);
  }
}
//registrar tarea
export async function postTarea(TareaData) {
  try {
    const formDataTarea = new FormData();
    formDataTarea.append("IdReceptor", 2211); //--que va
    formDataTarea.append("Tipo", 1); //-- que va
    formDataTarea.append("FechaInicio", TareaData.fecha);
    formDataTarea.append("FechaFin", TareaData.fecha); //-- es la misma hora??
    formDataTarea.append("FechaCreacion", TareaData.fecha);
    formDataTarea.append("Asunto", ""); //-- que va
    formDataTarea.append("Comentarios", ""); //-- que va
    formDataTarea.append("Origen", ""); //-- que va
    formDataTarea.append("Hr", 0); //-- que va
    formDataTarea.append("Status", 1); //-- que va
    formDataTarea.append("IdCliente", TareaData.statusDoctoscc.data.cliente);
    formDataTarea.append("Descripcion", ""); //-- que va
    formDataTarea.append("NivelPrioridad", 1); //-- que va
    formDataTarea.append("Daterecord", TareaData.fecha);
    formDataTarea.append("Datelastupdater", TareaData.fecha);
    formDataTarea.append("Userlastupdate",TareaData.statusDoctoscc.data.idUsuario);
    formDataTarea.append("Usercreator",TareaData.statusDoctoscc.data.idUsuario);
    formDataTarea.append("IdSucursal",TareaData.statusDoctoscc.data.idSucursal);
    formDataTarea.append("IdDoctoscc",TareaData.statusIngresoComprobante.data.idDoctoscc); //el iddoctoscc que esta en ingresocomprobante? o el id de la tabla docotscc
    formDataTarea.append("FechaCompromiso", TareaData.fecha); //-- que va
    const responsesTarea = await axios({
      headers: { "Content-Type": "application/json" },
      url: `${BaseUrl}api/Ingreso/Tarea/Registrar`,
      method: "POST",
      data: formDataTarea,
    });
    return responsesTarea;
  } catch (e) {
    console.log(e);
  }
}
