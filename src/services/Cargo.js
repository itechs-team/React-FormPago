import React from "react";
import axios from "axios";

const BaseUrl = "http://localhost:5124/";

export async function getCargos(CargosData) {
    try{
      const arrayDetFacturas = [CargosData.DetallesFacturas.data]
      for (let i = 0; i < arrayDetFacturas.length; i++) {
        const detalles = arrayDetFacturas[i];
        console.log(detalles)
        for (let y = 0; y < detalles.length; y++) {
          const DetallesFacturas = detalles[y];
          const idDetFactura = DetallesFacturas.idDetallefatura;
          console.log(idDetFactura)
          const responseDetalle = await axios ({
            url: `${BaseUrl}api/Ingreso/Cargo/Ver/${idDetFactura}`,
            method: "GET"
          });
          return responseDetalle;
          console.log(responseDetalle)
        }
      }
    }catch(e){
      console.log(e)
    }
  }