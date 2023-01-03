import React, { Fragment, useState, useEffect, useRef } from "react";
import { SaldaAbonoWeb } from "../services/index";
import { ImagenUpload } from "../services/UploadImagen";
import { getMetodopagoList, ListaBancos } from "../services/Banco";
import ObtenerRutaFormulario from "../services/ConexionBdPorEmpresa";
import { UrlLogin } from "../services/Login";
import swal from "sweetalert";
//import { ObtenerRutaFormulario } from "../services/ConexionBdPorEmpresa";

function FormularioPago() {
  const [login, setLogin] = useState("");
  // const [rutaBD, setRutaBD] = useState("");
  const [metodoPago, setMetodoPago] = useState([]);
  const [banco, setBanco] = useState([]);
  const [image, setImage] = useState(null);
  const [btnActivo, SetBtnActivo] = useState(false);
  const [formValues, setFormValues] = useState({
    clave: "",
    importe_pago: "",
    fecha: "",
    notas: "Nota",
    MetodoPago: "",
    cuentaBeneficiaria: "",
  });

  useEffect(() => {
    async function loginForm() {
      const rutaClave = await ObtenerRutaFormulario();
      const loginApi = await UrlLogin(rutaClave);
      if (loginApi.status === 200) {
        setLogin(loginApi.data.data);
        console.log(loginApi.data.data);
      }
    }
    loginForm();
  }, []);

  // useEffect(() => {
  //   function existeEmpresa() {
  //     const ruta = ObtenerRutaFormulario();
  //     const bdConexion = verificarClaveEmpresa(ruta);
  //     if (bdConexion.status === 200) {
  //       setRutaBD(bdConexion.data.bd);
  //     }
  //   }
  //   existeEmpresa();
  // }, []);

  useEffect(() => {
    async function VerMetodoPago() {
      // const token = await login;
      const rutaClave = await ObtenerRutaFormulario();
      const response = await getMetodopagoList(rutaClave);
      if (response.status === 200) {
        setMetodoPago(response.data);
      }
    }
    VerMetodoPago();
  }, []);

  useEffect(() => {
    async function VerBancos() {
      const response = await ListaBancos();
      if (response.status === 200) {
        setBanco(response.data);
      }
    }
    VerBancos();
  }, []);

  // const inputFileRef = useRef(); //otra forma de obtener la imagen

  function handleImageChange(event) {
    setImage(event.target.files[0]);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // const _handleSubmit = async (e) => {
  const _handleSubmit = async function (e) {
    e.preventDefault();
    try {
      //const pruebaURL = await ObtenerRutaFormulario();

      const PagoEfectivo = 1;

      if (formValues.importe_pago == "") {
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
        formValues.MetodoPago == "Seleccionar cuenta"
      ) {
        throw new SyntaxError("No ha seleccionado una 'Cuenta de banco'");
      }
      if (image == null) {
        throw new SyntaxError("No ha subido su 'Ticket de pago'");
      }
      if (formValues.fecha == "") {
        throw new SyntaxError("No ha seleccionado una 'Fecha'");
      }

      if (formValues.clave == "") {
        throw new SyntaxError("No ha colocado una 'Clave'");
      }

      await ImagenUpload({ image, ...formValues });
      await SaldaAbonoWeb({ ...formValues, rutaBD });

      document.getElementById("formIngresoPago").reset();
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
        document.getElementById("formIngresoPago").reset();
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
    if (
      SelectMetodoPago < 1 ||
      SelectMetodoPago > 5 ||
      SelectMetodoPago == "Seleccionar Método de pago"
    ) {
      SetBtnActivo(false);
      //document.getElementById('cuentaBancaria').reset();
    } else {
      if (SelectMetodoPago >= 1 && SelectMetodoPago <= 5) {
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
                <option
                  key={elemento.idMetodopago}
                  value={elemento.idMetodopago}
                >
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
              accept="image/png, image/gif, image/jpeg"
              onChange={handleImageChange}
              // ref={inputFileRef}
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
