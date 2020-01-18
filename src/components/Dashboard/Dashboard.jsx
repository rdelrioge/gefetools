import React from "react";
import { Link } from "react-router-dom";

import "./Dashboard.scss";

function Dashboard() {
  return (
    <div className="dashboard">
      <div>
        <Link to="/mr">
          <h2>MR</h2>
        </Link>
        {/* <Link to="/ct">
          <h2>CT</h2>
        </Link> */}
      </div>
    </div>
  );
}

export default Dashboard;
