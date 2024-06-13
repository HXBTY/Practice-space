import React from "react";
import './App.css';

import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <header className="header">
        <Link to={"/mutateObserver"}>MutateObserver</Link>
        <Link to={"/useContextTest"}>UseContextTest</Link>
        <Link to={"/useForwardRefTest"}>UseForwardRefTest</Link>
        <Link to={"/useHookTest"}>UseHookTest</Link>
        <Link to={"/useMemoTest"}>UseHookTest</Link>
      </header>
      <Outlet />
    </div>
  );
}

export default App;
