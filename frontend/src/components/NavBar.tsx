import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import useUsuarioStore from "../store/UsuarioStore";
import Produto from "../interfaces/Produto";
import useProdutoStore from "../store/ProdutoStore";
const NavBar = () => {
  const usuarioLogado = useUsuarioStore((s) => s.usuarioLogado);
  const setProdutoSelecionado = useProdutoStore((s) => s.setProdutoSelecionado);
  
  return (
    <nav className="navbar navbar-expand-lg bg-light navbar-light">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img
            src={logo}
            alt="logo da loja de materiais"
            style={{ width: "50px" }}
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/favoritos">
                Favoritos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/produtos">
                Produtos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink onClick={() => setProdutoSelecionado({} as Produto)} className="nav-link" to="/cadastrar-produto">
                Cadastrar Produto
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/carrinho">
                Carrinho
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                {usuarioLogado ? "Sair" : "Entrar"}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
