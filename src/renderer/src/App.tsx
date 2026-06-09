import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import CreateInstructions from "./pages/instructions/create_instructions";

export const _Router = {
  main: "/",
  about: "/about",
  create_instructions: "create"
};


export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={_Router.main} element={<Home />} />
          <Route path={_Router.about} element={<About />} />
          <Route path={_Router.create_instructions} element={<CreateInstructions />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
