
import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Routes, useLocation } from "react-router-dom";

import DemoNavbar from "../components/Navbars/DemoNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "../routers";

var ps;

function AdminLayout(props) {
  const [backgroundColor] = React.useState("black");
  const [activeColor] = React.useState("info");
  const mainPanel = React.useRef();
  const location = useLocation();
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    mainPanel.current.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [location]);
  return (
    <div className="wrapper">
      <Sidebar
        {...props}
        routes={routes}
        bgColor={backgroundColor}
        activeColor={activeColor}
      />
      <div className="main-panel" ref={mainPanel}>
        <DemoNavbar {...props} />
        <Routes>
          {routes.map((route) =>
            route.subNav
              ? route.subNav.map((subRoute, key) => (
                  <Route
                    path={subRoute.path}
                    element={subRoute.component}
                    key={key}
                  />
                ))
              : routes.map((prop, key) => {
                return (
                  <Route
                    path={prop.path}
                    element={prop.component}
                    key={key}
                    exact
                  />
                );
              })
          )}
        </Routes>
        <Footer fluid />
      </div>
    </div>
  );
}

export default AdminLayout;
