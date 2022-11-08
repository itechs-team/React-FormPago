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

//ver cargo
// export async function getCargo() {
//   try {
//     const response = await axios({
//       url: `${BaseUrl}api/Cargo/Ver`,
//       method: "GET",
//     });
//     return response;
//   } catch (e) {
//     console.log(e);
//   }
// }

//registrar transBancaria
export async function postTransbancaria(transbData) {
  try {
    const formDataTrans = new FormData();
    if (transbData.FormaPago != 1) {
      formDataTrans.append("Cuenta", transbData.resGetBancos.data.idBanco);//corregir esto
      formDataTrans.append("Referencia", "");
      formDataTrans.append("Qty", transbData.importe_pago);
      formDataTrans.append("Formapago", transbData.FormaPago);
      formDataTrans.append("Fecha", transbData.fecha);
      formDataTrans.append("Daterecord",transbData.fecha);
      formDataTrans.append("Status", 0);
      formDataTrans.append("IdEmpros", transbData.resGetDoctoscc.data.cliente);
      formDataTrans.append("IdSucursal", transbData.resGetDoctoscc.data.idSucursal);
      formDataTrans.append("Tipo", transbData.resGetDoctoscc.data.tipo);
      formDataTrans.append("UserCreator",transbData.resGetDoctoscc.data.idUsuario );
      formDataTrans.append("DateLastUpdate",transbData.fecha);
      formDataTrans.append("UserLastUpdater", transbData.resGetDoctoscc.data.idUsuario);
    } else {
      if (transbData.FormaPago == 1) {
        formDataTrans.append("Cuenta", 2088);//corregir esto
        formDataTrans.append("Referencia", "");
        formDataTrans.append("Qty", transbData.importe_pago);
        formDataTrans.append("Formapago", transbData.FormaPago);
        formDataTrans.append("Fecha", transbData.fecha);
        formDataTrans.append("Status", 0);
        formDataTrans.append("Daterecord",transbData.fecha);
        formDataTrans.append("IdEmpros",transbData.resGetDoctoscc.data.cliente);
        formDataTrans.append("IdSucursal",transbData.resGetDoctoscc.data.idSucursal);
        formDataTrans.append("Tipo", transbData.resGetDoctoscc.data.tipo);
        formDataTrans.append("UserCreator",transbData.resGetDoctoscc.data.idUsuario);
        formDataTrans.append("DateLastUpdate",transbData.fecha);
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
    formDataDoc.append("Folio", DoctosccData.resGetDoctoscc.data.folio); // el folio debe autoincrementar en 1 //corregir esto
    formDataDoc.append("IdEmpresa", DoctosccData.resGetDoctoscc.data.idEmpresa);
    formDataDoc.append("FechaFactura", DoctosccData.fecha);
    formDataDoc.append("IdUsuario", DoctosccData.resGetDoctoscc.data.idUsuario);
    formDataDoc.append("Tipo", 12); 
    formDataDoc.append("Moneda", DoctosccData.resGetDoctoscc.data.moneda);//corregir esto
    formDataDoc.append("Vendedor", DoctosccData.resGetDoctoscc.data.idUsuario);
    formDataDoc.append("Metodopago", DoctosccData.FormaPago);
    formDataDoc.append("FechaHoraGenerado", DoctosccData.fecha);
    formDataDoc.append("UserLastUpdater",DoctosccData.resGetDoctoscc.data.idUsuario);
    formDataDoc.append("DateLastUpdate", DoctosccData.fecha);
    formDataDoc.append("FechaPago", DoctosccData.fecha);
    formDataDoc.append("IdSucursal",DoctosccData.resGetDoctoscc.data.idSucursal);
    formDataDoc.append("Almacen", DoctosccData.resGetDoctoscc.data.almacen); //dato obligatorio por FK 
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
    formDataDet.append("IdFactura",DoctosccDetData.statusDoctoscc.data.idFactura); //debe colocar el nuevo id de doctoscc
    formDataDet.append("Cantidad", 1);
    formDataDet.append("Descripcion", "Pago");
    formDataDet.append("Preciou", 0);
    formDataDet.append("Idprodserv", 60071);//debe ser null //corregir esto
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
    const formData = new FormData();
    formData.append("Folio",IngresoData.resGetDoctoscc.data.folio);//corregir esto
    formData.append("UserCreator",IngresoData.resGetDoctoscc.data.idUsuario);
    formData.append("IdCliente",IngresoData.resGetDoctoscc.data.cliente);
    formData.append("Tipo",1);
    formData.append("IdEmpresa" ,IngresoData.resGetDoctoscc.data.idEmpresa);
    formData.append("Fecha", IngresoData.fecha);
    formData.append("ImportePago",IngresoData.importe_pago);
    formData.append("FormaPago",IngresoData.FormaPago);
    formData.append("Banco",IngresoData.resGetBancos.data.idBanco);
    formData.append("Notas",IngresoData.notas);
    formData.append("Moneda",IngresoData.resGetBancos.data.moneda);//corregir esto
    formData.append("IdDeposito", IngresoData.statusTransbancaria.data.idTransbancaria);
    formData.append("IdAlmacen",IngresoData.resGetDoctoscc.data.idAlmacen);
    formData.append("IdIngresoComprobante",IngresoData.statusIngresoComprobante.data.idIngresoComprobante);
 const responses = await axios({
      headers: { "Content-Type": "application/json" },
      url: `${BaseUrl}api/Ingreso/Registrar`,
      method: "POST",
      data: formData,
    });
    return responses;
  } catch (e) {
    console.log(e);
  }
}
//Actualizar ingresoComprobante
export async function putIngresoComprobante(ingresoComprobanteData) {
  try {
    const idIngComprobante =ingresoComprobante.statusIngresoComprobante.idIngresoComprobante;
    const formDataIngComp = new FormDataIngComp();
    formDataIngComp.append("DateRecord", ingresoComprobanteData.fecha);
    formDataIngComp.append("FechaPago", ingresoComprobanteData.fecha);
    formDataIngComp.append("FormaPago", ingresoComprobanteData.FormaPago);
    formDataIngComp.append("Moneda", 2);//corregir esto
    formDataIngComp.append("TipoCambio", 0);//corregir esto
    formDataIngComp.append("Monto", ingresoComprobanteData.importe_pago);
    formDataIngComp.append("BancoBeneficiario",ingresoComprobanteData.cuentaBeneficiara);
    const responsesIngComp = await axios({
      headers: { "Content-Type": "application/json" },
      url: `${BaseUrl}api/Ingreso/IngresoComprobante/Actualizar/${idIngComprobante}`,
      method: "PUT",
      data: formDataIngComp,
    });
    return responsesIngComp;
  } catch (e) {
    console.log(e);
  }
}
//registrar Abono
