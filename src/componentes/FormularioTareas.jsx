import React, { Fragment, useState, useEffect } from "react";
import { ObtenerRutaFormularioTarea } from "../services/ConexionBdPorEmpresa";
import { RegistrarTarea, TipoTareas } from "../services/Tareas";

function FormularioTareas() {
  const [formValues, setFormValues] = useState({
    RFC: "",
    Fecha: "",
    Tipo: "",
    Descripcion: "Nota",
  });
  const [tipoTarea, setTipoTarea] = useState([]);

  useEffect(() => {
    async function verTipoTarea() {
      const empresa = await ObtenerRutaFormularioTarea();
      const response = await TipoTareas(empresa);
      if (response.status === 200) {
        setTipoTarea(response.data);
      }
    }
    verTipoTarea();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const _handleSubmit = async function (e) {
    e.preventDefault();
    try {
      const ClaveEmpresa = await ObtenerRutaFormularioTarea();

      if (formValues.RFC == "") {
        throw new SyntaxError("No ha colocado un 'RFC'");
      }
      if (formValues.Fecha == "") {
        throw new SyntaxError("No ha seleccionado una 'Fecha'");
      }
      if (formValues.Tipo == "") {
        throw new SyntaxError("No ha seleccionado una 'Tipo'");
      }
      if (formValues.Descripcion == "") {
        throw new SyntaxError("No ha colocado una descripción");
      }

      await RegistrarTarea({ ...formValues, ClaveEmpresa });

      document.getElementById("formtarea").reset();
      setFormValues({
        RFC: "",
        Fecha: "",
        Descripcion: "Nota",
      });
      swal({
        title: "Enviado exitosamente.",
        text: "Su mensaje a sido enviado satisfactoriamente",
        icon: "success",
      });
    } catch (e) {
      swal({
        title: "Error",
        text: e.message,
        icon: "error",
      });
      console.log(e);
    }
  };

  const handleClick = () => {
    swal({
      title: "Cancelar",
      text: "¿Esta seguro que desea cancelar la operación?",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((respuesta) => {
      if (respuesta) {
        swal({
          text: "Cancelado correctamente",
          icon: "success",
          timer: "3000",
        });
        document.getElementById("formtarea").reset();
        setFormValues({
          RFC: "",
          Fecha: "",
          Descripcion: "Nota",
        });
      }
    });
  };
  return (
    <Fragment>
      <h1 className="fw-bold mt-3 py-4 text-center text-primary">
        REGISTRAR TAREA
      </h1>
      <form
        id="formtarea"
        className="form-floating row g-3 needs-validation"
        noValidate
        onSubmit={_handleSubmit}
      >
        <div className="row p-2 m-2">
          <div className="form-floating col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <input
              className=" rounded-3 p-3 form-control form-control-lg mb-2 "
              name="RFC"
              value={formValues.RFC}
              onChange={handleChange}
            ></input>
            <label className="text-dark p-3 pb-4">RFC</label>
          </div>

          <div className="form-floating col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <input
              className="form-control"
              name="Fecha"
              type="datetime-local"
              value={formValues.Fecha}
              onChange={handleChange}
            ></input>
            <label className="text-dark p-3 pb-4">Fecha y Hora</label>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <div className="form-floating col-sm-12 col-md-6 col-lg-6 col-xl-6 pt-1">
            <select onChange={handleChange} name="Tipo" className="form-select">
              <option defaultValue>Seleccionar Tipo</option>
              {tipoTarea.map((elemento) => (
                <option
                  key={elemento.idTipotareas}
                  value={elemento.idTipotareas}
                >
                  {elemento.nombre}
                </option>
              ))}
              //----------- opci�n 2
              {/* <option key={2} value="2">
                Soporte
              </option>
              <option key={4} value="4">
                Servicio
              </option> */}
              //-----------
            </select>
            <label className=" text-dark p-3 ">Tipo*</label>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <div className="form-floating col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <textarea
              className="textareano rounded-3 p-3 pt-4 form-control form-control-lg mb-2 fs-6  "
              name="Descripcion"
              value={formValues.Descripcion}
              onChange={handleChange}
            ></textarea>
            <label className="text-dark p-3 pb-4">Descripción</label>
          </div>
          <div className=" d-grid py-3">
            <button
              className="btn bg-primary me-md-2 mb-1 text-white"
              type="submit"
            >
              Enviar
            </button>
            <button
              className="btn btn-danger me-md-2 mb-1"
              type="button"
              onClick={() => handleClick()}
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </Fragment>
  );
}

export default FormularioTareas;
