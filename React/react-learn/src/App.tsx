import React from 'react';
import './App.css';

import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <Link to={"/test"}>to test</Link>
      <Outlet />
    </div>
  );
}

export default App;
