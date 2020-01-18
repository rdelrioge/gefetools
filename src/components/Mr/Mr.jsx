import React from "react";
import { Link } from "react-router-dom";

import "./Mr.scss";

function Mr() {
  return (
    <div className="mr">
      <div className="upperbar">
        <Link className="return" to="/">
          Return
        </Link>
        <div className="title">MR tools</div>
      </div>
      <div className="tools">
        <Link to="/mr/shimming">
          <h2>Passive shimming printing tool</h2>
        </Link>
        {/* <Link to="/mr/magnetmonitor">
          <h2>Magnet Monitor error detector</h2>
        </Link> */}
      </div>
    </div>
  );
}

export default Mr;
