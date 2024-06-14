import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Nav } from "reactstrap";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import PerfectScrollbar from "perfect-scrollbar";
import logo from "logo.svg";

var ps;

function Sidebar(props) {
  const location = useLocation();
  const sidebar = useRef();
  const [openSubNav, setOpenSubNav] = useState({});

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return () => {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  }, []);

  const toggleSubNav = (key) => {
    setOpenSubNav((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

return (
    <div className="sidebar" data-color={props.bgColor} data-active-color={props.activeColor}>
      <div className="logo">
        <a href="#" className="simple-text logo-mini">
          <div className="logo-img">
            <img src={logo} alt="react-logo" />
          </div>
        </a>
        <a href="#" className="simple-text logo-normal">
          React
        </a>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {props.routes.map((prop, key) => {
            const hasSubNav = prop.subNav && prop.subNav.length > 0;
            const icon = openSubNav[key] ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />
            return (
              <li className={activeRoute(prop.path) + (prop.pro ? " active-pro" : "")} key={key}>
                {hasSubNav && prop.showInSidebar && (
                  <div 
                    to={prop.layout + prop.path} 
                    className="nav-link d-flex sidebar-nav-custom" 
                    onClick={() => hasSubNav && toggleSubNav(key)}
                    style={{ cursor: 'pointer',color: "#aba7a7" }}
                  >
                    <span className="sidebar-icons">{prop.icon}</span>
                    <p className="sidenav-items">{prop.name}</p>
                    {hasSubNav && icon}
                  </div>
                )}
                {!hasSubNav && prop.showInSidebar && (
                  <NavLink 
                    to={prop.layout + prop.path} 
                    className="nav-link d-flex sidebar-nav-custom" 
                    onClick={() => null}
                    style={{ cursor: 'auto' }}
                  >
                   <span className="sidebar-icons">{prop.icon}</span>
                    <p className="sidenav-items">{prop.name}</p>
                  </NavLink>
                )}
                
                {openSubNav[key] && hasSubNav && (
                  <div className="subMenu">
                    {prop.subNav.map((nav, subKey) => {
                      return (
                        nav.title && nav.showInSidebar && (
                          <NavLink 
                            to={prop.layout + nav.path} 
                            className="nav-link subMenu-item sidebar-nav-custom subnav-custom" 
                            key={subKey}
                          >
                            <span className="sidebar-icons">{nav.icon}</span>
                            <p className="subMenu-items">{nav.title}</p>
                          </NavLink>
                        )
                      )
                    }
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;