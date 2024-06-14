import React from "react";
import Dashboard from "../views/Dashboard";
import ComingSoon from "../components/comingSoon";
import { FaHome } from "react-icons/fa";

const HomeRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
    component: <ComingSoon />,
    layout: "/admin",
    showInSidebar: true
  }
];

export default HomeRoutes;
