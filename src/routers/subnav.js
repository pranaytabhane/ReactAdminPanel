import ComingSoon from "../components/comingSoon";
import { FaRegCircle } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";

const SubnavRoutes = [
  {
    path: "/normal/route",
    name: "Normal Route",
    icon: "nc-icon nc-bank",
    component: <ComingSoon />,
    layout: "/admin",
    showInSidebar: false
  },
  {
    name: "SubnavRoutes",
    icon: <BiSolidCategory />,
    iconDown: "nc-icon nc-minimal-down",
    layout: "/admin",
    showInSidebar: true,
    subNav: [
      {
        path: "/subnav/one",
        title: "Sabnav One",
        icon: <FaRegCircle />,
        component:<ComingSoon />,
        layout: "/admin",
        name: "sub-nav",
        showInSidebar: true,
      },
      {
        path: "/subnav/two",
        title: "Sabnav Two",
        icon: <FaRegCircle />,
        component:<ComingSoon />,
        layout: "/admin",
        name: "sub-nav",
        showInSidebar: true,
      },
    ],
  }
];


export default SubnavRoutes;