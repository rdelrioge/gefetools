import React from "react";
import { Link } from "react-router-dom";

import "./Shimming.scss";

export default function Shimming() {
  return (
    <div className="shimming">
      <div className="upperbar">
        <Link className="return" to="/mr">
          Return
        </Link>
        <div className="title">Passive shimming printing tool</div>
      </div>
      <div>Upload yout lpm file</div>
    </div>
  );
}
