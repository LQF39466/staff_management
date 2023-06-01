import { createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import DataList from "./components/DataList";
import About from "./components/About";
import Details from "./components/Details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/main",
    element: <Main />,
    children: [
      {
        path: "",
        element: <DataList />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "details/:uid",
        element: <Details />,
      },
    ],
  },
]);

export default router;
