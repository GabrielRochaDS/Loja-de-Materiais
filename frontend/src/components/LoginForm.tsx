import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import loginIcon from "../assets/skin/login.png";
import useEfetuarLogin from "../hooks/useEfetuarLogin";
import TokenResponse from "../interfaces/TokenResponse";
import Usuario from "../interfaces/Usuario";
import useUsuarioStore from "../store/UsuarioStore";

interface FormLogin {
  conta: string;
  senha: string;
}

const LoginForm = () => {
  const setUsuarioLogado = useUsuarioStore((s) => s.setUsuarioLogado);
  const [loginInvalido, setLoginInvalido] = useState(false);

  useEffect(() => {
    setUsuarioLogado(0); // Logout ao entrar na tela de login.
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<FormLogin>();

  const { mutate: efetuarLogin, error: errorEfetuarLogin } = useEfetuarLogin();

  const submit = ({ conta, senha }: FormLogin) => {
    const usuario: Usuario = { conta, senha };

    efetuarLogin(usuario, {
      onSuccess: (tokenResponse: TokenResponse) => {
        if (tokenResponse.token > 0) {
          setUsuarioLogado(tokenResponse.token);
          if (location.state?.destino) {
            navigate(location.state.destino);
          } else {
            navigate("/");
          }
        } else {
          setLoginInvalido(true);
        }
      },
    });
  };

  if (errorEfetuarLogin) throw errorEfetuarLogin;

  return (
    <form autoComplete="off" onSubmit={handleSubmit(submit)}>
      {loginInvalido && (
        <div className="row">
          <div className="col-lg-6">
            <div className="alert alert-danger fw-bold" role="alert">
              Login inválido!
            </div>
          </div>
        </div>
      )}
      <div className="row mb-2">
        <label htmlFor="conta" className="col-lg-1 fw-bold mb-2">
          Conta
        </label>
        <div className="col-lg-5">
          <input
            {...register("conta")} // onChange(), onBlur(), name, ref
            type="text"
            id="conta"
            className="form-control form-control-sm"
          />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="senha" className="col-lg-1 fw-bold mb-2">
          Senha
        </label>
        <div className="col-lg-5">
          <input
            {...register("senha")}
            type="password"
            id="senha"
            className="form-control form-control-sm"
          />
        </div>
      </div>

      <div className="row">
        <div className="offset-lg-1 col-lg-5">
          <button type="submit" className="btn btn-outline-primary">
            <img src={loginIcon} /> Entrar
          </button>
        </div>
      </div>
    </form>
  );
};
export default LoginForm;
