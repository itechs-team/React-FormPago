import React from "react";
import axios from "axios";

const BaseUrl = "http://localhost:5124/";

export async function getDoctosccDetFacturas(DetFacturasData) {
    try{
      const id_Factura = DetFacturasData.resGetDoctoscc.data.idFactura;
      const responseDetalle = await axios ({
      url: `${BaseUrl}api/Ingreso/DoctosccDet/VerDet/${id_Factura}`,
      method: "GET"
    });
    return responseDetalle;
    }catch(e){
      console.log(e)
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
      throw new SyntaxError("Error al realizar el registro, intenta más tarde");
    }
  }