import React from "react";
import "./Loader.css";

export default function Loader() {
  return (
    <div className="loaderDiv">
      <span className="loader"></span>
      <span className="loaderInfo">Loading...</span>
    </div>
  );
}
