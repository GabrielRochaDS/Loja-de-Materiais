import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"

const Layout = () => {
  console.log("passou por aqui.");
  return (
    <>
      <NavBar />
      <div className="container mt-3">
        <Outlet />
      </div>
    </>
  )
}
export default Layout