import React, { Fragment, useState, useEffect, useRef } from "react";
import { SaldaAbonoWeb } from "../services/index";
import { getBancoSinID, getMetodopagoList } from "../services/Banco";
import swal from "sweetalert";

function FormularioPago() {
  const [btnActivo, SetBtnActivo] = useState(false);
  const [metodoPago, setMetodoPago] = useState([]);
  const [banco, setBanco] = useState([]);
  const [formValues, setFormValues] = useState({
    clave: "",
    importe_pago: "",
    fecha: "",
    notas: "Nota",
    MetodoPago: "",
    cuentaBeneficiaria: "",
  });

  useEffect(() => {
    async function VerMetodoPago() {
      const response = await getMetodopagoList();
      if (response.status === 200) {
        setMetodoPago(response.data);
      }
    }
    VerMetodoPago();
  }, []);

  useEffect(() => {
    async function VerBancos() {
      const response = await getBancoSinID();
      if (response.status === 200) {
        setBanco(response.data);
      }
    }
    VerBancos();
  }, []);

  const inputFileRef = useRef();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // const _handleSubmit = async (e) => {
    const _handleSubmit = async function (e) {
    e.preventDefault();
    try {

      const PagoEfectivo = 1;

      if (formValues.importe_pago == "" ) {
        throw new SyntaxError("No ha ingresado un 'Importe'");
      }

      if (
        formValues.MetodoPago == "" ||
        formValues.MetodoPago == "Seleccionar Método de pago"
      ) {
        throw new SyntaxError("No ha seleccionado una 'Método de pago'.");
      }

      if (
        formValues.cuentaBeneficiaria == "" ||
        formValues.MetodoPago =="Seleccionar cuenta"
      ) {
        throw new SyntaxError("No ha seleccionado una 'Cuenta de banco'");
      }
      if (formValues.fecha == "") {
        throw new SyntaxError("No ha seleccionado una 'Fecha'");
      }

      if (formValues.clave == "") {
        throw new SyntaxError("No ha colocado una 'Clave'");
      }

      await SaldaAbonoWeb({ ...formValues });

      document.getElementById('formIngresoPago').reset();
      setFormValues({
        clave: "",
        importe_pago: "",
        fecha: "",
        notas: "Nota",
      });
      swal({
        title: "!REGISTRADO EXITOSAMENTE!!",
        text: "",
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
        document.getElementById('formIngresoPago').reset();
        setFormValues({
          clave: "",
          importe_pago: "",
          fecha: "",
          notas: "Nota",
        });
      }
    });
  };
  // const _handleSubmit = (e) => {
  //   e.preventDefault()
  //     handleSubmit({ ...formValues /*, image: inputFileRef.current.files*/ });
  //   }
  // };

  const handleClickActivar = () => {
    const SelectMetodoPago = formValues.MetodoPago;
    if (SelectMetodoPago < 1 || SelectMetodoPago > 5 || SelectMetodoPago=="Seleccionar Método de pago") {
      SetBtnActivo(false);
      //document.getElementById('cuentaBancaria').reset();
    } else {
      if (SelectMetodoPago >= 1 && SelectMetodoPago <= 5 ) {
        SetBtnActivo(true);
      }
    }
  };

  return (
    <Fragment>
      <h1 className="fw-bold mt-3 py-4 text-center text-primary">
        REGISTRO DE PAGO
      </h1>
      <form
        id="formIngresoPago"
        className="form-floating row g-3 needs-validation"
        noValidate
        onSubmit={_handleSubmit}
      >
        <div className="row p-2 m-2">
          <div className="form-floating col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
            <input
              className="form-control"
              type="number"
              pattern="[0-9]+"
              step="any"
              name="importe_pago"
              value={formValues.importe_pago}
              onChange={handleChange}
              required
              autoFocus
            />
            <label className="text-dark p-3 ">Importe pago*</label>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <div className="form-floating col-sm-12 col-md-6 col-lg-6 col-xl-6 pt-1">
            <select
              onChange={handleChange}
              onClick={() => handleClickActivar()}
              name="MetodoPago"
              className="form-select"
            >
              <option defaultValue>Seleccionar Método de pago</option>
              {metodoPago.map((elemento) => (
                <option key={elemento.idMetodopago} value={elemento.idMetodopago}>
                  {elemento.metodopago1}
                </option>
              ))}
            </select>
            <label className=" text-dark p-3 ">Método de pago*</label>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <div className="form-floating col-sm-12 col-md-6 col-lg-6 col-xl-6 pt-1">
            <select
            id="cuentaBancaria"
              onChange={handleChange}
              name="cuentaBeneficiaria"
              className="form-select"
              disabled={!btnActivo}
            >
              <option defaultValue>Seleccionar cuenta</option>
              {banco.map((elemento) => (
                <option key={elemento.idBanco} value={elemento.idBanco}>
                  {elemento.cuenta}
                </option>
              ))}
            </select>
            <label className=" text-dark p-3 ">Cuenta bancaria*</label>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <div className="form-floating col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
            <input
              className="form-control"
              type="file"
              ref={inputFileRef}
              id="formFile"
            />
            <label className="text-dark pt-2 pl-3">Subir ticket de pago*</label>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <div className="form-floating  col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <input
              className="form-control "
              type="datetime-local"
              name="fecha"
              value={formValues.fecha}
              onChange={handleChange}
              required
            />
            <label className="text-dark p-3">Fecha y hora actual* </label>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <div className="form-floating  col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
            <input
              id="floatingInputValue"
              className="form-control"
              type="text"
              name="clave"
              value={formValues.clave}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingInputValue" className="text-dark  p-3 ">
              Clave*
            </label>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <div className="form-floating col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <textarea
              className="textareano rounded-3 p-3 form-control form-control-lg mb-2 "
              name="notas"
              value={formValues.notas}
              onChange={handleChange}
              // placeholder="comentario"
            ></textarea>
            <label className="text-dark p-3 pb-4">Comentarios</label>
          </div>
         
          <br></br>
          <br></br>
          <br></br>
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

export default FormularioPago;
