import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import useUsuarioStore from "../store/UsuarioStore";
import Produto from "../interfaces/Produto";
import useProdutoStore from "../store/ProdutoStore";

const NavBar = () => {
  const usuarioLogado = useUsuarioStore((s) => s.usuarioLogado);
  const setProdutoSelecionado = useProdutoStore((s) => s.setProdutoSelecionado);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm">
      <div className="container">
        {/* Logo/Brand */}
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="logo da loja de materiais"
            style={{ width: "50px", marginRight: "10px" }}
            className="img-fluid"
          />
          <span className="fw-bold text-white">Loja de Materiais</span>
        </NavLink>

        {/* Mobile Toggle */}
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

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Main Navigation */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item mx-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link rounded px-3 ${isActive ? "active bg-white text-success fw-bold" : "text-white"}`
                }
              >
                <i className="bi bi-house-door me-1"></i> Home
              </NavLink>
            </li>
            <li className="nav-item mx-1">
              <NavLink
                to="/favoritos"
                className={({ isActive }) =>
                  `nav-link rounded px-3 ${isActive ? "active bg-white text-success fw-bold" : "text-white"}`
                }
              >
                <i className="bi bi-heart me-1"></i> Favoritos
              </NavLink>
            </li>
            <li className="nav-item mx-1">
              <NavLink
                to="/produtos"
                className={({ isActive }) =>
                  `nav-link rounded px-3 ${isActive ? "active bg-white text-success fw-bold" : "text-white"}`
                }
              >
                <i className="bi bi-box-seam me-1"></i> Produtos
              </NavLink>
            </li>
            <li className="nav-item mx-1">
              <NavLink
                to="/cadastrar-produto"
                onClick={() => setProdutoSelecionado({} as Produto)}
                className={({ isActive }) =>
                  `nav-link rounded px-3 ${isActive ? "active bg-white text-success fw-bold" : "text-white"}`
                }
              >
                <i className="bi bi-plus-circle me-1"></i> Cadastrar Produto
              </NavLink>
            </li>
          </ul>

          {/* Right-aligned Navigation */}
          <ul className="navbar-nav">
            <li className="nav-item mx-1">
              <NavLink
                to="/carrinho"
                className={({ isActive }) =>
                  `nav-link rounded px-3 position-relative ${isActive ? "active bg-white text-success fw-bold" : "text-white"}`
                }
              >
                <i className="bi bi-cart3 me-1"></i> Carrinho
              </NavLink>
            </li>
            <li className="nav-item mx-1">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `nav-link rounded px-3 ${isActive ? "active bg-white text-success fw-bold" : "text-white"}`
                }
              >
                <i className={`bi ${usuarioLogado ? "bi-box-arrow-right" : "bi-box-arrow-in-right"} me-1`}></i>
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