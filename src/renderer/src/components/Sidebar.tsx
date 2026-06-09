import { NavLink } from "react-router-dom";

import "./sidebar.css";
import { _Router } from "@/App";

function Sidebar() {
  return (
    <>
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <NavLink className={"nav-link"} end to={_Router.main}>
            Главная страница
          </NavLink>
          <NavLink className={"nav-link"} end to={_Router.create_instructions}>
            Создать инструкцию
          </NavLink>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
