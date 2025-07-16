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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setUsuarioLogado(0); // Logout ao entrar na tela de login
  }, []);

  const location = useLocation();

  const { register, handleSubmit, formState: { errors } } = useForm<FormLogin>();

  const { mutate: efetuarLogin, error: errorEfetuarLogin } = useEfetuarLogin();

  const submit = ({ conta, senha }: FormLogin) => {
    setIsLoading(true);
    setLoginInvalido(false);

    const usuario: Usuario = { conta, senha };

    efetuarLogin(usuario, {
      onSuccess: (tokenResponse: TokenResponse) => {
        setIsLoading(false);
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
      onError: () => {
        setIsLoading(false);
      }
    });
  };

  const handleCadastroClick = () => {
    navigate("/cadastrar-usuario");
  };

  if (errorEfetuarLogin) throw errorEfetuarLogin;

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "450px" }}>
        <div className="card-body">
          <div className="text-center mb-4">
            <h2 style={{ color: "rgba(25, 135, 84, 1)" }} className="fw-bold">Bem-vindo de volta</h2>
            <p className="text-muted">Faça login para continuar</p>
          </div>

          {loginInvalido && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              Credenciais inválidas. Por favor, tente novamente.
              <button
                type="button"
                className="btn-close"
                onClick={() => setLoginInvalido(false)}
              ></button>
            </div>
          )}

          <form onSubmit={handleSubmit(submit)}>
            <div className="mb-3">
              <label htmlFor="conta" className="form-label fw-semibold">Email</label>
              <input
                {...register("conta", { required: "Email é obrigatório" })}
                type="email"
                id="conta"
                className={`form-control form-control-lg ${errors.conta ? "is-invalid" : ""}`}
                placeholder="seu@email.com"
              />
              {errors.conta && (
                <div className="invalid-feedback">
                  {errors.conta.message}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="senha" className="form-label fw-semibold">Senha</label>
              <input
                {...register("senha", { required: "Senha é obrigatória" })}
                type="password"
                id="senha"
                className={`form-control form-control-lg ${errors.senha ? "is-invalid" : ""}`}
                placeholder="Digite sua senha"
              />
              {errors.senha && (
                <div className="invalid-feedback">
                  {errors.senha.message}
                </div>
              )}
            </div>

            <div className="d-grid mb-3">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                ) : (
                  <img src={loginIcon} alt="Login" className="me-2" />
                )}
                Entrar
              </button>
            </div>

            <div className="text-center pt-3">
              <p className="text-muted mb-0">Ainda não tem uma conta?</p>
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={handleCadastroClick}
              >
                Cadastre-se aqui
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;