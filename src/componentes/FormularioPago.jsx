import React, { Fragment, useState, useEffect, useRef } from "react";
import {
  getBanco,
  getClave,
  getDoctoscc,
  getFolioDoctoscc,
  getFormaPagoList,
  postAbono,
  postDoctoscc,
  postDoctosccDet,
  postIngreso,
  postingresoComprobante,
  postTarea,
  postTransbancaria,
  putIngresoComprobante,
} from "../services/index";
import swal from "sweetalert";

function FormularioPago() {
  const [btnActivo, SetBtnActivo] = useState(false);
  const [formaPago, setFormaPago] = useState([]);
  const [formValues, setFormValues] = useState({
    clave: "",
    importe_pago: "",
    fecha: "",
    notas: "",
    FormaPago: "",
    cuentaBeneficiara : "",
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
    if (resGetDataClave == null) {
      swal({
        title: "UPPS!!",
        text: "La Clave no existe!",
        icon: "warning",
      });
    }
    const resGetOnlyClave = resGetDataClave.data.clave;
    const resGetOnlyImporte = resGetDataClave.data.importePago;
    try {
      //Validamos la calve y el importe
      if (
        resGetOnlyClave == formValues.clave &&
        resGetOnlyImporte == formValues.importe_pago
      ) {
        const resGetIdFactura = resGetDataClave.data.idFactura;
        const resGetDoctoscc = await getDoctoscc(resGetIdFactura);
        const resGetIdCliente = resGetDoctoscc.data.cliente;
        const resGetBancos = await getBanco(resGetIdCliente);
        // console.log(resGetDoctoscc);
        const fechaForm = formValues.fecha;
        const importeForm = formValues.importe_pago;
        const formapagoForm = formValues.FormaPago;
        //valdiamos campos vacios
        if (fechaForm == "" || importeForm == "" || formapagoForm == "") {
          swal({
            title: "",
            text: "Los campos con * son requeridos",
            icon: "warning",
          });
        } else {
          const statusTransbancaria =await postTransbancaria({ ...formValues, resGetDoctoscc, resGetBancos });
          if(statusTransbancaria.status >= 200 && statusTransbancaria.status <= 250  ){
            const folioDoctoscc= await getFolioDoctoscc ({resGetDoctoscc})
            const resultFolioDoc = folioDoctoscc.data.folio
            const folioIncrementado = resultFolioDoc+1;
            const statusDoctoscc= await postDoctoscc({ ...formValues, resGetDoctoscc, resGetBancos,folioIncrementado });
            const statusDoctosccDet = await postDoctosccDet({ ...formValues, resGetDoctoscc, resGetBancos,statusDoctoscc });// aqui me quede
            const statusIngresoComprobante = await postingresoComprobante({statusDoctoscc });
            const statusIngresoRegistro = await postIngreso({ ...formValues, resGetDoctoscc, resGetBancos,statusIngresoComprobante,statusTransbancaria });
            const putIngComp = await putIngresoComprobante({ ...formValues, resGetDoctoscc, resGetBancos,statusDoctoscc, statusIngresoComprobante});
            const statusPostAbono = await  postAbono({...formValues,statusDoctoscc,statusIngresoRegistro,resGetDataClave});
            const statusPostTarea = await postTarea({...formValues,statusDoctoscc,statusIngresoComprobante});
            setFormValues({
              clave: "",
              importe_pago: "",
              fecha: "",
              notas: "",
              FormaPago: "",
              cuentaBeneficiara : "",
            });
            swal({
              title: "Registrado EXITOSAMENTE!!",
              text: "",
              icon: "success",
            });
          }
         
        }
      } else {
        swal({
          title: "UPPS!!",
          text: "Verifica el Importe!",
          icon: "warning",
        });
      }
    } catch (e) {
      swal({
        title: "UPPS!!",
        text: "Hubo un erro al registrar, intenta más tarde",
        icon: "warning",
      });
      console.log(e);
    }
  };

  const handleClick = () => {
    swal({
      title: "CANCELAR",
      text: "¿Esta seguro que desea cancelar la operación?",
      icon: "warning",
      buttons: ["No", "Si"],
    }).then((respuesta) => {
      if (respuesta) {
        swal({
          text: "Cancelado correctamente",
          icon: "success",
          timer: "2000",
        });
        setFormValues({
          clave: "",
          importe_pago: "",
          fecha: "",
          notas: "",
          FormaPago: "",
          cuentaBeneficiara : "",
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
    if (SelectFormaPago == "1") {
      SetBtnActivo(false);
    } else {
      if (
        SelectFormaPago == "2" ||
        SelectFormaPago == "3" ||
        SelectFormaPago == "4"
      ) {
        SetBtnActivo(true);
      }
    }
  };

  return (
    <Fragment>
      <h1 className="mt-3 p-4 text-center ">REGISTRO DE PAGO</h1>
      <form
        id="formIngresoPago"
        className="form-floating row g-3 needs-validation"
        noValidate
        onSubmit={_handleSubmit}
      >
        <div className="row p-2 m-2">
          <div className="form-floating  col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
            <input
              id="floatingInputValue"
              className="form-control "
              type="text"
              name="clave"
              value={formValues.clave}
              onChange={handleChange}
              autoFocus
              required
            />
            <label htmlFor="floatingInputValue" className="text-dark p-3 ">
              Clave*
            </label>
          </div>
          <br></br>
          <br></br>
          <br></br>
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
            />
            <label className="text-dark p-3 ">Importe Pago*</label>
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
              <option defaultValue>Seleccionar Forma de Pago</option>
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
              name="cuentaBeneficiara "
              className="form-select"
              disabled={!btnActivo}
            >
              <option defaultValue>Seleccionar cuenta</option>
              <option value={1}>1111</option>
              <option value={2}>2222</option>
              {formaPago.map((elemento) => (
                <option key={elemento.idFormapago} value={elemento.idFormapago}>
                  {elemento.formapago1}
                </option>
              ))}
            </select>
            <label className=" text-dark p-3 ">Cuenta Beneficiaria*</label>
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
            <label className="text-dark pt-2 pl-3">Subir Ticket de Pago*</label>
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
            <label className="text-dark p-3">Fecha y Hora actual* </label>
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
          <div className=" form-group d-grid gap-2 d-md-flex justify-content-md-center p-3">
            <button
              className="btn btn-success me-md-2 text-white"
              type="submit"
            >
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
