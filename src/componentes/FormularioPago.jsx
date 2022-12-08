import React, { Fragment, useState, useEffect, useRef } from "react";
import { SaldaAbonoWeb } from "../services/index";
import { getBancoSinID, getFormaPagoList } from "../services/Banco";
import swal from "sweetalert";

function FormularioPago() {
  const [btnActivo, SetBtnActivo] = useState(false);
  const [formaPago, setFormaPago] = useState([]);
  const [banco, setBanco] = useState([]);
  const [formValues, setFormValues] = useState({
    clave: "",
    importe_pago: "",
    fecha: "",
    notas: "comentarios",
    FormaPago: "",
    cuentaBeneficiaria: "",
  });

  useEffect(() => {
    async function VerFormaPago() {
      const response = await getFormaPagoList();
      if (response.status === 200) {
        setFormaPago(response.data);
      }
    }
    VerFormaPago();
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
      if (formValues.importe_pago == "") {
        throw new SyntaxError("No ha ingresado un 'Importe'");
      }

      if (
        formValues.FormaPago == "" ||
        formValues.FormaPago == "Seleccionar forma de pago"
      ) {
        throw new SyntaxError("No ha seleccionado una 'Forma de pago'.");
      }

      if (
        formValues.cuentaBeneficiaria == "" &&
        formValues.FormaPago != PagoEfectivo
      ) {
        throw new SyntaxError("No ha seleccionado una 'Cuenta beneficiaria'");
      }

      if (formValues.fecha == "") {
        throw new SyntaxError("No ha seleccionado una 'Fecha'");
      }

      if (formValues.clave == "") {
        throw new SyntaxError("No ha colocado una 'Clave'");
      }

      await SaldaAbonoWeb({ ...formValues });

      setFormValues({
        clave: "",
        importe_pago: "",
        fecha: "",
        notas: "comentarios",
        FormaPago: "Seleccionar forma de pago",
        cuentaBeneficiaria: "Seleccionar cuenta",
      });
      swal({
        title: "!Registrado EXITOSAMENTE!!",
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
        setFormValues({
          clave: "",
          importe_pago: "",
          fecha: "",
          notas: "comentarios",
          FormaPago: "",
          cuentaBeneficiaria: "",
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
    const SelectFormaPago = formValues.FormaPago;
    if (SelectFormaPago == "1" || SelectFormaPago == "3") {
      SetBtnActivo(false);
      formValues.cuentaBeneficiaria=2088;
    } else {
      if (SelectFormaPago == "2" || SelectFormaPago == "4") {
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
          <div className="form-floating  col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
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
              name="FormaPago"
              className="form-select"
            >
              <option defaultValue>Seleccionar forma de pago</option>
              <option value={1}>Pago en OXXO</option>
              <option value={1}>Depósito efectivo en banco</option>
              {formaPago.map((elemento) => (
                <option key={elemento.idFormapago} value={elemento.idFormapago}>
                  {elemento.formapago1}
                </option>
              ))}
            </select>
            <label className=" text-dark p-3 ">Forma de pago*</label>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <div className="form-floating col-sm-12 col-md-6 col-lg-6 col-xl-6 pt-1">
            <select
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
            <label className=" text-dark p-3 ">Cuenta beneficiaria*</label>
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
