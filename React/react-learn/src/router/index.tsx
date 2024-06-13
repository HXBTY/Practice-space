import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import ShowMutateObserver from "../view/MutateObserver/index";
import UseContextTest from "../view/hookTest/useContextTest"
import UseForwardRefTest from "../view/hookTest/useForwardRefTest"
import UseHookTest from "../view/hookTest/useHookTest";
import UseMemoTest from "../view/hookTest/useMemoTest";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "mutateObserver",
        element: <ShowMutateObserver />
      },
      {
        path: "useContextTest",
        element: <UseContextTest />
      },
      {
        path: "useForwardRefTest",
        element: <UseForwardRefTest />
      },
      {
        path: "useHookTest",
        element: <UseHookTest />
      },
      {
        path: "useMemoTest",
        element: <UseMemoTest />
      }
    ]
  },
];

const router = createBrowserRouter(routes)
export default router