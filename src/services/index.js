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

//registrar transBancaria
export async function postTransbancaria(transbData) {
  try {
    const formDataTrans = new FormData();
    if (transbData.FormaPago != 1) {
      formDataTrans.append("Cuenta", transbData.resGetBancos.data.idBanco);
      formDataTrans.append("Qty", transbData.importe_pago);
      formDataTrans.append("Formapago", transbData.FormaPago);
      formDataTrans.append("Fecha", transbData.fecha);
      formDataTrans.append("Status", 0);
      formDataTrans.append("IdEmpros", transbData.resGetDoctoscc.data.cliente);
      formDataTrans.append("IdSucursal",transbData.resGetDoctoscc.data.idSucursal);
      formDataTrans.append("Tipo", transbData.resGetDoctoscc.data.tipo);
    } else {
      if (transbData.FormaPago == 1) {
        formDataTrans.append("Cuenta", 2088);
        formDataTrans.append("Qty", transbData.importe_pago);
        formDataTrans.append("Formapago", transbData.FormaPago);
        formDataTrans.append("Fecha", transbData.fecha);
        formDataTrans.append("Status", 0);
        formDataTrans.append("IdEmpros",transbData.resGetDoctoscc.data.cliente);
        formDataTrans.append("IdSucursal",transbData.resGetDoctoscc.data.idSucursal);
        formDataTrans.append("Tipo", transbData.resGetDoctoscc.data.tipo);
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
    formDataDoc.append("Folio", DoctosccData.resGetDoctoscc.data.folio);
    formDataDoc.append("Cliente", DoctosccData.resGetDoctoscc.data.cliente);
    formDataDoc.append("FechaFactura", DoctosccData.fecha);
    formDataDoc.append("IdUsuario", DoctosccData.resGetDoctoscc.data.idUsuario);
    formDataDoc.append("Descuento", DoctosccData.resGetDoctoscc.data.descuento);
    formDataDoc.append("FechaPago", DoctosccData.fecha);
    formDataDoc.append("Status", DoctosccData.resGetDoctoscc.data.status);
    formDataDoc.append("Importe", DoctosccData.resGetDoctoscc.data.importe);
    formDataDoc.append("TotalImpuestos", DoctosccData.resGetDoctoscc.data.totalImpuestos);
    formDataDoc.append("Tipo", DoctosccData.resGetDoctoscc.data.tipo);
    formDataDoc.append("Proveedor", DoctosccData.resGetDoctoscc.data.proveedor);
    formDataDoc.append("Vendedor",  DoctosccData.resGetDoctoscc.data.vendedor)
    formDataDoc.append("Almacen", DoctosccData.resGetDoctoscc.data.almacen);
    formDataDoc.append("IdSucursal",DoctosccData.resGetDoctoscc.data.idSucursal)
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
// //registrar doctoscc_det
// export async function postDoctosccDet(DoctosccDetData) {
//   try {
//     const formDataDet = new FormData();
//     formDataDet.append("IdFactura", DoctosccDetData.resGetDoctoscc.data.idFactura);
//     const responsesDet = await axios({
//       headers: { "Content-Type": "application/json" },
//       url: `${BaseUrl}api/Ingreso/Det/Registrar`,
//       method: "POST",
//       data: formDataDet,
//     });
//     return responsesDet;
//   } catch (e) {
//     console.log(e);
//   }
// }
// //registrar ingresoComprobante
// export async function postingresoComprobante(ingresoComprobanteData) {
//   try {
//     const formData = new FormData();
//     //formData.append("Cuenta", IngresoData.importe_pago);
//     const responses = await axios({
//       headers: { "Content-Type": "application/json" },
//       url: `${BaseUrl}api/TransBancaria/Registrar`,
//       method: "POST",
//       data: formData,
//     });
//     return responses;
//   } catch (e) {
//     console.log(e);
//   }
// }
//registrar ingreso
export async function postIngreso(IngresoData) {
  try {
    const formData = new FormData();
    formData.append("ImportePago", IngresoData.importe_pago);
    formData.append("Fecha", IngresoData.fecha);
    // formData.append("Folio", IngresoData.resGetDoctoscc.data.folio); folio autoincrementable?? funcion tools -siguiente folio
    formData.append("Notas", IngresoData.notas);
    formData.append("Tipo", IngresoData.resGetDoctoscc.data.tipo);
    formData.append("IdCliente", IngresoData.resGetDoctoscc.data.cliente); //(id_empros de tabla clientes es el cliente en la tabal doctoscc)
    formData.append("IdEmpresa", IngresoData.resGetDoctoscc.data.idEmpresa);
    formData.append("FormaPago", IngresoData.FormaPago);
    formData.append("Banco", IngresoData.resGetBancos.data.idBanco); // NO TODOS TIENE BANCO
    formData.append("Moneda", IngresoData.resGetBancos.data.moneda);

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
//registrar Abono
