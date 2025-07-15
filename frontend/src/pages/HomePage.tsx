import { NavLink, Outlet } from "react-router-dom";

const HomePage = () => {

  return (
    <div className="row">
      <div className="col-lg-2">
        <nav className="nav nav-pills d-flex flex-column">
          <h5>Categorias</h5>
          <NavLink className="nav-link" aria-current="page" to="/">
            Todos
          </NavLink>
          <NavLink className="nav-link" to="/Cimento">
            Cimento
          </NavLink>
          <NavLink className="nav-link" to="/Madeira">
            Madeira
          </NavLink>
          <NavLink className="nav-link" to="/Ferramentas">
            Ferramentas
          </NavLink>
          <NavLink className="nav-link" to="/Tintas">
            Tintas
          </NavLink>
          <NavLink className="nav-link" to="/Telhas">
            Telhas
          </NavLink>
          <NavLink className="nav-link" to="/Pisos">
            Pisos
          </NavLink>
        </nav>
      </div>
      <div className="col-lg-10">
        <Outlet />
      </div>
    </div>
  );
};
export default HomePage;