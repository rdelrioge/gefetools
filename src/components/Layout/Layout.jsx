import React from "react";
import { Link } from "react-router-dom";
import LayoutRouter from "./LayoutRouter";
/* Styles */
import "./Layout.scss";

function Layout() {
  return (
    <div className="layout">
      <div className="titlebar">
        <Link className="brand-logo" to="/">
          <div>
            <h3>GE FE Tools</h3>
          </div>
        </Link>
        <span>Version: 1.1.0</span>
      </div>
      <div className="main">
        <LayoutRouter />
      </div>
    </div>
  );
}

export default Layout;
