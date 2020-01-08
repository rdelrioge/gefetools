import Dashboard from "../components/Dashboard/Dashboard";
import Mr from "../components/Mr/Mr";
import Ct from "../components/Ct/Ct";
import Shimming from "../components/Shimming/Shimming";
import MagnetMonitor from "../components/MagnetMonitor/MagnetMonitor";

const routes = [
  {
    path: "/",
    component: Dashboard
  },
  {
    path: "/mr",
    component: Mr
  },
  {
    path: "/ct",
    component: Ct
  },
  {
    path: "/mr/shimming",
    component: Shimming
  },
  {
    path: "/mr/magnetmonitor",
    component: MagnetMonitor
  }
];

export default routes;
