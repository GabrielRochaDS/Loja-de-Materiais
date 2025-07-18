import { NavLink, Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container-fluid py-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-2 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">Categorias</h5>
              <nav className="nav nav-pills flex-column gap-2">
                <NavLink className="nav-link" to="/">
                  <i className="bi bi-box-seam me-2"></i>
                  Todos
                </NavLink>
                <NavLink className="nav-link" to="/Cimento">
                  <i className="bi bi-bricks me-2"></i>
                  Cimento
                </NavLink>
                <NavLink className="nav-link" to="/Madeira">
                  <i className="bi bi-tree me-2"></i>
                  Madeira
                </NavLink>
                <NavLink className="nav-link" to="/Ferramentas">
                  <i className="bi bi-wrench-adjustable-circle me-2"></i>
                  Ferramentas
                </NavLink>
                <NavLink className="nav-link" to="/Tintas">
                  <i className="bi bi-palette2 me-2"></i>
                  Tintas
                </NavLink>
                <NavLink className="nav-link" to="/Telhas">
                  <i className="bi bi-house-door-fill me-2"></i>
                  Telhas
                </NavLink>
                <NavLink className="nav-link" to="/Pisos">
                  <i className="bi bi-grid-3x3-gap-fill me-2"></i>
                  Pisos
                </NavLink>
              </nav>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="col-lg-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
