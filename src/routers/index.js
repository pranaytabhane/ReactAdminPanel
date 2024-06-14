import HomeRoutes from "./home";
import SubnavRoutes from "./subnav";
import NotFoundRoute from "./notFound";

const Routes = [
  ...HomeRoutes,
  ...SubnavRoutes,
  ...NotFoundRoute,
];
export default Routes;
