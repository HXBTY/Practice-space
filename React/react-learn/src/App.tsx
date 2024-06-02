import React from "react";
import './App.css';

import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <header className="header">
        <Link to={"/mutateObserver"}>mutateObserver</Link>
      </header>
      <Outlet />
    </div>
  );
}

export default App;
