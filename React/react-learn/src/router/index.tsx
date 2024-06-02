import { createBrowserRouter } from "react-router-dom";

import ShowMutateObserver from "../view/MutateObserver/index";
import App from "../App";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "mutateObserver",
        element: <ShowMutateObserver />
      }
    ]
  }
];

const router = createBrowserRouter(routes)
export default router