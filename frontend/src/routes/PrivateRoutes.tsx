import { Navigate, useLocation } from "react-router-dom";
import useUsuarioStore from "../store/UsuarioStore";
import Layout from "./Layout";

const PrivateRoutes = () => {
  const usuarioLogado = useUsuarioStore((s) => s.usuarioLogado);
  const location = useLocation();
  console.log(location.pathname);

  if (usuarioLogado) {
    return <Layout />;
  } else {
    return <Navigate to="/login" state={{destino: location.pathname}} />;
  }
};
export default PrivateRoutes;
