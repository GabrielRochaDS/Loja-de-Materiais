import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NavBar from "../components/NavBar";
import isErrorResponse from "../util/isErrorResponse";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <>
      <NavBar />
      <div className="container mt-3">
        <h5>Página de Erro</h5>
        <hr className="mt-1" />
        {isRouteErrorResponse(error) ? (
          "Página requisitada inválida"
        ) : error instanceof Error ? (
          error.message
        ) : isErrorResponse(error) ? (
          <div>
            <h6>Mensagem do servidor:</h6>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </div>
        ) : (
          "Erro desconhecido. Msg: " + error
        )}
      </div>
    </>
  );
};
export default ErrorPage;

