import { NavLink, Outlet } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <>
      <section className="d-flex">
        <Sidebar />
        <main className="m-5">
          <Outlet />
        </main>
      </section>
    </>
  );
}
