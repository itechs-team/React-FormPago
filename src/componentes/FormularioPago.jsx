import React, { Fragment, useState, useEffect, useRef } from "react";
import { getBanco, getClave, getDoctoscc } from "../services/index";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';

function FormularioPago({ handleSubmit }) {
  const [dropdown, setDropdown] = useState(false)
  const [ingreso, setIngreso] = useState([]);
  const [formValues, setFormValues] = useState({
    clave: "",
    importe_pago: "",
    fecha: "",
    notas: "",
  });

  const abrirCerrarDropdown=()=>{
    setDropdown(!dropdown);
  }

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
        const resGetBancos = await getBanco(resGetIdCliente)
        console.log(resGetDoctoscc);
        handleSubmit({ ...formValues, resGetDoctoscc, resGetBancos });
        setFormValues({
          clave: "",
          importe_pago: "",
          fecha: "",
          HoraActual: "",
          notas: "",
        });
        alert("Enviado Correctamente");
      }
    } catch (e) {
      alert("Clave Errónea");
      setFormValues({
        clave: "",
        importe_pago: "",
      });
      console.log(e);
    }
  };

  const handleClick = () => {
    setFormValues({
      clave: "",
      importe_pago: "",
      fecha: "",
      HoraActual: "",
      notas: "",
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
      <h1 className="mt-3 p-4 text-center ">Información de pago</h1>
      <form
        id="formIngresoPago"
        className="row g-3 needs-validation"
        noValidate
        onSubmit={_handleSubmit}
      >
        <div className="row p-2 m-2">
          <div className="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <label className="control-label p-1 ">Clave</label>
            <input
              className="form-control"
              placeholder="Clave"
              type="text"
              name="clave"
              value={formValues.clave}
              onChange={handleChange}
              autoFocus
              // required
            />
          </div>
          <div className="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <label className="control-label p-1 ">Importe Pago</label>
            <input
              className="form-control"
              placeholder="Importe Pago"
              type="number"
              pattern="[0-9]+"
              step="any"
              name="importe_pago"
              value={formValues.importe_pago}
              onChange={handleChange}
              // required
            />
          </div>
          <div className="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <label className="p-1">Fecha y Hora actual </label>
            <input
              className="form-control"
              type="datetime-local"
              name="fecha"
              value={formValues.fecha}
              onChange={handleChange}
              // required
            />
          </div>

          <div className="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6 pt-1">
          <label className="pb-1">Forma de pago</label>
            <Dropdown className="width-100%">
              <DropdownToggle caret className="">
                      Seleccione forma de pago
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>1</DropdownItem>
                <DropdownItem>2</DropdownItem>
                <DropdownItem>3</DropdownItem>
                <DropdownItem>4</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <div className="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
            <label className="pb-1">Subir Ticket de Pago</label>
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
