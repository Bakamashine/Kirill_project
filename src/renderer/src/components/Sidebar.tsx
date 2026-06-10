import { NavLink } from "react-router-dom";

import "./sidebar.css";
import { _Router } from "../App";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { recordStore } from "../stores/recordStore";

const Sidebar = observer(() => {
  useEffect(() => {
    recordStore.fetchRecords();
  }, []);

  return (
    <>
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <NavLink className={"nav-link"} end to={_Router.main}>
            Главная страница
          </NavLink>
          <NavLink className={"nav-link"} end to={_Router.create}>
            Создать инструкцию
          </NavLink>

          {recordStore.records.length > 0 && (
            <>
              {recordStore.records.map((item) => (
                <NavLink
                  key={item.id}
                  className={"nav-link"}
                  end
                  to={`/record/${item.id}`}
                >
                  {item.title} |{" "}
                  <a
                    onClick={async (e) => {
                      e.preventDefault();
                      await recordStore.deleteRecord(item.id);
                    }}
                    className="text-danger"
                  >
                    Удалить
                  </a>
                </NavLink>
              ))}
            </>
          )}
        </ul>
      </div>
    </>
  );
});

export default Sidebar;
