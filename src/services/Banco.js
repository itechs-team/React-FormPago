import React from "react";
import axios from "axios";

const BaseUrl = "http://localhost:5124/";

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
        formDataTrans.append("IdEmpros", transbData.ResultGetDoctoscc.data.cliente);
        formDataTrans.append("IdSucursal",transbData.ResultGetDoctoscc.data.idSucursal);
        formDataTrans.append("Tipo", transbData.ResultGetDoctoscc.data.tipo);
        formDataTrans.append("UserCreator",transbData.ResultGetDoctoscc.data.idUsuario);
        formDataTrans.append("DateLastUpdate", transbData.fecha);
        formDataTrans.append("UserLastUpdater",transbData.ResultGetDoctoscc.data.idUsuario);
      } else {
        if (transbData.FormaPago == 1) {
          formDataTrans.append("Cuenta", 2088); //corregir esto, cuenta definida es caso de que el pago se haga efectivo
          formDataTrans.append("Referencia", "");
          formDataTrans.append("Qty", transbData.importe_pago);
          formDataTrans.append("Formapago", transbData.FormaPago);
          formDataTrans.append("Fecha", transbData.fecha);
          formDataTrans.append("Status", 0);
          formDataTrans.append("Daterecord", transbData.fecha);
          formDataTrans.append("IdEmpros",transbData.ResultGetDoctoscc.data.cliente);
          formDataTrans.append("IdSucursal",transbData.ResultGetDoctoscc.data.idSucursal);
          formDataTrans.append("Tipo", transbData.ResultGetDoctoscc.data.tipo);
          formDataTrans.append("UserCreator",transbData.ResultGetDoctoscc.data.idUsuario);
          formDataTrans.append("DateLastUpdate", transbData.fecha);
          formDataTrans.append("UserLastUpdater",transbData.ResultGetDoctoscc.data.idUsuario);
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
      throw new SyntaxError("Error al realizar el registro, intenta más tarde");
    }
  }