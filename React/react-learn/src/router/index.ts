import { createBrowserRouter } from "react-router-dom";

import test from "../view/test";
import App from "../App";

const routes = [
  {
    path: "/",
    element: App(),
    children: [
      {
        path: "test",
        element: test()
      }
    ]
  }
];

const router = createBrowserRouter(routes)
export default router