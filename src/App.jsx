import FormularioPago from "./componentes/FormularioPago";
import { getClave, postIngreso } from "./services/index";

function App() {
 
  const handleSubmit = (dataForm) => {
    postIngreso(dataForm)
  };
  return (
    <main className="p-5  ">
      <div className="container   bg-secondary text-white rounded-3   ">
        <FormularioPago handleSubmit={handleSubmit}/>
      </div>
    </main>
  );
}

export default App;
