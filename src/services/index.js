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

//ver doctoscc
export async function getDoctoscc(dataIdFactura) {
  try {
    const idFacturaUser = dataIdFactura;
    const response = await axios({
      url: `${BaseUrl}api/Doctoscc/Ver/${idFacturaUser}`,
      method: "GET",
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}

//ver bancos
export async function getBanco (DataBanco){
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

//registrar ingreso
export async function postIngreso(IngresoData) {
  try {
    const formData = new FormData();
    formData.append("ImportePago", IngresoData.importe_pago);
    formData.append("Fecha", IngresoData.fecha);
    // formData.append("Folio", IngresoData.resGetDoctoscc.data.folio); folio autoincrementable?? funcion tools -siguiente folio
    formData.append("Notas", IngresoData.notas);
    formData.append("Tipo", IngresoData.resGetDoctoscc.data.tipo);
    formData.append("IdCliente", IngresoData.resGetDoctoscc.data.cliente);//(id_empros de tabla clientes es el cliente en la tabal doctoscc)
    formData.append("IdEmpresa", IngresoData.resGetDoctoscc.data.idEmpresa);  
    // formData.append("FormaPago", IngresoData.resGetDoctoscc.data.formaPago); EN INGRESO ES INT Y EN DOCTOSCC ES STRING
    formData.append("Banco", IngresoData.resGetBancos.data.idBanco); // NO TODOS TIENE BANCO 
    formData.append("Moneda", IngresoData.resGetBancos.data.moneda)

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
