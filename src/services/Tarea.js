import React from "react";
import axios from "axios";

const BaseUrl = "http://localhost:5124/";

//registrar tarea
export async function postTarea(TareaData) {
    try {
      const formDataTarea = new FormData();
      formDataTarea.append("IdReceptor", 116); 
      formDataTarea.append("Tipo", 4); 
      formDataTarea.append("FechaInicio", TareaData.fecha);
      formDataTarea.append("FechaFin", TareaData.fechaDiaMasUno);
      formDataTarea.append("FechaCreacion", TareaData.fecha);
      formDataTarea.append("Asunto", "Registro Pago"); 
      formDataTarea.append("Comentarios", ""); //-- que va
      formDataTarea.append("Origen", ""); //-- que va
      formDataTarea.append("Hr", 0); //-- que va
      formDataTarea.append("Status", 1); //-- que va
      formDataTarea.append("IdCliente", TareaData.ResultPostDoctoscc.data.cliente);
      formDataTarea.append("Descripcion", ""); //-- que va
      formDataTarea.append("NivelPrioridad", 1); //-- que va
      formDataTarea.append("Daterecord", TareaData.fecha);
      formDataTarea.append("Datelastupdater", TareaData.fecha);
      formDataTarea.append("Userlastupdate",TareaData.ResultPostDoctoscc.data.idUsuario);
      formDataTarea.append("Usercreator",TareaData.ResultPostDoctoscc.data.idUsuario);
      formDataTarea.append("IdSucursal",TareaData.ResultPostDoctoscc.data.idSucursal);
      formDataTarea.append("IdDoctoscc",TareaData.ResultPostIngresoComprobante.data.idDoctoscc); //el iddoctoscc que esta en ingresocomprobante? o el id de la tabla docotscc
      formDataTarea.append("FechaCompromiso", TareaData.fechaDiaMasUno); //-- que va
      const responsesTarea = await axios({
        headers: { "Content-Type": "application/json" },
        url: `${BaseUrl}api/Ingreso/Tarea/Registrar`,
        method: "POST",
        data: formDataTarea,
      });
      return responsesTarea;
    } catch (e) {
      throw new SyntaxError("Error al realizar el registro, intenta más tarde");
    }
  }