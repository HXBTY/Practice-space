import React from "react";
import './App.css';

import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <header className="nav">
        <Link to={"/mutateObserver"}>MutateObserver</Link>
        <Link to={"/useContextTest"}>UseContextTest</Link>
        <Link to={"/useForwardRefTest"}>UseForwardRefTest</Link>
        <Link to={"/useHookTest"}>UseHookTest</Link>
        <Link to={"/useMemoTest"}>UseHookTest</Link>
        <Link to={"/calendar"}>Calendar</Link>
        <Link to={"/iconShow"}>IconShow</Link>
        <Link to={"/spaceShow"}>spaceShow</Link>
        <Link to={"/miniCalendar"}>miniCalendar</Link>
        <Link to={"/portalShow"}>portalShow</Link>
        <Link to={"/suspense"}>suspense</Link>
        <Link to={"/controller"}>controller</Link>
        <Link to={"/copyToClipboardShow"}>copyToClipboardShow</Link>
        <Link to={"/watermarkShow"}>watermarkShow</Link>
      </header>
      <Outlet />
    </div>
  );
}

export default App;
