import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <>
      <section className="d-flex w-100">
        <Sidebar />
        <main className="p-4" style={{ marginLeft: 220 }}>
          <Outlet />
        </main>
      </section>
    </>
  );
}
