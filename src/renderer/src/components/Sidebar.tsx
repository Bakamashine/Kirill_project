import { NavLink } from "react-router-dom";
import "./sidebar.css";
import { _Router } from "../App";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { recordStore } from "../stores/recordStore";
import { useTheme } from "../contexts/ThemeContext";

const Sidebar = observer(() => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    recordStore.fetchRecords();
  }, []);

  return (
    <div className="sidebar d-flex flex-column">
      <div className="sidebar-sticky">
        <ul className="nav flex-column mb-3">
          <li className="nav-item">
            <NavLink className="nav-link" end to={_Router.main}>
              Главная страница
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" end to={_Router.create}>
              Создать инструкцию
            </NavLink>
          </li>
        </ul>

        {recordStore.records.length > 0 && (
          <>
            <h6 className="sidebar-heading px-3 mt-4 mb-1">Инструкции</h6>
            <ul className="nav flex-column mb-2">
              {recordStore.records.map((item) => (
                <li
                  className="nav-item d-flex align-items-center"
                  key={item.id}
                >
                  <NavLink
                    className="nav-link flex-grow-1"
                    end
                    to={`/record/${item.id}`}
                  >
                    {item.title}
                  </NavLink>
                  <NavLink
                    className="nav-link py-0 px-1 small"
                    end
                    to={`/record/${item.id}/edit`}
                  >
                    ред.
                  </NavLink>
                  <NavLink
                    className="nav-link py-0 px-1 small text-danger"
                    end
                    to={""}
                    onClick={async (e) => {
                      e.preventDefault();
                      await recordStore.deleteRecord(item.id);
                    }}
                  >
                    удалить
                  </NavLink>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-auto px-3">
          <button className="btn btn-outline-secondary w-100 btn-sm" onClick={toggleTheme}>
            {theme === "light" ? "Тёмная тема" : "Светлая тема"}
          </button>
        </div>
      </div>
    </div>
  );
});

export default Sidebar;
