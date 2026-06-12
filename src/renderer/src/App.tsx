import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Create from "./pages/Create";
import Show from "./pages/Show";
import Edit from "./pages/Edit";
import Tip from "./pages/Tip";

export const _Router = {
  main: "/",
  about: "/about",
  create: "create",
};

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={_Router.main} element={<Home />} />
          <Route path={_Router.about} element={<About />} />
          <Route path={_Router.create} element={<Create />} />
          <Route path="tip" element={<Tip />} />
          <Route path={`/record/:id`} element={<Show />} />
          <Route path={`/record/:id/edit`} element={<Edit />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
