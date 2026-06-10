import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <>
      <section className="d-flex">
        <Sidebar />
        <main className="m-5 w-100">
          <Outlet />
        </main>
      </section>
    </>
  );
}
