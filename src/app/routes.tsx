import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import CaseStudyNewRentals from "./pages/CaseStudyNewRentals";
import CaseStudyGallaFlex from "./pages/CaseStudyGallaFlex";

export const router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/case-studies/newrentals", Component: CaseStudyNewRentals },
  { path: "/case-studies/gallaflex", Component: CaseStudyGallaFlex },
  { path: "*", Component: Home },
]);
