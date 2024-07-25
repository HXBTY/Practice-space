import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import ShowMutateObserver from "../view/MutateObserver/index";
import UseContextTest from "../view/hookTest/useContextTest"
import UseForwardRefTest from "../view/hookTest/useForwardRefTest"
import UseHookTest from "../view/hookTest/useHookTest";
import UseMemoTest from "../view/hookTest/useMemoTest";
import Calendar from "../view/Calendar";
import IconShow from "../view/Icon/iconShow";
import SpaceShow from "../view/Space/spaceShow"
import MiniCalendar from "../view/MiniCalendar";
import PortalShow from "../view/Portal/PortalShow";
import Suspense from "../view/suspense";
import Controller from "../view/controller/index";
import CopyToClipboardShow from "../view/CopyToClipboard/copyToClipboardShow"
import WatermarkShow from "../view/Watermark/WatermarkShow";

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
      },
      {
        path: "calendar",
        element: <Calendar />
      },
      {
        path: "iconShow",
        element: <IconShow />
      },
      {
        path: "spaceShow",
        element: <SpaceShow />
      },
      {
        path: "miniCalendar",
        element: <MiniCalendar />
      },
      {
        path: "portalShow",
        element: <PortalShow />
      },
      {
        path: "suspense",
        element: <Suspense />
      },
      {
        path: "controller",
        element: <Controller />
      },
      {
        path: "copyToClipboardShow",
        element: <CopyToClipboardShow />
      },
      {
        path: "watermarkShow",
        element: <WatermarkShow/>
      }
    ]
  },
];

const router = createBrowserRouter(routes)
export default router