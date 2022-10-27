import React, { Fragment, useState, useEffect, useRef } from "react";
import {
  getBanco,
  getClave,
  getDoctoscc,
  getFormaPagoList,
} from "../services/index";
import swal from "sweetalert";

function FormularioPago({ handleSubmit }) {
  const [formaPago, setFormaPago] = useState([]);
  const [formValues, setFormValues] = useState({
    clave: "",
    importe_pago: "",
    fecha: "",
    notas: "",
    FormaPago: "",
  });

  useEffect(() => {
    async function VerFormaPago() {
      const response = await getFormaPagoList();
      // console.log(response);
      if (response.status === 200) {
        setFormaPago(response.data);
      }
    }
    VerFormaPago();
  }, []);

  const inputFileRef = useRef();

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(name, value);
    setFormValues({ ...formValues, [name]: value });
  };

  const _handleSubmit = async (e) => {
    e.preventDefault();
    const resGetDataClave = await getClave({ ...formValues });
    const resGetOnlyClave = resGetDataClave.data.clave;
    const resGetOnlyImporte = resGetDataClave.data.importePago;
    try {
      if (
        resGetOnlyClave == formValues.clave &&
        resGetOnlyImporte == formValues.importe_pago
      ) {
        const resGetIdFactura = resGetDataClave.data.idFactura;
        const resGetDoctoscc = await getDoctoscc(resGetIdFactura);
        const resGetIdCliente = resGetDoctoscc.data.cliente;
        const resGetBancos = await getBanco(resGetIdCliente);
        console.log(resGetDoctoscc);
        const fechaForm = formValues.fecha
        const importeForm = formValues.importe_pago
        const formapagoForm = formValues.FormaPago
        if(fechaForm=="" || importeForm=="" || formapagoForm==""){
          swal({
            title: "",
            text: "LOS CAMPOS CON * SON REQUERIDOS",
            icon: "warning",
          });
        }else{
          handleSubmit({ ...formValues, resGetDoctoscc, resGetBancos });
          setFormValues({
            clave: "",
            importe_pago: "",
            fecha: "",
            notas: "",
            FormaPago: "",
          });
          swal({
            title: "REGISTRADO EXISTOSAMENTE!!",
            text: "",
            icon: "success",
          });
        }
        // alert("Enviado Correctamente");
      } else {
        swal({
          title: "UPPS!!",
          text: "VERIFICA LA CLAVE E IMPORTE",
          icon: "warning",
        });
      }
    } catch (e) {
      // alert("Clave Errónea");
      swal({
        title: "UPPS!!",
        text: "HUBO UN ERROR AL REGISTRAR, INTENTE MÁS TARDE",
        icon: "warning",
      });
      console.log(e);
    }
  };

  const handleClick = () => {
    setFormValues({
      clave: "",
      importe_pago: "",
      fecha: "",
      notas: "",
      FormaPago: "",
    });
  };
  // const _handleSubmit = (e) => {
  //   e.preventDefault()
  //     handleSubmit({ ...formValues /*, image: inputFileRef.current.files*/ });
  //   }
  // };

  // useEffect(() => {
  //   async function loadIngreso() {
  //     const response = await getIngreso();
  //     // console.log(response);
  //     if (response.status === 200) {
  //       setIngreso(response.data.ingreso);
  //     }
  //   }
  //   loadIngreso();
  // }, []);

  return (
    <Fragment>
      <h1 className="mt-3 p-4 text-center ">INFORMACIÓN DE PAGO</h1>
      <form
        id="formIngresoPago"
        className="row g-3 needs-validation"
        noValidate
        onSubmit={_handleSubmit}
      >
        <div className="row p-2 m-2">
          <div className="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <label className="control-label p-1 ">Clave*</label>
            <input
              className="form-control"
              placeholder="Clave"
              type="text"
              name="clave"
              value={formValues.clave}
              onChange={handleChange}
              autoFocus
              required
            />
          </div>
          <div className="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <label className="control-label p-1 ">Importe Pago*</label>
            <input
              className="form-control"
              placeholder="Importe Pago"
              type="number"
              pattern="[0-9]+"
              step="any"
              name="importe_pago"
              value={formValues.importe_pago}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <label className="p-1">Fecha y Hora actual* </label>
            <input
              className="form-control"
              type="datetime-local"
              name="fecha"
              value={formValues.fecha}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6 pt-1">
            <label className="pb-1">Forma de pago*</label>
            <select
              onChange={handleChange}
              name="FormaPago"
              className="form-select"
            >
              <option defaultValue>Seleccionar Forma de Pago</option>
              <option value={1}>Pago en OXXO</option>
              <option value={1}>Depósito efectivo en banco</option>
              {formaPago.map((elemento) => (
                <option key={elemento.idFormapago} value={elemento.idFormapago}>
                  {elemento.formapago1}
                </option>
              ))}
            </select>
            {/* <select onChange={handleChange} className="form-select">
              <option defaultValue>Seleccione su forma de pago</option>
              <option name="FormaPago" value={formValues.FormaPago}>Vale</option>
              <option name="FormaPago" value={formValues.FormaPago}>Banco</option>
              <option name="FormaPago" value={formValues.FormaPago}>Transferencia</option>
              <option name="FormaPago" value={formValues.FormaPago}>Pago en OXXO</option>
              <option name="FormaPago" value={formValues.FormaPago}>Tarjeta de Credito</option>
              <option name="FormaPago" value={formValues.FormaPago}>Depósito efectivo en banco</option>
            </select> */}
          </div>

          <div className="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
            <label className="pb-1">Subir Ticket de Pago*</label>
            <input
              // required
              className="form-control"
              type="file"
              ref={inputFileRef}
              id="formFile"
            />
          </div>
          <div className="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <label className="p-1">Comentarios</label> <br></br>
            <textarea
              className="textareano rounded-3 p-3 form-control form-control-lg mb-2 "
              placeholder="Descripción"
              name="notas"
              value={formValues.notas}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className=" form-group d-grid gap-2 d-md-flex justify-content-md-center p-5">
            <button className="btn btn-primary me-md-2" type="submit">
              Enviar
            </button>
            <button
              className="btn btn-danger me-md-2"
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

export default FormularioPago;
